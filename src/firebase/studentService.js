// ─────────────────────────────────────────────────────────────────────────────
// src/firebase/studentService.js
//
// Contains all Firestore database operations for students.
// The "students" collection uses Roll Number as the document ID.
//
// Firestore Data Structure Example:
// Collection: students
// Document ID: "CSE-2024-01"   ← this is the Roll Number
// Fields:
//   name       : "Rahim Uddin"
//   dueAmount  : 12500          ← amount in BDT (Taka)
//   status     : "unpaid"       ← "unpaid" | "paid"
// ─────────────────────────────────────────────────────────────────────────────

import { db } from "./config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

/**
 * Fetch a single student by their Roll Number.
 * @param {string} roll - The student's roll number (Firestore document ID)
 * @returns {Promise<Object|null>} Student data object or null if not found
 */
export async function getStudentByRoll(roll) {
  const rollTrimmed = roll.trim().toUpperCase();
  const docRef = doc(db, "students", rollTrimmed);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}

/**
 * Mark a student's fee as paid after successful payment.
 * @param {string} roll - The student's roll number
 */
export async function markStudentAsPaid(roll) {
  const rollTrimmed = roll.trim().toUpperCase();
  const docRef = doc(db, "students", rollTrimmed);
  await updateDoc(docRef, { status: "paid" });
}
