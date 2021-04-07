import firebase from "firebase";
import Constants from "@/utils/Constants";

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(config);

const fireBaseAnalytics = firebase.analytics();

const setUserId = (id: string) => {
  fireBaseAnalytics.setUserId(id);
};

const selectNarration = (id: string) => {
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.NARRATION,
    content_id: id,
  });
};

const selectOpenChime = (id: string) => {
  fireBaseAnalytics.logEvent("select_content", {
    content_type: "open-chime",
    content_id: id,
  });
};

const selectEndChime = (id: string) => {
  fireBaseAnalytics.logEvent("select_content", {
    content_type: "end-chime",
    content_id: id,
  });
};

const selectBgm = (id: string) => {
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.BGM,
    content_id: id,
  });
};

const selectTemplate = (id: string) => {
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.TEMPLATE,
    content_id: id,
  });
};

const selectFree = (id: string) => {
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.FREE,
    content_id: id,
  });
};

const setRecording = (id: string) => {
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.RECORDING,
    content_id: id,
  });
};

// 試聴の再生ボタン
const pressButtonPlayTrial = (id: string, type: string, screen: string) => {
  fireBaseAnalytics.logEvent("press_playTrial", {
    button_type: Constants.CATEGORY_BUTTON.PLAYTRIAL,
    screen_type: screen,
    trial_type: type,
    content_id: id,
  });
};

// 原稿ボタン
const pressButtonManuscript = (id: string, screen: string) => {
  fireBaseAnalytics.logEvent("press_manuscript", {
    button_type: Constants.CATEGORY_BUTTON.MANUSCRIPT,
    screen_type: screen,
    content_id: id,
  });
};

// タイトル・説明編集ボタン
const pressButtonEditTitleAndDescription = (id: string, screen: string) => {
  fireBaseAnalytics.logEvent("press_editTitleAndDescription", {
    button_type: Constants.CATEGORY_BUTTON.EDIT_TITLE_ANS_DESCRIPTION,
    screen_type: screen,
    content_id: id,
  });
};

// 削除ボタン
const pressButtonRemove = (id: string, screen: string) => {
  fireBaseAnalytics.logEvent("press_remove", {
    button_type: Constants.CATEGORY_BUTTON.REMOVE,
    screen_type: screen,
    content_id: id,
  });
};

// 確定ボタン
const pressButtonConfirm = (id: string, screen: string) => {
  fireBaseAnalytics.logEvent("press_confirm", {
    button_type: Constants.CATEGORY_BUTTON.CONFIRM,
    screen_type: screen,
    content_id: id,
  });
};

// 保存ボタン
const pressButtonSave = (id: string, screen: string) => {
  fireBaseAnalytics.logEvent("press_save", {
    button_type: Constants.CATEGORY_BUTTON.SAVE,
    screen_type: screen,
    content_id: id,
  });
};

// アップロードボタン
const pressButtonUpload = (id: string, screen: string) => {
  fireBaseAnalytics.logEvent("press_upload", {
    button_type: Constants.CATEGORY_BUTTON.SAVE,
    screen_type: screen,
    content_id: id,
  });
};

// アップロード解除ボタン
const pressButtonUnupload = (id: string, screen: string) => {
  fireBaseAnalytics.logEvent("press_unupload", {
    button_type: Constants.CATEGORY_BUTTON.UNUPLOAD,
    screen_type: screen,
    content_id: id,
  });
};

// コンテンツ編集ボタン
const pressButtonEditContent = (id: string, screen: string) => {
  fireBaseAnalytics.logEvent("press_editContent", {
    button_type: Constants.CATEGORY_BUTTON.EDIT_CONTENT,
    screen_type: screen,
    content_id: id,
  });
};

// 原稿をコピーするボタン（フリー入力）
const pressButtonCopyManuscript = (id: string, screen: string) => {
  fireBaseAnalytics.logEvent("press_copyManuscript", {
    button_type: Constants.CATEGORY_BUTTON.COPYMANUSCRIPT,
    screen_type: screen,
    content_id: id,
  });
};

// タイトル／説明編集ボタン
const pressButtonEditTitleAndDecription = (id: string, screen: string) => {
  fireBaseAnalytics.logEvent("press_editTitleAndDecription", {
    button_type: Constants.CATEGORY_BUTTON.EDIT_TITLE_ANS_DESCRIPTION,
    screen_type: screen,
    content_id: id,
  });
};

// メインメニューからの画面選択
// ナレーションの業種選択
// ナレーションのシーン選択
// 試聴の再生、停止ボタン必要？

const analytics = {
  setUserId,
  selectNarration,
  selectOpenChime,
  selectEndChime,
  selectBgm,
  selectTemplate,
  selectFree,
  setRecording,
  pressButtonPlayTrial,
  pressButtonManuscript,
  pressButtonEditTitleAndDescription,
  pressButtonRemove,
  pressButtonConfirm,
  pressButtonSave,
  pressButtonUpload,
  pressButtonUnupload,
  pressButtonEditContent,
  pressButtonCopyManuscript,
  pressButtonEditTitleAndDecription,
};

export default analytics;