import { reactive } from 'vue';
import { AudioPlayerState } from '@/utils/audioPlayer/state';
import { Howl, Howler } from 'howler';

export default function useAudioPlayer() {
  const state = reactive<AudioPlayerState>({
    playing: false,
    powerDecibels: -100,
    playbackTime: 0,
    duration: 0,
    howl: new Howl({}),
  });
  let timer: number | undefined;
  let analyser: AnalyserNode;
  let sampleBuffer: Float32Array;

  const start = async (urlOrBuffer: string | ArrayBuffer) => {
    return new Promise<void>(function (resolve, reject) {
      let howlSource: string | string[];
      if (typeof (urlOrBuffer) === "string") {
        howlSource = urlOrBuffer;
      } else {
        howlSource = [`data:audio/mp3;base64,${arrayBufferToBase64(urlOrBuffer)}`];
      }
      state.howl = new Howl({
        src: howlSource,
        onplay: function () {
          state.playbackTime = 0;
          state.duration = state.howl.duration();
          state.playing = true;
          resolve();
        },
        onloaderror: function () {
          reject();
        },
        onplayerror: function () {
          reject();
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
    });
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

  const changePlaybackTime = (time: number) => {
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
    start, stop, getPlaybackTime, getDuration, changePlaybackTime, isPlaying, getPowerDecibels,
  };
}