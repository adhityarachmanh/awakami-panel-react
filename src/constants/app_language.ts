import { LanguageModel } from "@/types/LanguageModel";
import en from "@/assets/images/en.png";
import id from "@/assets/images/id.png";

const LANGUAGE_FEATURE = ["general", "login"];

const LANGUAGE_OPTIONS: LanguageModel[] = [
  {
    label: "English",
    value: "en",
    image: en,
  },
  {
    label: "Indonesian",
    value: "id",
    image: id,
  },
];

const AVAILABLE_LANGUAGES = LANGUAGE_OPTIONS.map((option) => option.value);

export { LANGUAGE_OPTIONS, AVAILABLE_LANGUAGES, LANGUAGE_FEATURE };
