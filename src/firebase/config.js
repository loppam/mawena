import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCOeFI-jQBehveyrh4YGmdvJXQvPbnQE2Q",
    authDomain: "mawena-b4cb8.firebaseapp.com",
    projectId: "mawena-b4cb8",
    storageBucket: "mawena-b4cb8.firebasestorage.app",
    messagingSenderId: "503280488594",
    appId: "1:503280488594:web:f29f0b5b162e6c9abe964b",
    measurementId: "G-VDRB7SHJ9D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
    
export { db, auth };
