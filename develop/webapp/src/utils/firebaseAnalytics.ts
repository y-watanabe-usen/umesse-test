import firebase from "firebase";
import Constants from "@/utils/Constants";
import dayjs from "dayjs";

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
  open_chime: string | null;
  end_chime: string | null;
};

firebase.initializeApp(config);

const fireBaseAnalytics = firebase.analytics();

// ユーザーIDセット
const setUserId = (id: string) => {
  fireBaseAnalytics.setUserId(id);
};

// （ナレーション）選択
const selectNarration = (id: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.NARRATION,
    content_id: id,
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
  });
};

// （オープンチャイム）選択
const selectOpenChime = (id: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_content", {
    content_type: "open-chime",
    content_id: id,
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
  });
};

// （エンドチャイム）選択
const selectEndChime = (id: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_content", {
    content_type: "end-chime",
    content_id: id,
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
  });
};

// （BGM）選択
const selectBgm = (id: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.BGM,
    content_id: id,
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
  });
};

// （音声合成テンプレート）選択
const selectTemplate = (id: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.TEMPLATE,
    content_id: id,
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
  });
};

// （音声合成フリーのテンプレート）選択
const selectFree = (id: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.FREE,
    content_id: id,
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
  });
};

// レコーディング保存
const setRecording = (id: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.RECORDING,
    content_id: id,
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
  });
};

// 音声合成保存
const setTts = (id: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_content", {
    content_type: Constants.CATEGORY.TTS,
    content_id: id,
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
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
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
  });
};

// 原稿ボタン
const pressButtonManuscript = (id: string, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("press_manuscript", {
    button: Constants.CATEGORY_BUTTON.MANUSCRIPT,
    screen_name: screen,
    content_id: id,
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
  });
};

// タイトル／説明編集ボタン
const pressButtonEditTitleAndDescription = (id: string, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("press_editTitleAndDecription", {
    button: Constants.CATEGORY_BUTTON.EDIT_TITLE_ANS_DESCRIPTION,
    screen_name: screen,
    content_id: id,
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
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
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
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
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
  });
};

// 保存ボタン
const pressButtonSave = (cm: SaveContents, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("press_save", {
    button: Constants.CATEGORY_BUTTON.SAVE,
    screen_name: screen,
    contents: cm,
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
  });
};

// （タイトル／説明編集の）保存ボタン
const pressButtonSaveEdit = (cm: string, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("press_save_edit", {
    button: Constants.CATEGORY_BUTTON.SAVE_EDIT,
    screen_name: screen,
    contents: cm,
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
  });
};

// アップロードボタン
const pressButtonUpload = (id: string, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("press_upload", {
    button: Constants.CATEGORY_BUTTON.SAVE,
    screen_name: screen,
    content_id: id,
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
  });
};

// アップロード解除ボタン
const pressButtonUnupload = (id: string, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("press_unupload", {
    button: Constants.CATEGORY_BUTTON.UNUPLOAD,
    screen_name: screen,
    content_id: id,
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
  });
};

// コンテンツ編集ボタン
const pressButtonEditContent = (id: string, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("press_editContent", {
    button: Constants.CATEGORY_BUTTON.EDIT_CONTENT,
    screen_name: screen,
    content_id: id,
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
  });
};

// 画面遷移
const screenView = (screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("screen_view", {
    app_name: "UMESSE",
    screen_name: screen,
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
  });
};

// 業種・シーン選択
const selectIndustry = (industryCd: string, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_industry", {
    industry_cd: industryCd,
    screen_name: screen,
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
  });
};

// シーン選択
const selectScene = (sceneCd: string, screen: string) => {
  const now = new Date().toLocaleString();
  fireBaseAnalytics.logEvent("select_scene", {
    scene_cd: sceneCd,
    screen_name: screen,
    timestamp: dayjs(now).format("YYYY/MM/DD HH:ss:ss"),
  });
};

// 試聴の再生、停止ボタン必要？
// 原稿をコピーするボタン（フリー入力）

const analytics = {
  setUserId,
  selectNarration,
  selectOpenChime,
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
