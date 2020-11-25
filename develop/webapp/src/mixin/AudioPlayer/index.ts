import { reactive, toRefs } from 'vue';
import { AudioPlayerState } from './state';

export default () => {
  const state = reactive<AudioPlayerState>({
    playing: false,
    mediaRecorder: null,
    powerDecibels: -100,
    startedTime: 0,
    playbackTime: 0,
    duration: 0,
  })

  const getPowerDecibels = () => {
    return state.powerDecibels;
  }
  const getPlaybackTime = () => {
    return state.playbackTime;
  }
  const getDuration = () => {
    return state.duration;
  }
  const isPlaying = () => {
    return state.playing
  }
  const context = new window.AudioContext();
  const analyser: AnalyserNode = context.createAnalyser(); //new AnalyserNode(context, { smoothingTimeConstant: 0.8 });
  analyser.fftSize = 2048;
  const sampleBuffer = new Float32Array(analyser.fftSize);
  var timer: number | undefined;
  var source: AudioBufferSourceNode
  const start = async (audioBuffer: AudioBuffer) => {
    source = context.createBufferSource();

    source.buffer = audioBuffer;
    analyser.connect(context.destination);
    source.connect(analyser)
    state.duration = audioBuffer.duration;
    state.startedTime = context.currentTime;

    source.onended = () => {
      state.playbackTime = state.duration
      source.stop()
      source.disconnect(analyser);
      analyser.disconnect(context.destination);
      clearInterval(timer);
      state.powerDecibels = -100;
      state.playing = false
    }
    source.start();
    state.playbackTime = 0;
    state.playing = true
    timer = setInterval(function () {
      updateAnalyser();
      updatePlaybackTime();
    }, 100);
  }
  const stop = () => {
    source.stop()
    state.playing = false
  }

  const updateAnalyser = () => {
    analyser.getFloatTimeDomainData(sampleBuffer);
    let sumOfSquares = 0;
    for (let i = 0; i < sampleBuffer.length; i++) {
      sumOfSquares += sampleBuffer[i] ** 2;
    }
    state.powerDecibels = Math.round(10 * Math.log10(sumOfSquares / sampleBuffer.length));
  }

  const updatePlaybackTime = () => {
    state.playbackTime = context.currentTime - state.startedTime;
  }
  return {
    start, stop, getPowerDecibels, getPlaybackTime, getDuration, isPlaying
  };
}