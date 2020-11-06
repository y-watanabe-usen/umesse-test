
export interface AudioRecorderState {
  recording: boolean,
  chunks: Array<Blob>,
  mediaRecorder: MediaRecorder | null
}