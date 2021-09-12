import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCozHMDNo6R4j_eWMxyYugIJGGLo-On18Q",
  authDomain: "filehostreact.firebaseapp.com",
  projectId: "filehostreact",
  storageBucket: "filehostreact.appspot.com",
  messagingSenderId: "409357180268",
  appId: "1:409357180268:web:256ea62da4ee1b534e2749",
  measurementId: "G-2BGBCRWM6J"
};

const app = firebase.initializeApp(firebaseConfig);


const storage = app.storage();

export default storage;



