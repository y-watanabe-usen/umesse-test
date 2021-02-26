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
  }

  setNarraion(index: number | null, categody: string, contentsId: string, title: string) {
    if (index != null) {
      this.materials.narrations[index] = new Narration(contentsId, title)
    } else {
      this.materials.narrations.push(new Narration(contentsId, title))
    }
  }
  setOpenChime(contentsId: string, title: string) {
    this.clearOpenChime()
    this.materials.openChime = new OpenChime(contentsId, title)
  }
  setEndChime(contentsId: string, title: string) {
    this.clearEndChime()
    this.materials.endChime = new EndChime(contentsId, title)
  }
  setBgm(contentsId: string, title: string) {
    this.clearBgm()
    this.materials.bgm = new Bgm(contentsId, title)
  }

}

export class Materials {
  narrations: (Narration | Recording | Tts)[] = [];
  openChime: OpenChime | null = null;
  endChime: EndChime | null = null;
  bgm: Bgm | null = null;
}

export class Bgm {
  readonly category = "bgm";
  constructor(
    public contentsId: string,
    public title: string = "",
    public description: string = "",
    public seconds: number = 0,
    public timestamp: string = "",
    public volume: number = 0
  ) { }
}

export class EndChime {
  readonly category = "chime";
  constructor(
    public contentsId: string,
    public title: string = "",
    public description: string = "",
    public seconds: number = 0,
    public timestamp: string = "",
    public volume: number = 0
  ) { }
}

export class Narration {
  readonly category = "narration";
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
  readonly category = "recording";
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
  readonly category = "tts";
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
  readonly category = "chime";
  constructor(
    public contentsId: string = "",
    public title: string = "",
    public description: string = "",
    public seconds: number = 0,
    public timestamp: string = "",
    public volume: number = 0
  ) { }
}

export class Scene {
  sceneCd = "";
  sceneName = "";
}
