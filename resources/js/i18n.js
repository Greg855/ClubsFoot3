import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector)
    .use(HttpApi)
    .use(initReactI18next)
    .init({
        supportedLngs: ["en", "fr", "jp"],
        fallbackLng: "en",
        detection: {
            order: ["localStorage", "htmlTag", "navigator"],
            caches: ["localStorage"],
            lookupLocalStorage: "i18nextLng",
        },
        backend: {
           loadPath: "/locales/{{lng}}/general.json"
        }
    });

export default i18n;
