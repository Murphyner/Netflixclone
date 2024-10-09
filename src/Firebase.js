// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyCVDiewYp1de0c7AzIv5bZp6LFJ6rT4-O4",
    authDomain: "netflix-c1419.firebaseapp.com",
    projectId: "netflix-c1419",
    storageBucket: "netflix-c1419.appspot.com",
    messagingSenderId: "747735055012",
    appId: "1:747735055012:web:d66661bebb7697fa9a4431",
    measurementId: "G-6W44VDR6X4"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)