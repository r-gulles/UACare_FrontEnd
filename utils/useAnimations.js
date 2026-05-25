/*
  Reusable animation hooks using react-native-reanimated.
  Provides fade-in-up, scale-in, staggered list, and pulse animations
  for consistent motion across the app.
*/

import { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  SlideInDown,
  SlideInUp,
  ZoomIn,
  ZoomInEasyDown,
  Layout,
} from 'react-native-reanimated';

// ── Timing presets ──────────────────────────────────────────
const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
const EASE_IN_OUT = Easing.bezier(0.4, 0, 0.2, 1);

// ── Hook: Fade-in + slide-up entrance ──────────────────────
export function useFadeInUp(delay = 0, duration = 600) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(24);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration, easing: EASE_OUT }));
    translateY.value = withDelay(delay, withTiming(0, { duration, easing: EASE_OUT }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return animatedStyle;
}

// ── Hook: Scale-in entrance ────────────────────────────────
export function useScaleIn(delay = 0, duration = 500) {
  const scale = useSharedValue(0.85);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(delay, withSpring(1, { damping: 12, stiffness: 120 }));
    opacity.value = withDelay(delay, withTiming(1, { duration, easing: EASE_OUT }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return animatedStyle;
}

// ── Hook: Fade-in + scale (for logos, hero images) ─────────
export function useFadeInScale(delay = 0, duration = 700) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration, easing: EASE_OUT }));
    scale.value = withDelay(delay, withSpring(1, { damping: 14, stiffness: 100 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return animatedStyle;
}

// ── Hook: Animated bar width (for StatBox accent bars) ─────
export function useBarWidth(delay = 0, duration = 800) {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withDelay(delay, withTiming(100, { duration, easing: EASE_OUT }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return animatedStyle;
}

// ── Hook: Modal scale-in entrance ──────────────────────────
export function useModalEntrance() {
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    opacity.value = withTiming(1, { duration: 250, easing: EASE_OUT });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return animatedStyle;
}

// ── Hook: Overlay fade-in ──────────────────────────────────
export function useOverlayFade() {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 200, easing: EASE_IN_OUT });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return animatedStyle;
}

// ── Hook: Slide transition for steps ───────────────────────
export function useSlideTransition(step) {
  const translateX = useSharedValue(30);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = 30;
    opacity.value = 0;
    translateX.value = withTiming(0, { duration: 300, easing: EASE_OUT });
    opacity.value = withTiming(1, { duration: 300, easing: EASE_OUT });
  }, [step]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  return animatedStyle;
}

// ── Pre-built entering animations (for Animated.View entering prop) ──
export const Entrances = {
  fadeInUp: (delay = 0) => FadeInDown.delay(delay).duration(500).easing(EASE_OUT),
  fadeIn: (delay = 0) => FadeIn.delay(delay).duration(500).easing(EASE_OUT),
  fadeInLeft: (delay = 0) => FadeInLeft.delay(delay).duration(400).easing(EASE_OUT),
  fadeInRight: (delay = 0) => FadeInRight.delay(delay).duration(400).easing(EASE_OUT),
  zoomIn: (delay = 0) => ZoomIn.delay(delay).duration(400).springify().damping(14),
  slideUp: (delay = 0) => SlideInDown.delay(delay).duration(400).easing(EASE_OUT),
  springySlideUp: (delay = 0) => SlideInDown.delay(delay).duration(500).springify().damping(13).stiffness(110),
};

// Re-export Animated for convenience
export { default as Animated } from 'react-native-reanimated';
export { Layout };
