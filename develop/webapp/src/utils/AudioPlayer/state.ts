

export interface AudioPlayerState {
  playing: boolean,
  mediaRecorder: MediaRecorder | null,
  powerDecibels: number,
  startedTime: number,
  playbackTime: number,
  duration: number,
}