import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  updateDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAcslN11DR5BhSQDAbJELvaKwN7_1fr3BY",
  authDomain: "proptechxchange-f8a94.firebaseapp.com",
  projectId: "proptechxchange-f8a94",
  storageBucket: "proptechxchange-f8a94.firebasestorage.app",
  messagingSenderId: "638439193013",
  appId: "1:638439193013:web:1ca8c3a20c58de4d7ec1fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// User Document Creation
export const createUserDocument = async (user, additionalData = {}) => {
  if (!user) return null;

  const userRef = doc(db, 'users', user.uid);

  const userData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || additionalData.displayName,
    role: additionalData.role || 'buyer',
    createdAt: new Date(),
    lastLogin: new Date(),
    ...additionalData
  };

  try {
    await setDoc(userRef, userData, { merge: true });
    return getUserDocument(user.uid);
  } catch (error) {
    console.error("Error creating user document", error);
    throw error;
  }
};

// Get User Document
export const getUserDocument = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    return userSnap.exists() ? userSnap.data() : null;
  } catch (error) {
    console.error("Error getting user document", error);
    throw error;
  }
};

// Authentication Methods with Role Support
export const registerWithEmail = async (email, password, displayName, role = 'buyer') => {
  try {
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile
    await updateProfile(user, { displayName });
    
    // Create user document in Firestore
    await createUserDocument(user, { displayName, role });
    
    return userCredential;
  } catch (error) {
    console.error("Registration error", error);
    throw error;
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last login
    const userDoc = await getUserDocument(userCredential.user.uid);
    if (userDoc) {
      const userRef = doc(db, 'users', userCredential.user.uid);
      await updateDoc(userRef, { lastLogin: new Date() });
    }
    
    return userCredential;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};

export const loginWithGoogle = async (role = 'buyer') => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
    
    // Create or update user document
    await createUserDocument(user, { role });
    
    return userCredential;
  } catch (error) {
    console.error("Google login error", error);
    throw error;
  }
};

export const logoutUser = () => signOut(auth);

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// Get User Role
export const getUserRole = async (uid) => {
  try {
    const userDoc = await getUserDocument(uid);
    return userDoc ? userDoc.role : null;
  } catch (error) {
    console.error("Error getting user role", error);
    return null;
  }
};

// Update User Profile
export const updateUserProfile = async (uid, updateData) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, updateData);
    return getUserDocument(uid);
  } catch (error) {
    console.error("Error updating user profile", error);
    throw error;
  }
};

export default app;