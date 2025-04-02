import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
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
const database = getDatabase(app);
const auth = getAuth();

export function onChangeAuth(callback) {
    onAuthStateChanged(auth, async (user) => {
        const updatedUser = user ? await isAdminUser(user) : user;
        callback(updatedUser);
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

async function isAdminUser(user) {
    return get(ref(database, `admins`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const value = snapshot.val();
                const isAdmin = value.includes(user.uid);
                return { ...user, isAdmin };
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}
