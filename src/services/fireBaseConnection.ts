import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyClivMc2MNBu_RkBMQ-Ga5htO9pGI0nnMQ",
    authDomain: "task-board-c59f3.firebaseapp.com",
    projectId: "task-board-c59f3",
    storageBucket: "task-board-c59f3.firebasestorage.app",
    messagingSenderId: "613889635466",
    appId: "1:613889635466:web:b2cddc9f25eea227f1a973"
};


const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export default db;