import Constants from "@/utils/constants";
import {
  BgmItem,
  ChimeItem,
  CmItem,
  NarrationItem,
  SceneItem,
  CmMaterialListItemBgm,
  CmMaterialListItemStartChime,
  CmMaterialListItemEndChime,
  CmMaterialListItemNarrations
} from "umesseapi/models";

export default class DisplayCmItem {
  id = "";
  title = "";
  description = "";
  seconds = 0;
  materials: Materials = new Materials();
  startDate = "";
  endDate = "";
  productionType = "";
  uploadSystem = "";
  scene: Scene = new Scene();
  status = "";
  timestamp = "";
  url = "";
  isEdit = false; // 新規作成: false, 編集: true
  progress = 0;

  narration(index: number): Narration | Recording | Tts {
    return this.materials.narrations[index];
  }
  get narrations(): (Narration | Recording | Tts)[] {
    return this.materials.narrations;
  }
  get startChime() {
    return this.materials.startChime;
  }
  get endChime() {
    return this.materials.endChime;
  }
  get bgm() {
    return this.materials.bgm;
  }
  clearNarraion(index: number) {
    this.materials.narrations.splice(index, 1);
  }
  clearAllNaraion() {
    this.materials.narrations = [];
  }
  clearStartChime() {
    this.materials.startChime = null;
  }
  clearEndChime() {
    this.materials.endChime = null;
  }
  clearBgm() {
    this.materials.bgm = null;
  }
  reset(): void {
    this.id = "";
    this.title = "";
    this.description = "";
    this.seconds = 0;
    this.materials = new Materials();
    this.startDate = "";
    this.endDate = "";
    this.productionType = "";
    this.uploadSystem = "";
    this.scene = new Scene();
    this.status = "";
    this.timestamp = "";
    this.url = "";
    this.isEdit = false;
  }

  setNarraion(
    index: number | null,
    categody: string,
    contentsId: string,
    title: string,
    description: string,
    manuscript: string,
    seconds: number,
    timestamp: string,
    volume?: number
  ) {
    const getNarraion = () => {
      if (categody == Constants.CATEGORY.RECORDING) {
        return new Recording(contentsId, title, description, seconds, timestamp, volume);
      } else if (categody == Constants.CATEGORY.TTS) {
        return new Tts(contentsId, title, description, manuscript, seconds, timestamp, volume);
      } else {
        return new Narration(contentsId, title, description, manuscript, seconds, timestamp, volume);
      }
    };
    if (index != null) {
      this.materials.narrations[index] = getNarraion();
    } else {
      this.materials.narrations.push(getNarraion());
    }
  }
  setStartChime(
    contentsId: string,
    title: string,
    description: string,
    seconds: number,
    timestamp: string,
    volume?: number
  ) {
    this.clearStartChime();
    this.materials.startChime = new StartChime(
      contentsId,
      title,
      description,
      seconds,
      timestamp,
      volume);
  }
  setEndChime(
    contentsId: string,
    title: string,
    description: string,
    seconds: number,
    timestamp: string,
    volume?: number
  ) {
    this.clearEndChime();
    this.materials.endChime = new EndChime(contentsId,
      title,
      description,
      seconds,
      timestamp,
      volume
    );
  }
  setBgm(
    contentsId: string,
    title: string,
    description: string,
    seconds: number,
    timestamp: string,
    volume?: number
  ) {
    this.clearBgm();
    this.materials.bgm = new Bgm(
      contentsId,
      title,
      description,
      seconds,
      timestamp,
      volume
    );
  }

  setCm(cmItem: CmItem) {
    this.reset();
    this.id = cmItem.id;
    this.title = cmItem.title;
    this.description = cmItem.description;
    this.seconds = cmItem.seconds;
    if (cmItem.materials.narrations.length > 0) {
      cmItem.materials.narrations.forEach((v: NarrationItem & CmMaterialListItemNarrations) => {
        this.setNarraion(null, v.category, v.id, v.title, v.description, v.manuscript, v.seconds, v.timestamp, v.volume);
      });
    }
    if (cmItem.materials.startChime) {
      const chime = <ChimeItem & CmMaterialListItemStartChime>cmItem.materials.startChime;
      this.setStartChime(
        chime.id,
        chime.title,
        chime.description,
        chime.seconds,
        chime.timestamp,
        chime.volume
      );
    }
    if (cmItem.materials.endChime) {
      const chime = <ChimeItem & CmMaterialListItemEndChime>cmItem.materials.endChime;
      this.setEndChime(
        chime.id,
        chime.title,
        chime.description,
        chime.seconds,
        chime.timestamp,
        chime.volume
      );
    }
    if (cmItem.materials.bgm) {
      const bgm = <BgmItem & CmMaterialListItemBgm>cmItem.materials.bgm;
      this.setBgm(
        bgm.id,
        bgm.title,
        bgm.description,
        bgm.seconds,
        bgm.timestamp,
        bgm.volume
      );
    }
    this.startDate = cmItem.startDate;
    this.endDate = cmItem.endDate;
    this.productionType = cmItem.productionType;
    // this.uploadSystem = cmItem.???;
    if (cmItem.scene) {
      const scene = <SceneItem>cmItem.scene;
      this.scene = new Scene(scene.sceneCd, scene.sceneName);
    }
    this.status = cmItem.status;
    this.timestamp = cmItem.timestamp;
  }
}

export class Materials {
  narrations: (Narration | Recording | Tts)[] = [];
  startChime: StartChime | null = null;
  endChime: EndChime | null = null;
  bgm: Bgm | null = null;
}

export class Narration {
  readonly category = Constants.CATEGORY.NARRATION;
  constructor(
    public id: string,
    public title: string = "",
    public description: string = "",
    public manuscript: string = "",
    public seconds: number = 0,
    public timestamp: string = "",
    public volume: number = 100
  ) { }
}
export class Recording {
  readonly category = Constants.CATEGORY.RECORDING;
  constructor(
    public id: string,
    public title: string = "",
    public description: string = "",
    public seconds: number = 0,
    public timestamp: string = "",
    public volume: number = 100
  ) { }
}
export class Tts {
  readonly category = Constants.CATEGORY.TTS;
  constructor(
    public id: string,
    public title: string = "",
    public description: string = "",
    public manuscript: string = "",
    public seconds: number = 0,
    public timestamp: string = "",
    public volume: number = 100
  ) { }
}
export class StartChime {
  readonly category = Constants.CATEGORY.CHIME;
  constructor(
    public id: string = "",
    public title: string = "",
    public description: string = "",
    public seconds: number = 0,
    public timestamp: string = "",
    public volume: number = 50
  ) { }
}

export class EndChime {
  readonly category = Constants.CATEGORY.CHIME;
  constructor(
    public id: string,
    public title: string = "",
    public description: string = "",
    public seconds: number = 0,
    public timestamp: string = "",
    public volume: number = 50
  ) { }
}

export class Bgm {
  readonly category = Constants.CATEGORY.BGM;
  constructor(
    public id: string,
    public title: string = "",
    public description: string = "",
    public seconds: number = 0,
    public timestamp: string = "",
    public volume: number = 50
  ) { }
}

export class Scene {
  constructor(
    public sceneCd = "",
    public sceneName = ""
  ) { }
}