export interface AudioRecorderState {
  recording: boolean,
  chunks: Array<Blob>
  powerDecibels: number;
}
