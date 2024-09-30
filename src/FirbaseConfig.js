// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// const firebaseConfig = {
//   apiKey: "AIzaSyAwrkGHQsA5yDtzP01zxvx8WBCIqLHE2uM",
//   authDomain: "cricket-react.firebaseapp.com",
//   databaseURL: "https://cricket-react-default-rtdb.firebaseio.com",
//   projectId: "cricket-react",
//   storageBucket: "cricket-react.appspot.com",
//   messagingSenderId: "223294502919",
//   appId: "1:223294502919:web:9eff9feedbe0d95fb852a2",
//   measurementId: "G-YSBMKPM69K",
// };
const firebaseConfig = {
  apiKey: "AIzaSyCDSHyTco_I2Qw8NWSm_M_-IXg0qezNw-c",
  authDomain: "company-43dfe.firebaseapp.com",
  projectId: "company-43dfe",
  storageBucket: "company-43dfe.appspot.com",
  messagingSenderId: "686261874890",
  appId: "1:686261874890:web:597b70e77efce598bb4433",
  measurementId: "G-FTLL2R26N7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;
