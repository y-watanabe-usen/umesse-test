import firebase from "firebase";
import Constants from "./Constants";

// const settings = { timestampsInSnapshots: true };

const config = {
  // apiKey: process.env.VUE_APP_API_KEY,
  // authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  // databaseURL: process.env.VUE_APP_DATABASE_URL,
  // projectId: process.env.VUE_APP_PROJECT_ID,
  // storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  // appId: process.env.VUE_APP_AP_ID,
  // measurementId: process.env.VUE_APP_MEASUREMENT_ID
  apiKey: "AIzaSyCNT_F6BiuITsI_RgJZUq93Se-g80G_1I4",
  authDomain: "umesse-a79a1.firebaseapp.com",
  projectId: "umesse-a79a1",
  storageBucket: "umesse-a79a1.appspot.com",
  messagingSenderId: "489365036439",
  appId: "1:489365036439:web:117dfe92f2c099860b38d2",
  measurementId: "G-GYKXYCBYGJ"
};

console.log(config); // 参照出来ているかの確認用

firebase.initializeApp(config);

const fireBaseAnalytics = firebase.analytics();

const setUserId = (id: string) => {
  fireBaseAnalytics.setUserId(id);
};

const selectNarration = (id: string) => {
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.NARRATION,
    content_id: id
  });
};

const selectOpenChime = (id: string) => {
  fireBaseAnalytics.logEvent("select_content", {
    content_type: "open-chime",
    content_id: id
  });
};

const selectEndChime = (id: string) => {
  fireBaseAnalytics.logEvent("select_content", {
    content_type: "end-chime",
    content_id: id
  });
};

const selectBgm = (id: string) => {
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.BGM,
    content_id: id
  });
};

const selectTemplate = (id: string) => {
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.TEMPLATE,
    content_id: id
  });
};

const selectFree = (id: string) => {
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.FREE,
    content_id: id
  });
};

const analytics = {
  setUserId,
  selectNarration,
  selectOpenChime,
  selectEndChime,
  selectBgm,
  selectTemplate,
  selectFree,
};

export default analytics;