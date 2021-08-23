import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaP3opI90HfrBsbWf6nQNg-IP9sKrlvLg",
  authDomain: "filehost-6da25.firebaseapp.com",
  projectId: "filehost-6da25",
  storageBucket: "filehost-6da25.appspot.com",
  messagingSenderId: "1012355460773",
  appId: "1:1012355460773:web:e025019c6c3b79ab7aa74c",
  measurementId: "G-1BS7Z71XMH"
};


const app = firebase.initializeApp(firebaseConfig);


const storage = app.storage();

export default storage;



