import firebase from "firebase/app";
import "firebase/app";
import "firebase/analytics";
import Constants from "@/utils/constants";
import * as formatDate from "@/utils/formatDate";

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

export type SaveContents = {
  narrations: string[] | [];
  bgm: string | null;
  start_chime: string | null;
  end_chime: string | null;
};

firebase.initializeApp(config);

const fireBaseAnalytics = firebase.analytics();

// ユーザーIDセット
const setUserId = (id: string) => {
  fireBaseAnalytics.setUserId(id);
};

// ナレーション選択
const selectNarration = (id: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.NARRATION,
    content_id: id,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// オープンチャイム選択
const selectStartChime = (id: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_content", {
    content_type: "start-chime",
    content_id: id,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// エンドチャイム選択
const selectEndChime = (id: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_content", {
    content_type: "end-chime",
    content_id: id,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// BGM選択
const selectBgm = (id: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.BGM,
    content_id: id,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// 音声合成テンプレート選択
const selectTemplate = (id: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.TEMPLATE,
    content_id: id,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// 音声合成フリーのテンプレート選択
const selectFree = (id: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.FREE,
    content_id: id,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// レコーディング保存
const setRecording = (id: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.RECORDING,
    content_id: id,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// 音声合成保存
const setTts = (id: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.TTS,
    content_id: id,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// 試聴の再生ボタン
const pressButtonPlayTrial = (id: string, type: string, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("press_playTrial", {
    button: Constants.CATEGORY_BUTTON.PLAYTRIAL,
    screen_name: screen,
    type: type,
    content_id: id,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// 原稿ボタン
const pressButtonManuscript = (id: string, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("press_manuscript", {
    button: Constants.CATEGORY_BUTTON.MANUSCRIPT,
    screen_name: screen,
    content_id: id,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// タイトル／説明編集ボタン
const pressButtonEditTitleAndDescription = (id: string, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("press_editTitleAndDecription", {
    button: Constants.CATEGORY_BUTTON.EDIT_TITLE_ANS_DESCRIPTION,
    screen_name: screen,
    content_id: id,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// 変更ボタン
const pressButtonChange = (id: string, type: string, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("press_change", {
    button: Constants.CATEGORY_BUTTON.CHANGE,
    screen_name: screen,
    type: type,
    content_id: id,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// 削除ボタン
const pressButtonRemove = (id: string, type: string, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("press_remove", {
    button: Constants.CATEGORY_BUTTON.REMOVE,
    screen_name: screen,
    type: type,
    content_id: id,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// 保存ボタン
const pressButtonSave = (cm: SaveContents, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("press_save", {
    button: Constants.CATEGORY_BUTTON.SAVE,
    screen_name: screen,
    contents: cm,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// （タイトル／説明編集の）保存ボタン
const pressButtonSaveEdit = (cm: string, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("press_save_edit", {
    button: Constants.CATEGORY_BUTTON.SAVE_EDIT,
    screen_name: screen,
    contents: cm,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// アップロードボタン
const pressButtonUpload = (id: string, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("press_upload", {
    button: Constants.CATEGORY_BUTTON.SAVE,
    screen_name: screen,
    content_id: id,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// アップロード解除ボタン
const pressButtonUnupload = (id: string, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("press_unupload", {
    button: Constants.CATEGORY_BUTTON.UNUPLOAD,
    screen_name: screen,
    content_id: id,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// コンテンツ編集ボタン
const pressButtonEditContent = (id: string, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("press_editContent", {
    button: Constants.CATEGORY_BUTTON.EDIT_CONTENT,
    screen_name: screen,
    content_id: id,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// 画面遷移
const screenView = (screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("screen_view", {
    app_name: "UMESSE",
    screen_name: screen,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// 業種・シーン選択
const selectIndustry = (industryCd: string, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_industry", {
    industry_cd: industryCd,
    screen_name: screen,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

// シーン選択
const selectScene = (sceneCd: string, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_scene", {
    scene_cd: sceneCd,
    screen_name: screen,
    timestamp: formatDate.convertDatestringToDateTime(now),
    env: process.env.VUE_APP_ENV,
  });
};

const analytics = {
  setUserId,
  selectNarration,
  selectStartChime,
  selectEndChime,
  selectBgm,
  selectTemplate,
  selectFree,
  setRecording,
  setTts,
  pressButtonPlayTrial,
  pressButtonManuscript,
  pressButtonEditTitleAndDescription,
  pressButtonRemove,
  pressButtonChange,
  pressButtonSave,
  pressButtonSaveEdit,
  pressButtonUpload,
  pressButtonUnupload,
  pressButtonEditContent,
  screenView,
  selectIndustry,
  selectScene,
};

export default analytics;
