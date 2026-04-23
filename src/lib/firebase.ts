import { initializeApp } from "firebase/app";
import * as realDB from "firebase/database";
import * as realAuthLib from "firebase/auth";
import { mockAuth, mockDb } from "./firebaseMock";

const firebaseConfig = {
  apiKey: "AIzaSy_MOCK_KEY_LUMINA",
  authDomain: "lumina-focus.firebaseapp.com",
  databaseURL: "https://lumina-focus-default-rtdb.firebaseio.com",
  projectId: "lumina-focus",
  storageBucket: "lumina-focus.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const isMock = firebaseConfig.apiKey.includes("MOCK_KEY");

// Initialize real Firebase only if keys are valid
let realApp, realDbInst: any, realAuthInst: any;
if (!isMock) {
  try {
    realApp = initializeApp(firebaseConfig);
    realDbInst = realDB.getDatabase(realApp);
    realAuthInst = realAuthLib.getAuth(realApp);
  } catch (e) {
    console.warn("Firebase failed to initialize, falling back to mock.");
  }
}

// --- Dynamic Exports ---

// Auth
export const auth = isMock ? mockAuth : realAuthInst;
export const onAuthStateChanged = isMock ? mockAuth.onAuthStateChanged : realAuthLib.onAuthStateChanged;
export const createUserWithEmailAndPassword = isMock ? mockAuth.createUserWithEmailAndPassword : realAuthLib.createUserWithEmailAndPassword;
export const signInWithEmailAndPassword = isMock ? mockAuth.signInWithEmailAndPassword : realAuthLib.signInWithEmailAndPassword;
export const signOut = isMock ? mockAuth.signOut : realAuthLib.signOut;

// Database
export const db = isMock ? mockDb : realDbInst;
export const ref = isMock ? mockDb.ref : realDB.ref;
export const onValue = isMock ? mockDb.onValue : realDB.onValue;
export const set = isMock ? mockDb.set : realDB.set;
export const update = isMock ? mockDb.update : realDB.update;
export const push = isMock ? mockDb.push : realDB.push;
export const serverTimestamp = isMock ? mockDb.serverTimestamp : realDB.serverTimestamp;
export const onDisconnect = isMock ? ((r: any) => r.onDisconnect()) : realDB.onDisconnect;
