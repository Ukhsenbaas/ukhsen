import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDr9mnEB1vr7uvYKoNp2T1rgdDdYre6u94",
    authDomain: "zenly-50e97.firebaseapp.com",
    projectId: "zenly-50e97",
    storageBucket: "zenly-50e97.appspot.com",
    messagingSenderId: "618454124830",
    appId: "1:618454124830:web:cbb2f09c2bd692efcde10f"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);