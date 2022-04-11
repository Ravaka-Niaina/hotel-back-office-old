import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyDfb-Et0hcr9GJbXhFULgiquxYJTycUlls",
    authDomain: "moteur-reservation-adrware.firebaseapp.com",
    projectId: "moteur-reservation-adrware",
    storageBucket: "moteur-reservation-adrware.appspot.com",
    messagingSenderId: "65338018145",
    appId: "1:65338018145:web:4e99c0b84f44f905bf9d20",
    measurementId: "G-BQ95TXMFP0"
  };
  
  export const app = initializeApp(firebaseConfig);
  const messaging = getMessaging();

  export async function getFCMToken() {
    try {
        const token = await getToken(messaging, { vapidKey: "BHtt96R6hyeAS4nyIzhD7ipUMG2JKCC6zdBXeBuxvNdl-LkdY_ZH8tIfOjcidt8GrFfkmYiJbfpmMT-9TkNfRmo" });
        console.log(token);
        return token;
    } catch (e) {
        console.log('getFCMToken error', e);
        return undefined
    }
}