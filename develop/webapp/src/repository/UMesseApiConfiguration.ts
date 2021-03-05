import { Configuration } from "umesseapi";

const headerOptions = process.env.VUE_APP_API_KEY ? {
  "x-api-key": process.env.VUE_APP_API_KEY
} : undefined;
export const config = new Configuration({
  basePath: process.env.VUE_APP_BASE_URL,
  baseOptions: {
    headers: headerOptions
  }
});