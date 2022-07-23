import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyDVSH3Z9KwYpGGVbSa4NUeSlPjypSv63CA",
  authDomain: "notify-3dd17.firebaseapp.com",
  databaseURL: "https://notify-3dd17-default-rtdb.firebaseio.com",
  projectId: "notify-3dd17",
  storageBucket: "notify-3dd17.appspot.com",
  messagingSenderId: "319404790305",
  appId: "1:319404790305:web:0e519ec19e5b2b24518960"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

