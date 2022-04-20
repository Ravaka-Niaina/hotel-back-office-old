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
        const FCMToken = await getToken(messaging, { vapidKey: process.env.VAPIDKEY });
        console.log(FCMToken);
        callAPI('post', '/notificationReservation/insertFCMTokenNotifReserv', {FCMToken: FCMToken}, (res) => {
            console.log(res);
        });
    } catch (e) {
        console.log('getFCMToken error', e);
        return undefined
    }
}

let listenersMessage = [];

export function addListenerMessage(listener){
    listenersMessage.push(listener);
    console.log("listenersMessage = " + listenersMessage.length);
}

onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    console.log("listenersMessage = " + listenersMessage.length);
    let notifsReservation = localStorage.getItem("notifsReservation");
    try{
        notifsReservation = JSON.parse(notifsReservation);
        notifsReservation.push(payload.data);
    }catch(err){
        notifsReservation = [payload.data];
    }
    localStorage.setItem('notifsReservation', JSON.stringify(notifsReservation));
    // window.dispatchEvent(new Event("newNotifReserv"));
    // window.addEventListener("newNotifReserv", () => { console.log("Event detected from Notification.js ! :)") });
    for(let i = 0; i < listenersMessage.length; i++){
        listenersMessage[i](payload);
    }
});