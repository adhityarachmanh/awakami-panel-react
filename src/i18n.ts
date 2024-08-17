import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { AVAILABLE_LANGUAGES } from "./constants/app_constant";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    lng: "id",
    supportedLngs: AVAILABLE_LANGUAGES,
    fallbackLng: "id",
    ns: ["general"],
    defaultNS: "general",
    detection: {
      order: [
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["localStorage"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    react: {
      useSuspense: false,
    },
  });

export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
};



export default i18n;
