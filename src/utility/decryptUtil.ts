import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_REDUX_PERSIST_SECRET_KEY;

export const decryptData = (encryptedData: string): any => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error: any) {
    console.error("Decryption error:", error.message);
    return null;
  }
};