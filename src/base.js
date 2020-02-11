import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseApp = firebase.initializeApp({ 
    apiKey: "AIzaSyATAGaJa4W_marjDLu518aIIqvziwYzAew",
    authDomain: "chatbotdemort.firebaseapp.com",
    databaseURL: "https://chatbotdemort.firebaseio.com"
});

const base = Rebase.createClass(firebase.database());

export { firebaseApp };
export default base;