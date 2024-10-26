// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, onValue, ref, update} from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwOrmlGkw-T8RuvVf2NMEslYrtx2Iwnyw",
  authDomain: "reacttutorial-ziye.firebaseapp.com",
  databaseURL: "https://reacttutorial-ziye-default-rtdb.firebaseio.com",
  projectId: "reacttutorial-ziye",
  storageBucket: "reacttutorial-ziye.appspot.com",
  messagingSenderId: "300326140714",
  appId: "1:300326140714:web:9dc11fbd71418fa750fc53",
  measurementId: "G-VCEQLQDMKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDbData = (path) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
  
    useEffect(() => (
      onValue(ref(database, path), (snapshot) => {
       setData(snapshot.val() || {}); // Set to {} if no data
      }, (error) => {
        setError(error);
      })
    ), [path]);
  
    return [data, error];
  };
  

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};


export const useDbUpdate = (path) => {
    const [result, setResult] = useState(null);
    const database = getDatabase();
  
    const updateData = useCallback(async (value) => {
      try {
        await update(ref(database, path), value);
        setResult({ success: true });
      } catch (error) {
        setResult({ error });
        console.error("Error updating data:", error);
      }
    }, [database, path]);
  
    return [updateData, result];
  };
