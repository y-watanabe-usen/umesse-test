import { reactive } from 'vue';
import { AudioRecorderState } from './state';
import { useWaveEncoder } from '@/utils/WaveEncoder';

export default () => {
  const state = reactive<AudioRecorderState>({
    recording: false,
    chunks: new Array<Blob>(),
  });
  let mediaRecorder: MediaRecorder | undefined;

  const isRecording = () => state.recording;
  const hasRecording = () => (state.chunks.length !== 0);

  const start = async () => {
    if (state.recording) { throw new Error(`recording state = ${state.recording}.`); }
    reset();
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.onstop = () => {
      state.recording = false;
      stream.getTracks().forEach((track) => track.stop());
    };
    mediaRecorder.ondataavailable = (e: BlobEvent) => state.chunks.push(e.data);
    mediaRecorder.start();

    state.recording = true;
  };
  const stop = async () => mediaRecorder?.stop();
  const reset = () => state.chunks = [];


  const getAudioBuffer = async () => {

    if (!hasRecording()) {
      return undefined;
    }
    const blob = new Blob(state.chunks);
    const context = new window.AudioContext();

    return new Promise<AudioBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: Event) => {
        context.decodeAudioData(reader.result as ArrayBuffer, (buffer) => {
          resolve(buffer);
        });
      };
      reader.onerror = (event: Event) => {
        reject(event);
      };
      reader.readAsArrayBuffer(blob);
    });
  };

  const getWaveBlob = async () => {
    const audioBuffer = await getAudioBuffer();
    if (audioBuffer) {
      return useWaveEncoder.encode(audioBuffer);
    }
    return undefined;
  };

  return {
    start, stop, reset, isRecording, hasRecording,
    getWaveBlob, getAudioBuffer,
  };
};
