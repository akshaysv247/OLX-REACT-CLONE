import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firebase'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX95MZfTtH-FSkjKdXDfZmvK8UhckDCHc",
  authDomain: "olx-react-4da85.firebaseapp.com",
  projectId: "olx-react-4da85",
  storageBucket: "olx-react-4da85.appspot.com",
  messagingSenderId: "800220567495",
  appId: "1:800220567495:web:d604d62506d3c679b4ebe2",
  measurementId: "G-W6P79ZNVWJ"
};

export default firebase.initializeApp(firebaseConfig)