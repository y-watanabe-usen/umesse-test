import { Howl } from "howler";

export interface NewAudioPlayerState {
  playing: boolean;
  powerDecibels: number;
  currentTime: number;
  duration: number;
  sound: Howl;
}
