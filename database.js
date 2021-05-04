import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyCRC0Q9IhlFdwAV7-uAwD7FK8n4Alcbtgg',
	authDomain: 'soga-bfdd2.firebaseapp.com',
	projectId: 'soga-bfdd2',
	storageBucket: 'soga-bfdd2.appspot.com',
	messagingSenderId: '391139800243',
	appId: '1:391139800243:web:a8a83aa400398f39902cc6',
};
// Initialize Firebase

let app;
if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { db, storage, auth };
