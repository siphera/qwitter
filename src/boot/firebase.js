import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBMtIVjDr_h2xHuTVjTWFTnDh_yIGu5dGI",
    authDomain: "qwitter-f537b.firebaseapp.com",
    projectId: "qwitter-f537b",
    storageBucket: "qwitter-f537b.appspot.com",
    messagingSenderId: "463960378070",
    appId: "1:463960378070:web:6c46aa9a86cf25ad569777"
}


firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()

export default db