import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB8tQHXjfEhmqYSqn5nkzY4mIOETEBhORE",
    authDomain: "plumberuber-9af6e.firebaseapp.com",
    projectId: "plumberuber-9af6e",
    storageBucket: "plumberuber-9af6e.firebasestorage.app",
    messagingSenderId: "321008959302",
    appId: "1:321008959302:web:a3f0cd77049ef97db1ef47"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
