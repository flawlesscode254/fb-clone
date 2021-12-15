import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCW4xlcFFCZ3TsyXIlcKiGTMPikWOaAhmg",

  authDomain: "music-chat-forum.firebaseapp.com",

  projectId: "music-chat-forum",

  storageBucket: "music-chat-forum.appspot.com",

  messagingSenderId: "26203601931",

  appId: "1:26203601931:web:d1a898bcb12b42ef61db0e"

  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db  = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const store = firebase.storage();


export { auth, provider, store }
export default db