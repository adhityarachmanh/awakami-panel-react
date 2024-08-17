import { LanguageModel } from "@/types/LanguageModel";

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
    image: "https://cdn-icons-png.flaticon.com/512/555/555417.png",
  },
  {
    label: "Indonesian",
    value: "id",
    image: "https://cdn-icons-png.flaticon.com/512/14009/14009993.png",
  },
];

export const AVAILABLE_LANGUAGES = LANGUAGE_OPTIONS.map(
  (option) => option.value
);
