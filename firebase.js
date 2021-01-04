import firebase from "firebase/app"
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyBREDzu1TkZWu3L1LBnIJnanDIUsSKlvTs",
  authDomain: "bithook-default-rtdb.firebaseio.com/",
  databaseURL: "https://bithook-default-rtdb.firebaseio.com/",
  projectId: "bithook",
  storageBucket: "https://bithook.appspot.com/",
  messagingSenderId: "YOUR_MESSAGING_ID"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;