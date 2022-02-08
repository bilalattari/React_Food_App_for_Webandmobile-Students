// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, where, query } from 'firebase/firestore'


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

export const onAuthChanges = new Promise(function (resolve, reject) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            resolve(user)
        } else {
            reject(false)
        }
    })

})







export const loginWithGoogle = () => {

    let userInfo = null

    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            userInfo = user
            console.log('user==>', user)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('errorMessage=>', errorMessage)
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

    return userInfo
}

export const logout = () => {
    signOut(auth).then(() => {
        alert('logout')
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}


export const addTodoToFirebase = (todo) => new Promise((resolve, reject) => {
    let obj = {
        todo,
        uid: auth.currentUser.uid
    }

    addDoc(todoRef, obj).then(() => {
        resolve(true)
    })
        .catch((err) => {
            console.log(err)
            reject(false)
        })
})

export const getUsersTodos = () => new Promise((resolve, reject) => {

    console.log('auth.currentUser==>', auth.currentUser)
    const q = query(collection(db, "todo"), where("uid", "==", auth.currentUser.uid));

    getDocs(q).then((querySnapshot) => {
        let array = []
        querySnapshot.forEach((doc) => {
            array.push({ id: doc.id, ...doc.data() })
        });

        resolve(array)
    }).catch((err) => reject(err));


})