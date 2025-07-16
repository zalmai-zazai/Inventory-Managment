# 📦 Inventory Management App

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Build-orange?logo=vite)
![Firebase](https://img.shields.io/badge/Firebase-Auth-yellow?logo=firebase)
![Netlify](https://img.shields.io/badge/Deployed-Netlify-brightgreen?logo=netlify)

A modern **Inventory Management System** built using **React, Vite, Firebase Authentication**, and **localStorage** for offline persistence.  
The app allows users to **securely log in**, manage inventory, view invoices, and maintain seller records in an intuitive and responsive UI.

---

## 🚀 Features

✅ **User Authentication with Firebase**

- Email/Password Signup & Login
- Secure user sessions
- Protected routes using **React Router**

✅ **Inventory Management**

- Add, update, and remove products
- View complete inventory list
- Manage invoices for transactions

✅ **LocalStorage Integration**

- Persist inventory data locally
- Offline-ready experience
- Fast loading with no backend dependency for main data

✅ **Protected Routes**

- Implemented custom `PrivateRoute` component using **React Router v6**

✅ **Responsive Design**

- Mobile-first approach using **Tailwind CSS**
- Modern UI with reusable components

✅ **Optimized Build with Vite**

- Super-fast dev server
- Tree-shaking for smaller bundles

---

## 🛠️ Tech Stack

| **Category**       | **Technology**    |
| ------------------ | ----------------- |
| Frontend Framework | React (with Vite) |
| Styling            | Tailwind CSS      |
| Routing            | React Router v6   |
| Authentication     | Firebase Auth     |
| State Persistence  | localStorage      |
| Deployment         | Netlify           |
| Build Tool         | Vite              |

---

## 🧠 Skills Gained

- ✅ **React** – Building reusable components and managing props/state
- ✅ **React Router v6** – Implementing SPA routing with protected routes
- ✅ **Firebase Authentication** – Email/password auth, context-based user state
- ✅ **LocalStorage** – Persisting data locally for offline-first experience
- ✅ **Tailwind CSS** – Utility-first responsive design
- ✅ **Environment Config** – Using `.env` for API keys securely
- ✅ **Deployment** – Deploying Vite + React apps on **Netlify**
- ✅ **Case Sensitivity & Build Fixes** – Solving Linux-based build issues on Netlify
- ✅ **Node & npm** – Managing dependencies and specifying Node versions for CI/CD

---

## 📂 Project Structure

```
src/
  ├── components/         # Reusable UI components
  │    ├── Navbar.jsx
  │    ├── PrivateRoute.jsx
  │    └── AddItemForm.jsx
  ├── Pages/              # Main pages
  │    ├── SellerPage.jsx
  │    ├── InventoryPage.jsx
  │    ├── InvoicesPage.jsx
  │    ├── Login.jsx
  │    └── Signup.jsx
  ├── context/            # Auth Context for Firebase
  ├── App.jsx             # Main app entry
  └── main.jsx            # Vite entry point
```

---

## 🔑 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/), create a new project.
2. Enable **Email/Password Authentication** in Firebase Auth.
3. Create a **Web App** and get the config values.
4. Add config in `.env` file:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

5. Initialize Firebase in your project (`firebase.js`).

---

## ▶️ Running Locally

```bash
# Clone repository
git clone https://github.com/Zalmai-zazai/inventory-management.git
cd inventory-management

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📦 Build for Production

```bash
npm run build
```

Output will be in `dist/`.

---

## 🌍 Live Demo

[**View on Netlify**](#) _(https://inventory-managments.netlify.app)_

---

## 📸 Screenshots

| Login Page  | Inventory Page  | Invoices Page  |
| ----------- | --------------- | -------------- |
| ![Login](#) | ![Inventory](#) | ![Invoices](#) |

---

## 🔥 Future Improvements

- Add **Cloud Firestore** for real-time sync
- Implement **Role-based Access** (Admin / Seller)
- Add **Search & Filter** functionality for large inventories

---

## 👤 About Me

Hi, I'm **Zalmai Zazai**, a passionate web developer who loves building modern, responsive, and scalable applications.  
Skills: `React`, `Firebase`, `Tailwind CSS`, `Node.js`, `Netlify Deployment`, `Responsive Design`

---

### ⭐ If you like this project, don’t forget to **star the repo** on GitHub!

**GitHub Tags:** `React` `Firebase` `Vite` `Inventory Management` `Tailwind CSS` `Netlify Deployment`
