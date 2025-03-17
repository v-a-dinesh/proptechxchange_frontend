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

// Firebase configuration
// Firebase configuration
// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Create or update user document in Firestore
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

// Retrieve user document from Firestore
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

// Register user with email and password
export const registerWithEmail = async (email, password, displayName, role = 'buyer') => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await updateProfile(user, { displayName });
    await createUserDocument(user, { displayName, role });
    
    return userCredential;
  } catch (error) {
    console.error("Registration error", error);
    throw error;
  }
};

// Login user with email and password
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
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

// Login user with Google
export const loginWithGoogle = async (role = 'buyer') => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
    
    await createUserDocument(user, { role });
    
    return userCredential;
  } catch (error) {
    console.error("Google login error", error);
    throw error;
  }
};

// Logout user
export const logoutUser = () => signOut(auth);

// Send password reset email
export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// Get user role
export const getUserRole = async (uid) => {
  try {
    const userDoc = await getUserDocument(uid);
    return userDoc ? userDoc.role : null;
  } catch (error) {
    console.error("Error getting user role", error);
    return null;
  }
};

// Update user profile
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