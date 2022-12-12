import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD-TYfHVvRiYCbp7bMcRN2UPDmH69_z6P0",
    authDomain: "chat-app-e9577.firebaseapp.com",
    projectId: "chat-app-e9577",
    storageBucket: "chat-app-e9577.appspot.com",
    messagingSenderId: "866119950149",
    appId: "1:866119950149:web:c045f02fba707415ad282c",
    measurementId: "G-ZHB1ZGM52Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

//Firebase localhost
// if (process.env.NODE_ENV !== "production") {
//     connectAuthEmulator(auth, "http://localhost:9099");
//     connectFirestoreEmulator(db, "localhost", 8080);
// }

export { auth, db };
export default app;