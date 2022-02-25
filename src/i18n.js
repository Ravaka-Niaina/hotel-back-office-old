import i18n from "i18next";
import { initReactI18next } from "react-i18next";


// Importing translation files

import translationEN from "./components/client/NavbarClient/locales/en/translation.json";
import translationHE from "./components/client/NavbarClient/locales/fr/translation.json";


//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationHE,
  },
};

//i18N Initialization

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng:"en", //default language
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;


// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from 'i18next-browser-languagedetector';
// import { Language } from "./enums/Language";
// import translationEN from './i18n/en.json';
// import translationFR from './i18n/fr.json';
 
// let defaultLanguage = Language.FR;
 
// // the translations
// const resources = {
//   en: {
//     translation: translationEN
//   },
//   fr: {
//     translation: translationFR
//   }
// };
 
// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .init({
//     resources,
//     lng: defaultLanguage,
 
//     keySeparator: ".",  // to support nested translations
 
//     interpolation: {
//       escapeValue: false // react already safes from xss
//     }
//   });
 
//   export default i18n;