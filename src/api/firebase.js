import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

const auth = getAuth();

export function onChangeAuth(callback) {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}

export async function login() {
    return signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            return user;
        })
        .catch(console.error);
}

export async function logout() {
    signOut(auth)
        .then(() => null)
        .catch(console.error);
}
