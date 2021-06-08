import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBhVewBpRQDYQaZFqawGjX1Hg3J8tvFU1M",
    authDomain: "town-parking.firebaseapp.com",
    projectId: "town-parking",
    storageBucket: "town-parking.appspot.com",
    messagingSenderId: "547387786343",
    appId: "1:547387786343:web:6143a6bec9ba19de5940c2"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };