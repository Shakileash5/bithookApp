import firebase from "firebase/app"
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "api key",
  authDomain: "appName.firebaseio.com/",
  databaseURL: "https://appName.firebaseio.com/",
  projectId: "bithook",
  storageBucket: "https://appName.com/",
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;