import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwxbgU5EkPXmvL6vEWPtT1Qu1wsVFV2eg",
  authDomain: "laundry-application-7d54d.firebaseapp.com",
  projectId: "laundry-application-7d54d",
  storageBucket: "laundry-application-7d54d.appspot.com",
  messagingSenderId: "662257380073",
  appId: "1:662257380073:web:377d3e34b8c3dfc7fe5e78",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export { auth, db };
