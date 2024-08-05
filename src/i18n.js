// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend) // Load translations from your backend or public/local files
  .use(initReactI18next) // Bind i18n to react-i18next
  .init({
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language
    debug: true, // Enable debugging
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    backend: {
      // Load translations from the public/local directory
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
