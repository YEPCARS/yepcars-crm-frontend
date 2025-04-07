import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBld09GRxuyAsK782Jfvc5nbphixJqspg",
  authDomain: "yepcarscrm.firebaseapp.com",
  projectId: "yepcarscrm",
  storageBucket: "yepcarscrm.firebasestorage.app",
  messagingSenderId: "69077679674",
  appId: "1:69077679674:web:33715f13b99d59940a3f03",
  measurementId: "G-Q2TXY0PPLQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };