import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd3MQBbJmVNuPwZzK4IkY4pt5rAdpbs1o",
  authDomain: "movie-mania-4fc5b.firebaseapp.com",
  projectId: "movie-mania-4fc5b",
  storageBucket: "movie-mania-4fc5b.appspot.com",  // Corrected storage bucket URL
  messagingSenderId: "382216799018",
  appId: "1:382216799018:web:5b406389ce045a72009453"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
