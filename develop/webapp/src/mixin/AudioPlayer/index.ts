import { reactive, toRefs } from 'vue';
import { AudioPlayerState } from './state';

export default () => {
  const state = reactive<AudioPlayerState>({
    playing: false,
    mediaRecorder: null,
    powerDecibels: -100,
  })

  const getPowerDecibels = () => {
    return state.powerDecibels;
  }
  const isPlaying = () => {
    return state.playing
  }
  const context = new window.AudioContext();
  const analyser: AnalyserNode = context.createAnalyser(); //new AnalyserNode(context, { smoothingTimeConstant: 0.8 });
  analyser.fftSize = 2048;
  const sampleBuffer = new Float32Array(analyser.fftSize);
  var timer: number | undefined;
  const start = async (audioBuffer: AudioBuffer) => {
    const source = context.createBufferSource();

    source.buffer = audioBuffer;

    analyser.connect(context.destination);
    source.connect(analyser)

    source.onended = () => {
      source.stop()
      source.disconnect(analyser);
      analyser.disconnect(context.destination);
      clearInterval(timer);
      state.powerDecibels = -100;
    }
    source.start();
    timer = setInterval(function () { updateAnalyser(); }, 100);
  }
  const stop = () => {
  }

  const updateAnalyser = () => {
    analyser.getFloatTimeDomainData(sampleBuffer);
    let sumOfSquares = 0;
    for (let i = 0; i < sampleBuffer.length; i++) {
      sumOfSquares += sampleBuffer[i] ** 2;
    }
    state.powerDecibels = Math.round(10 * Math.log10(sumOfSquares / sampleBuffer.length));
  }

  return {
    start, stop, getPowerDecibels,
  };
}