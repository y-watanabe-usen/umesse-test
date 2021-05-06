import { Howl } from "howler";

export interface NewAudioPlayerState {
  playing: boolean;
  powerDecibels: number;
  playbackTime: number;
  duration: number;
  howl: Howl;
}
