import { initializeApp } from "firebase/app";
import { 
  initializeFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp 
} from "firebase/firestore";

// HARDCODED CONFIG
const firebaseConfig = {
  apiKey: "AIzaSy...", // Keep your real API key here
  authDomain: "web-app-eb614.firebaseapp.com",
  projectId: "web-app-eb614",
  storageBucket: "web-app-eb614.appspot.com",
  messagingSenderId: "721...", // Keep your real ID
  appId: "1:721..." // Keep your real App ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/**
 * FIX: experimentalForceLongPolling
 * This forces Firebase to use standard HTTPS requests instead of WebSockets.
 * This is the #1 fix for "Network Error" and "Empty Data" issues on 
 * mobile networks or restricted out-of-town Wi-Fi.
 */
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

// The Registration Function
export async function registerStudent(studentData) {
  const studentID = studentData.fullName.toLowerCase().replace(/\s/g, '');
  const studentRef = doc(db, "students", studentID);
  
  try {
    const docSnap = await getDoc(studentRef);

    if (docSnap.exists()) {
      throw new Error("ALREADY_BOOKED");
    }

    await setDoc(studentRef, {
      fullName: studentData.fullName,
      course: studentData.course,
      grade: studentData.grade,
      phone: studentData.phone,
      paid: false, 
      registeredAt: serverTimestamp() 
    });

    return { success: true };
  } catch (error) {
    console.error("Firebase Registration Error:", error);
    throw error; 
  }
                         }
