import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDK7B33MP_U78QsDcXE38VyGrRjJnEa5KY",
    authDomain: "school-api-90544.firebaseapp.com",
    projectId: "school-api-90544",
    storageBucket: "school-api-90544.appspot.com",
    messagingSenderId: "91476997109",
    appId: "1:91476997109:web:7006e08c6b74124fd5a6bc"
};

const app = initializeApp(firebaseConfig);

export const imageDb = getStorage(app);