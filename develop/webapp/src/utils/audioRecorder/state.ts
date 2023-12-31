export interface AudioRecorderState {
  recording: boolean,
  chunks: Array<Blob>
  powerDecibels: number;
  recordingStartedTime: number;
  recordingTime: number;
}
