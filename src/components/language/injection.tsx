import { useRootSelector } from "@/stores";
import { changeLanguage } from "i18next";
import React, { useEffect } from "react";

const LanguageInjection = ({ children }: { children: React.ReactNode }) => {
  const { currentLanguage } = useRootSelector((state) => state.language);
  useEffect(() => {
    changeLanguage(currentLanguage.value);
  }, [currentLanguage]);
  return children;
};

export default LanguageInjection;
