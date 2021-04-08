import firebase from "firebase";
import Constants from "@/utils/Constants";

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};

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