import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDj2hezN9sPiBxo4BYO2GqO4g5xnvWt0yw",
  authDomain: "luci-a-la-moda.firebaseapp.com",
  projectId: "luci-a-la-moda",
  storageBucket: "luci-a-la-moda.appspot.com",
  messagingSenderId: "265671153411",
  appId: "1:265671153411:web:7883dc72513a8b9a10bb36"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);