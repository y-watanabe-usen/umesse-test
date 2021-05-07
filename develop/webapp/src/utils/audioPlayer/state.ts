import { Howl } from "howler";

export interface AudioPlayerState {
  playing: boolean;
  powerDecibels: number;
  playbackTime: number;
  duration: number;
  howl: Howl;
}
