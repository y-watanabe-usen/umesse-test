import { reactive } from 'vue';
import { AudioRecorderState } from './state';
import { useWaveEncoder } from '@/utils/WaveEncoder';
import { useMp3Encoder } from '@/utils/Mp3Encoder';

export default () => {
  const state = reactive<AudioRecorderState>({
    recording: false,
    chunks: new Array<Blob>(),
    powerDecibels: -100,
  });
  let mediaRecorder: MediaRecorder | undefined;
  let timer: number | undefined;

  const isRecording = () => state.recording;
  const hasRecording = () => (state.chunks.length !== 0);
  const context = new window.AudioContext();
  const analyser: AnalyserNode = context.createAnalyser();
  analyser.fftSize = 2048;
  const sampleBuffer = new Float32Array(analyser.fftSize);

  const getPowerDecibels = () => {
    return state.powerDecibels;
  };

  const start = async () => {
    if (state.recording) { throw new Error(`recording state = ${state.recording}.`); }
    reset();
    //マイクから音声の取得を行う
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        autoGainControl: true,
        channelCount: 1,
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      }
    });
    const input  = context.createMediaStreamSource(stream);
    analyser.connect(context.destination);
    input.connect(analyser);
    //取得した音声の録音
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.onstop = () => {
      clearInterval(timer);
      analyser.disconnect(context.destination);
      state.recording = false;
      state.powerDecibels = -100;
      stream.getTracks().forEach((track) => track.stop());
    };
    mediaRecorder.ondataavailable = (e: BlobEvent) => state.chunks.push(e.data);
    mediaRecorder.start();
    timer = setInterval(() => {
      updateAnalyser();
    }, 100);
    state.recording = true;
  };
  const stop = async () => {
    mediaRecorder?.stop()
  };
  const reset = () => state.chunks = [];


  const getAudioBuffer = async () => {

    if (!hasRecording()) {
      return undefined;
    }
    const blob = new Blob(state.chunks);
    const context = new window.AudioContext();

    return new Promise<AudioBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
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

  const getMp3Blob = async () => {
    const audioBuffer = await getAudioBuffer();
    if (audioBuffer) {
      return useMp3Encoder.encode(audioBuffer);
    }
    return undefined;
  };

  const updateAnalyser = () => {
  analyser.getFloatTimeDomainData(sampleBuffer);
  let sumOfSquares = 0;
  for (const x of sampleBuffer) {
    sumOfSquares += x ** 2;
  }
  console.log(sumOfSquares);
   state.powerDecibels = Math.round(10 * Math.log10(sumOfSquares / sampleBuffer.length));
};

  return {
    start, stop, reset, isRecording, hasRecording,
    getWaveBlob, getMp3Blob, getAudioBuffer,getPowerDecibels
  };
};
