import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAooR6l2rZK8xhMP6niVU2lPQYtb2o4kRU",
    authDomain: "warehouse-supply-f9589.firebaseapp.com",
    projectId: "warehouse-supply-f9589",
    storageBucket: "warehouse-supply-f9589.appspot.com",
    messagingSenderId: "720235772926",
    appId: "1:720235772926:web:4c604414704972d248deaf"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };

const database = getDatabase(app);
export { database };