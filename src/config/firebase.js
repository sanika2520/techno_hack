import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD1tUDz2rtHfBCxOzmH8v5C7JEGu_Psguo",
    authDomain: "technohack-5c634.firebaseapp.com",
    projectId: "technohack-5c634",
    storageBucket: "technohack-5c634.appspot.com",
    messagingSenderId: "332608322092",
    appId: "1:332608322092:web:35b37378916e50ed6c2f89"
  };


  const handleSignup = async (username, email, password) => {
  try {
    // Create the user in Firebase Authentication
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user; // Get the user info
    
    // Create a new user document in the 'users' collection
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: email,
      createdAt: new Date(),
      isActive: true
    });
    
    console.log("User successfully added to Firestore!");
  } catch (error) {
    console.error("Error signing up: ", error);
  }
};
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; // Export auth and db for use in your app