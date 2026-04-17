import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth"; 
import { 
  initializeFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp 
} from "firebase/firestore";

// HARDCODED CONFIG
const firebaseConfig = {
  apiKey: "AIzaSy...", // Ensure your real key is here
  authDomain: "web-app-eb614.firebaseapp.com",
  projectId: "web-app-eb614",
  storageBucket: "web-app-eb614.appspot.com",
  messagingSenderId: "721...", 
  appId: "1:721..." 
};

// 1. Initialize Firebase App (Only once!)
const app = initializeApp(firebaseConfig);

// 2. Initialize Auth
export const auth = getAuth(app);

// 3. Initialize Firestore with Long Polling fix
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

/**
 * LOGOUT FUNCTION
 */
export async function logoutUser() {
  try {
    await signOut(auth);
    window.location.href = "/office"; // Redirect to login page
  } catch (error) {
    console.error("Logout Error:", error);
    alert("Error logging out. Please try again.");
  }
}

/**
 * REGISTRATION FUNCTION
 */
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