import firebase from 'firebase';
// import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyALj2W8qaJbDMgyMyKSaPaWYnGE8hfAt9c',
  authDomain: 'linkediinn-clone.firebaseapp.com',
  projectId: 'linkediinn-clone',
  storageBucket: 'linkediinn-clone.appspot.com',
  messagingSenderId: '148440805036',
  appId: '1:148440805036:web:2a81de43ae3227db34b909',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const storage = firebase.storage();
// const storage = getStorage(firebaseApp);

export { auth, storage, provider };
export default db;
// export default storage;
