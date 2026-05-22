# 🏥 UACare - Clinic Management System

[![Frontend Status](https://img.shields.io/badge/Frontend-Vercel-blue?style=for-the-badge&logo=vercel&logoColor=white)](https://ua-care-front-end.vercel.app)
[![Backend Status](https://img.shields.io/badge/Backend-Render-green?style=for-the-badge&logo=render&logoColor=white)](https://uacare-backend.onrender.com)
[![Framework](https://img.shields.io/badge/Frontend-Expo%20%7C%20React%20Native%20Web-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Backend Framework](https://img.shields.io/badge/Backend-Django%20REST-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.django-rest-framework.org/)

**UACare** is a secure clinic appointment and medical record management system designed to digitize and improve the healthcare operations of the University of the Assumption clinic. It replaces manual, paper-based workflows with a centralized digital environment accessible through web and mobile platforms, minimizing administrative bottlenecks, reducing long waiting times, and providing optimized healthcare service delivery.

---

## Live Deployments

* **Frontend Application (Web):** [https://ua-care-front-end.vercel.app](https://ua-care-front-end.vercel.app)
* **Backend API Server:** [https://uacare-backend.onrender.com](https://uacare-backend.onrender.com)

---

## Key Features

### Patient Portal

* **User Registration:** Onboard new patients using a structured data entry format categorized into personal, contact, academic, and account details.
* **Patient Dashboard:** A central navigation hub that gives immediate access to a prominent "Book Appointment" call-to-action button, upcoming appointments tracking, and filtered appointment histories.
* **Appointment Booking:** Request a consultation by selecting an active doctor, picking available operational clinic dates, and providing symptoms or health conditions.

### Doctor Portal

* **Clinical Operations Dashboard:** Track daily consultation metrics instantly using dynamic analytical cards monitoring total active appointments for the day, pending requests, completed visits, and remaining sessions.
* **Schedule & Appointment Actions:** Access a detailed tabular schedule tracker to seamlessly review, approve, decline, or cancel pending patient requests in real-time.
* **Patient Management Directory:** Utilize a centralized repository containing diagnostic summaries, total visits, demographic profiles, and medical timeline tracking.
* **Early Dismissal Slips:** Instantly generate official digital medical release slips embedded with secure QR-code verification for students who need to leave the campus.

### Admin Portal

* **System Administration Dashboard:** Monitor the entire system using an Overview panel aggregating critical data feeds, total clinical logs, and real-time activity filters.
* **Patient Records Directory:** Access a centralized patient registry equipped with search tools to track institutional emails, profiles, and historical booking volumes.
* **Account & Role Management:** Manually register clinic personnel, filter system access levels by specific roles (All, Patient, Doctor, Admin), or securely delete outdated user listings.

### Security & System Integrity

* **Stateless Token Flow:** Employs secure JSON Web Token (JWT) authentication issuing unique session access keys upon verified logins to protect API entryways.
* **Institutional Sign-In:** Integrates secure academic single sign-on flows featuring a specialized "Continue with UA Email" option restricted to the university's official domain.
* **Data Confidentiality:** Implements Advanced Encryption Standard (AES) data encryption for highly secure relational database storage safeguarding critical patient histories and system transactions.
* **Role-Based Access Control (RBAC):** Rigidly restricts data pathways to guarantee that users only manipulate or view authorized records aligned precisely with their role IDs.

---

## Technology Stack

* **Frontend Client:** React Native (Web & Mobile platforms), Expo Bundler, Axios (with secure JWT interceptors).
* **Backend Engine:** Django REST Framework (Model-View-Template architectural pattern).
* **Database Persistent Storage:** PostgreSQL relational database.

---

## Local Setup & Installation

### 1. Prerequisites

Make sure you have the following installed on your system:

* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [Python](https://www.python.org/) (v3.10 or higher recommended)
* `npm` or `yarn`

---

### 2. Backend Setup (`clinic_backend`)

1. **Navigate to the backend directory:**
```bash
cd clinic_backend
```

2. **Create and activate a virtual environment:**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. **Install the required Python packages:**
```bash
pip install -r requirements.txt
```

4. **Configure Environment Variables:**
Create a `.env` file inside the `clinic_backend` directory (or modify the existing one) with the following variables:
```env
SECRET_KEY=your-django-secret-key
DATABASE_URL=sqlite:///db.sqlite3
GOOGLE_CLIENT_ID=your-google-oauth-client-id
FERNET_KEY=your-fernet-key-for-encryption
```

5. **Run Migrations:**
```bash
python manage.py migrate
```

6. **Create a Superuser (Admin account):**
```bash
python manage.py createsuperuser
```

7. **Start the Local API Server:**
```bash
python manage.py runserver
```

The server will run locally at `http://127.0.0.1:8000/`.

---

### 3. Frontend Setup (`clinic_frontend`)

1. **Navigate to the frontend directory:**
```bash
cd clinic_frontend
```

2. **Install Node dependencies:**
```bash
npm install
```

3. **Configure Environment Variables:**
Create or edit the `.env` file in the `clinic_frontend` directory:
```env
EXPO_PUBLIC_API_URL=http://127.0.0.1:8000/api/
EXPO_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

4. **Launch the Frontend Application:**
* **For Web Development (Recommended):**
```bash
npm run web
```

* **For mobile environments or general Expo bundler:**
```bash
npm start
```

*(Or use `npm run android` / `npm run ios` to build for specific platform emulators.)*


