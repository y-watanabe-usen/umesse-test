import { reactive } from 'vue';
import { NewAudioPlayerState } from '@/utils/newAudioPlayer/state';
import { Howl, Howler } from 'howler';

export default function useNewAudioPlayer() {
  const state = reactive<NewAudioPlayerState>({
    playing: false,
    powerDecibels: -100,
    playbackTime: 0,
    duration: 0,
    howl: new Howl({}),
  });
  let timer: number | undefined;
  let analyser: AnalyserNode;
  let sampleBuffer: Float32Array;

  const start = (arrayBuffer: ArrayBuffer) => {
    const howlSource = [`data:audio/mp3;base64,${arrayBufferToBase64(arrayBuffer)}`];
    state.howl = new Howl({
      src: howlSource,
      onplay: function () {
        state.playbackTime = 0;
        state.duration = state.howl.duration();
        state.playing = true;
        Howler.usingWebAudio = true;
        analyser = Howler.ctx.createAnalyser();
        analyser.fftSize = 2048;
        sampleBuffer = new Float32Array(analyser.fftSize);
        Howler.masterGain.connect(analyser);
        analyser.connect(Howler.ctx.destination);
        timer = setInterval(() => {
          updatePlaybackTime();
          updateAnalyser();
        }, 50);
      },
      onpause: function () {
        updatePlaybackTime();
      },
      onstop: function () {
        stopFunction();
      },
      onend: function () {
        stopFunction();
      },
    });
    state.howl.play();
    state.playing = true;
  };

  const stop = () => {
    state.howl.stop();
  };

  const stopFunction = () => {
    clearInterval(timer);
    state.playbackTime = 0;
    state.playing = false;
    Howler.masterGain.disconnect(analyser);
    analyser.disconnect(Howler.ctx.destination);
  };

  const getPlaybackTime = () => {
    return state.playbackTime;
  };

  const getDuration = () => {
    return state.duration;
  };

  const getPowerDecibels = () => {
    return state.powerDecibels;
  };

  const changeCurrentTime = (time: number) => {
    const percent = time / state.duration;
    state.howl.seek(state.duration * percent);
  };

  const isPlaying = () => {
    return state.playing;
  };

  const updatePlaybackTime = () => {
    state.playbackTime = <number>state.howl.seek();
  };

  const updateAnalyser = () => {
    analyser.getFloatTimeDomainData(sampleBuffer);
    let sumOfSquares = 0;
    for (const x of sampleBuffer) {
      sumOfSquares += x ** 2;
    }
    state.powerDecibels = Math.round(10 * Math.log10(sumOfSquares / sampleBuffer.length));
    console.log(state.powerDecibels);
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  return {
    start, stop, getPlaybackTime, getDuration, changeCurrentTime, isPlaying, getPowerDecibels,
  };
}