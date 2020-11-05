

export interface AudioPlayerState {
  playing: boolean,
  mediaRecorder: MediaRecorder | null,
  powerDecibels: number,
}