/*
  Displays a temporary animated notification (success or error)
  that springs in, shows a shrinking progress bar, then fades out.
  Uses react-native-reanimated for smoother, more performant animations.
*/

import { useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withSequence,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

const DURATION_VISIBLE = 2500;
const FADE_DURATION = 400;
const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

export const Toast = ({ message, visible, onHide, type = 'success' }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-30);
  const scale = useSharedValue(0.95);
  const progressWidth = useSharedValue(100);

  useEffect(() => {
    if (visible) {
      // Reset values
      opacity.value = 0;
      translateY.value = -30;
      scale.value = 0.95;
      progressWidth.value = 100;

      // Spring in
      opacity.value = withTiming(1, { duration: FADE_DURATION, easing: EASE_OUT });
      translateY.value = withSpring(0, { damping: 14, stiffness: 120 });
      scale.value = withSpring(1, { damping: 12, stiffness: 100 });

      // Progress bar shrinks over visible duration
      progressWidth.value = withDelay(
        FADE_DURATION,
        withTiming(0, { duration: DURATION_VISIBLE, easing: Easing.linear })
      );

      // Fade out after visible duration
      opacity.value = withDelay(
        FADE_DURATION + DURATION_VISIBLE,
        withTiming(0, { duration: FADE_DURATION, easing: EASE_OUT }, (finished) => {
          if (finished) {
            runOnJS(onHide)();
          }
        })
      );

      translateY.value = withDelay(
        FADE_DURATION + DURATION_VISIBLE,
        withTiming(-20, { duration: FADE_DURATION, easing: EASE_OUT })
      );

      scale.value = withDelay(
        FADE_DURATION + DURATION_VISIBLE,
        withTiming(0.95, { duration: FADE_DURATION, easing: EASE_OUT })
      );
    }
  }, [visible]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  if (!visible) return null;

  const iconName = type === 'success' ? 'check-circle' : 'alert-circle';
  const progressColor = type === 'success' ? '#60A5FA' : '#FCA5A5';

  return (
    <Animated.View style={[
      styles.container, 
      containerStyle,
      type === 'error' ? styles.error : styles.success
    ]}>
      <MaterialCommunityIcons name={iconName} size={24} color="#FFF" />
      <Text style={styles.text}>{message}</Text>
      
      {/* Animated progress bar */}
      <Animated.View style={[styles.progress, { backgroundColor: progressColor }, progressStyle]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    gap: 12, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
    overflow: 'hidden',
  },
  success: { 
    backgroundColor: '#002366' 
  },
  error: { 
    backgroundColor: '#991b1b' 
  },
  text: { 
    color: '#FFF', 
    fontWeight: '700', 
    fontSize: 14,
    flex: 1, 
    letterSpacing: 0.5, 
  },
  progress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 3,
    borderRadius: 2,
  },
});