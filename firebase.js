// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBAScLzGdLpkfKncHhUHWaAga_tJbskyV0",
    authDomain: "tautoko-f16b0.firebaseapp.com",
    projectId: "tautoko-f16b0",
    storageBucket: "tautoko-f16b0.appspot.com",
    messagingSenderId: "821201005789",
    appId: "1:821201005789:web:c2dd816564f69a22387f34",
    measurementId: "G-1F01N6FWHC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
