import { axios } from "./index.js";

export default {
  list() {
    return axios.$get(`list`);
  }
};
