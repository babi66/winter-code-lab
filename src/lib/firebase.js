import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// The Registration Function
export async function registerStudent(studentData) {
  // Unique ID: lowercase name without spaces
  const studentID = studentData.fullName.toLowerCase().replace(/\s/g, '');
  const studentRef = doc(db, "students", studentID);
  
  // 1. Check if they already exist
  const docSnap = await getDoc(studentRef);

  if (docSnap.exists()) {
    throw new Error("ALREADY_BOOKED");
  }

  // 2. Save new student
  await setDoc(studentRef, {
    fullName: studentData.fullName,
    course: studentData.course,
    grade: studentData.grade,
    phone: studentData.phone,
    paid: false, // Secretary tracks this
    registeredAt: new Date().toISOString()
  });

  return { success: true };
}