// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBAScLzGdLpkfKncHhUHWaAga_tJbskyV0",
    authDomain: "tautoko-f16b0.firebaseapp.com",
    projectId: "tautoko-f16b0",
    storageBucket: "tautoko-f16b0.appspot.com",
    messagingSenderId: "821201005789",
    appId: "1:821201005789:web:c2dd816564f69a22387f34",
    measurementId: "G-1F01N6FWHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };