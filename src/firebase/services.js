import { addDoc, serverTimestamp, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "./config";

const addDocument = async (collectionName, data) => {
    const query = collection(db, collectionName);
    addDoc(query, {
        ...data,
        createAt: serverTimestamp()
    });
}

const updateDocument = async (collectionName, data) => {
    const query = doc(db, collectionName);
    updateDoc(query, {
        ...data,
        createAt: serverTimestamp()
    })
}

export { addDocument, updateDocument };