import { reactive, toRefs } from 'vue';
import { AudioRecorderState } from './state';

export default () => {
  const state = reactive<AudioRecorderState>({
    recording: false,
    chunks: new Array<Blob>(),
    mediaRecorder: null
  })

  const isRecording = () => {
    return state.recording
  }
  const start = async () => {
    reset();
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.onstop = () => stream.getTracks().forEach(track => track.stop());
    mediaRecorder.ondataavailable = (e: BlobEvent) => {
      state.chunks.push(e.data);
    };
    mediaRecorder.start();

    state.recording = true;
    state.mediaRecorder = mediaRecorder;
  }
  const stop = () => {
    state.mediaRecorder?.stop();
    state.recording = false;
  }
  const reset = () => {
    state.chunks = []
  }

  const getBlob = () => {
    if (state.chunks.length == 0) {
      console.log(`blob is not found.`)
      return undefined;
    }
    return new Blob(state.chunks)
  }

  const getAudioBuffer = async () => {

    const blob = getBlob();
    if (blob == undefined) return;
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

  return {
    ...toRefs(state),
    getBlob, getAudioBuffer,
    start, stop, reset, isRecording
  };
}