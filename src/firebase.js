import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDFFutlnCYU6Fw0HVQWHOJw7nWcE4f92E",
  authDomain: "link-shrink-125b2.firebaseapp.com",
  projectId: "link-shrink-125b2",
  storageBucket: "link-shrink-125b2.appspot.com",
  messagingSenderId: "307666355656",
  appId: "1:307666355656:web:45d3470e5739b579916cfd"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const storage = getStorage(app);
export const db = getFirestore(app);
// export {auth}
