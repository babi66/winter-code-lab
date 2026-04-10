import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

// HARDCODED CONFIG - This ensures Vercel sees the data
const firebaseConfig = {
  apiKey: "AIzaSy...", // Ensure this is your ACTUAL API Key
  authDomain: "winter-code-lab.firebaseapp.com",
  projectId: "winter-code-lab",
  storageBucket: "winter-code-lab.appspot.com",
  messagingSenderId: "721...", // Ensure this is your ACTUAL ID
  appId: "1:721..." // Ensure this is your ACTUAL App ID
};

// Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// The Registration Function
export async function registerStudent(studentData) {
  // Unique ID: lowercase name without spaces
  const studentID = studentData.fullName.toLowerCase().replace(/\s/g, '');
  const studentRef = doc(db, "students", studentID);
  
  try {
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
      paid: false, 
      registeredAt: serverTimestamp() // Better than new Date() for Firebase
    });

    return { success: true };
  } catch (error) {
    console.error("Firebase Registration Error:", error);
    throw error; 
  }
}