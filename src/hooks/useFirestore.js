import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

import { db } from "../firebase/config";

const useFirestore = (collectionName, condition) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        let collectionRef = query(collection(db, collectionName), orderBy('createAt'));

        if (condition) {
            let { fieldName, operator, compareValue } = condition;
            if (!compareValue || !compareValue.length) {
                // reset documents

                setDocuments([]);
                return;
            }

            collectionRef = query(collectionRef, where(fieldName, operator, compareValue));
        }

        const unsubscribe = onSnapshot(collectionRef, snapshot => {
            const documents = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setDocuments(documents);
        });

        return unsubscribe;
    }, [collectionName, condition]);

    return documents;
}

export default useFirestore;