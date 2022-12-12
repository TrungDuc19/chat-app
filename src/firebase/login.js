import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";

import { auth } from "./config";
import { addDocument } from "./services";

const handleSignInWithPopup = (provider) => (
    signInWithPopup(auth, provider)
        .then(async result => {
            const { isNewUser } = getAdditionalUserInfo(result);
            if (isNewUser) {
                const { providerId } = result;
                const { displayName, email, photoURL, uid } = result.user;
                await addDocument('users', {
                    displayName,
                    email,
                    photoURL,
                    uid,
                    providerId
                });
            }
        })
        .catch(error => {
            console.log(error.message);
        })
)

const providerGoogle = new GoogleAuthProvider();
const signInWithGoogle = () => handleSignInWithPopup(providerGoogle);

const providerFaceBook = new FacebookAuthProvider();
const signInWithFaceBook = () => handleSignInWithPopup(providerFaceBook);

export { signInWithGoogle, signInWithFaceBook };
