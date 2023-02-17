import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: window.REACT_APP_API_KEY,
  authDomain: window.REACT_APP_AUTH_DOMAIN,
  projectId: window.REACT_APP_PROJECT_ID,
  storageBucket: window.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: window.REACT_APP_MESSAGING_SENDER_ID,
  appId: window.REACT_APP_APP_ID
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const storage = getStorage(app);
export const db = getFirestore(app);
// export {auth}
