import { LanguageModel } from "@/types/LanguageModel";
import en from "@/assets/images/en.png";
import id from "@/assets/images/id.png";

export const WARGA_KAWIN_OPTIONS = {
  "1": "Belum Menikah",
  "2": "Menikah",
  "3": "Duda",
  "4": "Janda",
};
export const JENIS_KELAMIN_OPTIONS = {
  L: "Laki-laki",
  P: "Perempuan",
};

export const JABATAN_POSKO_OPTIONS = {
  "1": "Ketua",
  "2": "Wakil",
  "3": "Sekretaris",
  "4": "Bendahara",
};

export const LANGUAGE_OPTIONS: LanguageModel[] = [
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

export const AVAILABLE_LANGUAGES = LANGUAGE_OPTIONS.map(
  (option) => option.value
);
