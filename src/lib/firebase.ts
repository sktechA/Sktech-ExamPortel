import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfigJson from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId,
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Use custom database ID if provisioned, or default
export const firestore = firebaseConfigJson.firestoreDatabaseId
  ? getFirestore(app, firebaseConfigJson.firestoreDatabaseId)
  : getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Sign in with Google Popup via Firebase Auth
 */
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    if (user) {
      await syncUserProfile(user);
    }
    return user;
  } catch (error: any) {
    console.error('Firebase Google Sign-In error:', error);
    throw error;
  }
}

/**
 * Sign out of Firebase Auth
 */
export async function logOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Firebase Sign-Out error:', error);
    throw error;
  }
}

/**
 * Syncs user profile document to Firestore (/users/{userId})
 */
export async function syncUserProfile(user: FirebaseUser, extraData?: Record<string, any>) {
  if (!user) return;
  try {
    const userDocRef = doc(firestore, 'users', user.uid);
    await setDoc(
      userDocRef,
      {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Candidate',
        photoURL: user.photoURL || '',
        lastActiveAt: new Date().toISOString(),
        ...extraData,
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Failed to sync user profile to Firestore:', err);
  }
}

/**
 * Saves completed exam attempt to Firestore subcollection
 */
export async function saveExamAttemptToFirestore(
  userId: string,
  attempt: {
    attemptId: string;
    testId: string;
    testTitle: string;
    examTitle: string;
    score: number;
    totalMarks: number;
    accuracy: number;
    percentile?: number;
    submittedAt: string;
  }
) {
  try {
    const attemptDocRef = doc(firestore, 'users', userId, 'attempts', attempt.attemptId);
    await setDoc(attemptDocRef, {
      ...attempt,
      userId,
      savedAt: serverTimestamp(),
    });
    return true;
  } catch (err) {
    console.warn('Could not save attempt to Firestore:', err);
    return false;
  }
}

/**
 * Fetches user's past attempts from Firestore
 */
export async function getUserAttemptsFromFirestore(userId: string) {
  try {
    const attemptsCol = collection(firestore, 'users', userId, 'attempts');
    const q = query(attemptsCol, orderBy('submittedAt', 'desc'), limit(20));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => d.data());
  } catch (err) {
    console.warn('Could not retrieve attempts from Firestore:', err);
    return [];
  }
}

/**
 * Saves audio transcription notes for candidate doubt resolution
 */
export async function saveVoiceNoteToFirestore(
  userId: string,
  note: {
    id: string;
    transcription: string;
    audioDurationSeconds?: number;
    sourceLang?: string;
  }
) {
  try {
    const noteRef = doc(firestore, 'users', userId, 'voiceNotes', note.id);
    await setDoc(noteRef, {
      ...note,
      userId,
      createdAt: new Date().toISOString(),
    });
    return true;
  } catch (err) {
    console.warn('Could not save voice note to Firestore:', err);
    return false;
  }
}

/**
 * Fetches saved candidate voice notes
 */
export async function getUserVoiceNotesFromFirestore(userId: string) {
  try {
    const notesCol = collection(firestore, 'users', userId, 'voiceNotes');
    const snapshot = await getDocs(notesCol);
    return snapshot.docs.map((d) => d.data());
  } catch (err) {
    console.warn('Could not retrieve voice notes from Firestore:', err);
    return [];
  }
}
