// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, onSnapshot, collection, addDoc, getDocs, where, query, getDoc, doc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDKTslFoMPcgTeEXnnu9sxxn9rChu6pFrw",
    authDomain: "new-project-4b177.firebaseapp.com",
    projectId: "new-project-4b177",
    storageBucket: "new-project-4b177.appspot.com",
    messagingSenderId: "1006741241233",
    appId: "1:1006741241233:web:143dd7ce76ccadc42b6e30",
    measurementId: "G-VRBDT4KEXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const auth = getAuth();
const db = getFirestore();
const todoRef = collection(db, 'todo')
const userRef = collection(db, 'user')
const eventRef = collection(db, 'events')

export {
    auth,
    db, todoRef,
    onAuthStateChanged,
    signInWithPopup,
    addDoc, getDocs,
    getDoc,
    where, query,
    getStorage, ref,
    getDownloadURL,
    eventRef,
    doc,
    onSnapshot,
    userRef,
    signOut, uploadBytes,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
}