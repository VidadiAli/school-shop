import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCQohBQzLak9u4ZAlK0R7Mm6xr8WC0w3ww",
    authDomain: "api-school-shop.firebaseapp.com",
    projectId: "api-school-shop",
    storageBucket: "api-school-shop.appspot.com",
    messagingSenderId: "481285154056",
    appId: "1:481285154056:web:ddcd0d9926407cc718f8bd"
};

const app = initializeApp(firebaseConfig);

export const imageDb = getStorage(app);