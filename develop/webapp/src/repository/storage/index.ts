import { umesseLocalStorage } from "@/repository/storage/localStorage";
import { umesseSessionStorage } from "@/repository/storage/sessionStorage";

const localStorage = new umesseLocalStorage();
const sessionStorage = new umesseSessionStorage();

export { localStorage, sessionStorage };