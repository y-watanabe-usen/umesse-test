import Constants from "@/utils/Constants";
import { BgmItem, ChimeItem, CmItem, NarrationItem, SceneItem } from "umesseapi/models";

export default class DisplayCmItem {
  cmId = "";
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

  narration(index: number) {
    return this.materials.narrations[index]
  }
  get narrations() {
    return this.materials.narrations
  }
  get openChime() {
    return this.materials.openChime
  }
  get endChime() {
    return this.materials.endChime
  }
  get bgm() {
    return this.materials.bgm
  }
  clearNarraion(index: number) {
    this.materials.narrations.splice(index, 1)
  }
  clearAllNaraion() {
    this.materials.narrations = []
  }
  clearOpenChime() {
    this.materials.openChime = null
  }
  clearEndChime() {
    this.materials.endChime = null
  }
  clearBgm() {
    this.materials.bgm = null
  }
  reset() {
    this.cmId = "";
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
  }

  setNarraion(
    index: number | null,
    categody: string,
    contentsId: string,
    title: string,
    description: string,
    seconds: number,
    timestamp: string,
    volume?: number
  ) {
    const getNarraion = () => {
      if (categody == Constants.CATEGORY.RECORDING) {
        return new Recording(contentsId, title, description, seconds, timestamp, volume)
      } else if (categody == Constants.CATEGORY.TTS) {
        return new Tts(contentsId, title, description, seconds, timestamp, volume)
      } else {
        return new Narration(contentsId, title, description, seconds, timestamp, volume)
      }
    }
    if (index != null) {
      this.materials.narrations[index] = getNarraion()
    } else {
      this.materials.narrations.push(getNarraion())
    }
  }
  setOpenChime(
    contentsId: string,
    title: string,
    description: string,
    seconds: number,
    timestamp: string,
    volume?: number
  ) {
    this.clearOpenChime()
    this.materials.openChime = new OpenChime(
      contentsId,
      title,
      description,
      seconds,
      timestamp,
      volume)
  }
  setEndChime(
    contentsId: string,
    title: string,
    description: string,
    seconds: number,
    timestamp: string,
    volume?: number
  ) {
    this.clearEndChime()
    this.materials.endChime = new EndChime(contentsId,
      title,
      description,
      seconds,
      timestamp,
      volume
    )
  }
  setBgm(
    contentsId: string,
    title: string,
    description: string,
    seconds: number,
    timestamp: string,
    volume?: number
  ) {
    this.clearBgm()
    this.materials.bgm = new Bgm(
      contentsId,
      title,
      description,
      seconds,
      timestamp,
      volume
    )
  }

  setCm(cmItem: CmItem) {
    this.reset()
    this.cmId = cmItem.cmId;
    this.title = cmItem.title;
    this.description = cmItem.description;
    this.seconds = cmItem.seconds;
    if (cmItem.materials.narrations.length > 0) {
      cmItem.materials.narrations.forEach((v: NarrationItem) => {
        let category: string = Constants.CATEGORY.NARRATION
        if (v.contentsId.match(`^[0-9a-z]+-r-[0-9a-z]{8}$`)) {
          category = Constants.CATEGORY.RECORDING
        } else if (v.contentsId.match(`^[0-9a-z]+-t-[0-9a-z]{8}$`)) {
          category = Constants.CATEGORY.TTS
        }
        this.setNarraion(null, category, v.contentsId, v.title, v.description, v.seconds, v.timestamp)
      });
    }
    if (cmItem.materials.startChime) {
      const chime = <ChimeItem>cmItem.materials.startChime
      this.setOpenChime(
        chime.contentsId,
        chime.title,
        chime.description,
        chime.seconds,
        chime.timestamp
      )
    }
    if (cmItem.materials.endChime) {
      const chime = <ChimeItem>cmItem.materials.endChime
      this.setEndChime(
        chime.contentsId,
        chime.title,
        chime.description,
        chime.seconds,
        chime.timestamp
      )
    }
    if (cmItem.materials.bgm) {
      const bgm = <BgmItem>cmItem.materials.bgm
      this.setBgm(
        bgm.contentsId,
        bgm.title,
        bgm.description,
        bgm.seconds,
        bgm.timestamp
      )
    }
    this.startDate = cmItem.startDate;
    this.endDate = cmItem.endDate;
    this.productionType = cmItem.productionType;
    // this.uploadSystem = cmItem.???;
    if (cmItem.scene) {
      const scene = <SceneItem>cmItem.scene
      this.scene = new Scene(scene.sceneCd, scene.sceneName)
    }
    this.status = cmItem.status;
    this.timestamp = cmItem.timestamp;
  }
}

export class Materials {
  narrations: (Narration | Recording | Tts)[] = [];
  openChime: OpenChime | null = null;
  endChime: EndChime | null = null;
  bgm: Bgm | null = null;
}

export class Narration {
  readonly category = Constants.CATEGORY.NARRATION;
  constructor(
    public contentsId: string,
    public title: string = "",
    public description: string = "",
    public seconds: number = 0,
    public timestamp: string = "",
    public volume: number = 0
  ) { }
}
export class Recording {
  readonly category = Constants.CATEGORY.RECORDING;
  constructor(
    public recordingId: string,
    public title: string = "",
    public description: string = "",
    public seconds: number = 0,
    public timestamp: string = "",
    public volume: number = 0
  ) { }
}
export class Tts {
  readonly category = Constants.CATEGORY.TTS;
  constructor(
    public ttsId: string,
    public title: string = "",
    public description: string = "",
    public seconds: number = 0,
    public timestamp: string = "",
    public volume: number = 0
  ) { }
}
export class OpenChime {
  readonly category = Constants.CATEGORY.CHIME;
  constructor(
    public contentsId: string = "",
    public title: string = "",
    public description: string = "",
    public seconds: number = 0,
    public timestamp: string = "",
    public volume: number = 0
  ) { }
}

export class EndChime {
  readonly category = Constants.CATEGORY.CHIME;
  constructor(
    public contentsId: string,
    public title: string = "",
    public description: string = "",
    public seconds: number = 0,
    public timestamp: string = "",
    public volume: number = 0
  ) { }
}

export class Bgm {
  readonly category = Constants.CATEGORY.BGM;
  constructor(
    public contentsId: string,
    public title: string = "",
    public description: string = "",
    public seconds: number = 0,
    public timestamp: string = "",
    public volume: number = 0
  ) { }
}

export class Scene {
  constructor(
    public sceneCd = "",
    public sceneName = ""
  ) { }
}