// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { env } from "$env/dynamic/public";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.PUBLIC_API_KEY,
  authDomain: env.PUBLIC_AUTH_DOMAIN,
  databaseURL: env.PUBLIC_DATABASE_URL,
  projectId: env.PUBLIC_PROJECT_ID,
  storageBucket: env.PUBLIC_STORAGE_BUCKET,
  messagingSenderId: env.PUBLIC_MESSAGE_SENDER_ID,
  appId: env.PUBLIC_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const rtdb = getDatabase(app);

export { app, auth, rtdb };
