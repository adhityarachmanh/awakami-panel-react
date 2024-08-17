import { LANGUAGE_OPTIONS } from "@/constants/app_constant";
import { LanguageModel } from "@/types/LanguageModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  currentLanguage: LanguageModel;
  availableLanguages: LanguageModel[];
}

const initialState: LanguageState = {
  currentLanguage: LANGUAGE_OPTIONS[0],
  availableLanguages: LANGUAGE_OPTIONS,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageModel>) => {
      state.currentLanguage = action.payload;
    },

    removeLanguage: (state, action: PayloadAction<string>) => {
      state.availableLanguages = state.availableLanguages.filter(
        (language) => language.value !== action.payload
      );
    },
  },
});

export const { setLanguage, removeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
