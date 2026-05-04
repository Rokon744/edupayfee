// ─────────────────────────────────────────────────────────────────────────────
// src/firebase/config.js
//
// HOW TO SET UP:
//   1. Go to https://console.firebase.google.com/
//   2. Create a new project (or open an existing one).
//   3. Click "Add app" → Web (</> icon).
//   4. Copy the firebaseConfig object shown and paste it below,
//      replacing the placeholder values.
//   5. In Firestore → Rules, set read/write to true for testing:
//        allow read, write: if true;
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAeYK595T4Mb9-h9PbGB21DTTcYfmI7UMs",
  authDomain: "fee-payment-a169d.firebaseapp.com",
  projectId: "fee-payment-a169d",
  storageBucket: "fee-payment-a169d.firebasestorage.app",
  messagingSenderId: "1065047773367",
  appId: "1:1065047773367:web:e5513c0a5ea9a8f7003d32",
  measurementId: "G-V4E37Z3CRJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore database instance
export const db = getFirestore(app);
