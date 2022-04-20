import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

import callAPI from '../../../utility.js';

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

export async function insertFCMTokenNotifReserv() {
    try {
        const FCMToken = await getToken(messaging, { vapidKey: "BHtt96R6hyeAS4nyIzhD7ipUMG2JKCC6zdBXeBuxvNdl-LkdY_ZH8tIfOjcidt8GrFfkmYiJbfpmMT-9TkNfRmo" });
        console.log(FCMToken);
        callAPI('post', '/notificationReservation/insertFCMTokenNotifReserv', {FCMToken: FCMToken}, (res) => {
            console.log(res);
        });
    } catch (e) {
        console.log('getFCMToken error', e);
        return undefined
    }
}

onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    let notifsReservation = localStorage.getItem("notifsReservation");
    try{
        notifsReservation = JSON.parse(notifsReservation);
        notifsReservation.push(payload.data);
    }catch(err){
        notifsReservation = [payload.data];
    }
    localStorage.setItem('notifsReservation', JSON.stringify(notifsReservation));
});