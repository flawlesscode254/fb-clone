import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAEHbHjGjRx-9kBskih9Zk0kH_E7sb2KYE",
    authDomain: "facebook-cl-a5921.firebaseapp.com",
    projectId: "facebook-cl-a5921",
    storageBucket: "facebook-cl-a5921.appspot.com",
    messagingSenderId: "195078134406",
    appId: "1:195078134406:web:2da35ea8709952efcb8f07",
    measurementId: "G-E6416SNT8B"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db  = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const store = firebase.storage();


export { auth, provider, store }
export default db