import { reactive } from 'vue';
import { NewAudioPlayerState } from '@/utils/newAudioPlayer/state';
import { Howl, Howler } from 'howler';

export default function useNewAudioPlayer() {
  const state = reactive<NewAudioPlayerState>({
    playing: false,
    powerDecibels: -100,
    currentTime: 0,
    duration: 0,
    sound: new Howl({}),
  });
  let timer: number | undefined;
  const audio = new window.Audio();
  let analyser: AnalyserNode;
  let source: AudioBufferSourceNode;
  let sampleBuffer: Float32Array;

  const startBuffer = async (arrayBuffer: ArrayBuffer) => {
    const howlSource = ["data:audio/mp3;base64," + arrayBufferToBase64(arrayBuffer)];
    state.sound = new Howl({
      src: howlSource,
      // html5: true,
      onplay: function () {
        state.currentTime = 0;
        state.duration = state.sound.duration();
        state.playing = true;
      },
      onpause: function () {
        state.currentTime = <number>state.sound.seek();
      },
      onseek: function () {
        console.log("onseek");
        // state.currentTime = <number>state.sound.seek();
      },
      onstop: function () {
        state.currentTime = 0;
        state.playing = false;
        Howler.masterGain.disconnect(analyser);
        analyser.disconnect(Howler.ctx.destination);
      },
      onend: function () {
        state.currentTime = 0;
        state.playing = false;
        Howler.masterGain.disconnect(analyser);
        analyser.disconnect(Howler.ctx.destination);
      },
    });
    state.sound.play();
    // if (src) {
    //   audio.src = src;
    // }
    // if (!audio.src) return;
    // await audio.play();

    Howler.usingWebAudio = true;
    analyser = Howler.ctx.createAnalyser();
    analyser.fftSize = 2048;
    sampleBuffer = new Float32Array(analyser.fftSize);
    Howler.masterGain.connect(analyser);
    // state.sound.
    analyser.connect(Howler.ctx.destination);
    // source.connect(analyser);
    // source.start();


    // source = Howler.ctx.createBufferSource();

    // analyser = Howler.ctx.createAnalyser();
    // analyser.fftSize = 2048;
    // sampleBuffer = new Float32Array(analyser.fftSize);

    // source.buffer = await Howler.ctx.decodeAudioData(arrayBuffer);
    // analyser.connect(Howler.ctx.destination);
    // source.connect(analyser);
    // source.start();

    timer = setInterval(() => {
      // updatePlaybackTime();
      updateAnalyser();
      state.currentTime = <number>state.sound.seek();
    }, 50);

    // source = Howler.ctx.createBufferSource();
    // source.buffer = await Howler.ctx.decodeAudioData(arrayBuffer);
    // source.;
    // analyser.connect(context.destination);

    // analyser = Howler.ctx.createAnalyser();
    // analyser.fftSize = 2048;
    // sampleBuffer = new Float32Array(analyser.fftSize);
    // analyser.connect(Howler.ctx.destination);
    // source.connect(analyser);

    state.playing = true;
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const start = async (src?: string) => {
    state.sound = new Howl({
      src: src,
      html5: true,
      onplay: function () {
        state.currentTime = 0;
        state.duration = state.sound.duration();
        state.playing = true;


        // source = Howler.ctx.createBufferSource();

        // source.;
        // analyser.connect(context.destination);

        analyser = Howler.ctx.createAnalyser();
        analyser.fftSize = 2048;
        sampleBuffer = new Float32Array(analyser.fftSize);
        Howler.masterGain.connect(analyser);
        analyser.connect(Howler.ctx.destination);
        // source.connect(analyser);
        // source.start();
        timer = setInterval(() => {
          // updatePlaybackTime();
          updateAnalyser();
          state.currentTime = <number>state.sound.seek();
        }, 50);
      },
      onpause: function () {
        state.currentTime = <number>state.sound.seek();
      },
      onseek: function () {
        console.log("onseek");
        // state.currentTime = <number>state.sound.seek();
      },
      onstop: function () {
        state.currentTime = 0;
        state.playing = false;
        analyser.disconnect(Howler.ctx.destination);
      },
      onend: function () {
        state.currentTime = 0;
        state.playing = false;
        analyser.disconnect(Howler.ctx.destination);
      },
    });
    state.sound.play();
    // if (src) {
    //   audio.src = src;
    // }
    // if (!audio.src) return;
    // await audio.play();

    state.playing = true;
  };

  const stop = () => {
    state.sound?.stop();
    clearInterval(timer);
    // audio.pause();
    // audio.currentTime = 0;
    state.playing = false;
  };

  const getCurrentTime = () => {
    return state.currentTime;
  };

  const getDuration = () => {
    return state.duration;
  };

  const getPowerDecibels = () => {
    return state.powerDecibels;
  };

  const changeCurrentTime = (time: number) => {
    // audio.currentTime = time;
    const per = time / state.duration;
    // state.sound.pause();
    state.sound.seek(state.duration * per);
    // state.sound.play();
  };

  audio.addEventListener("timeupdate", () => {
    state.currentTime = audio.currentTime;
    if (!isNaN(audio.duration)) {
      state.duration = audio.duration;
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    let time = audio.currentTime;
    requestAnimationFrame(function me() {
      if (time !== audio.currentTime) {
        time = audio.currentTime;
        audio.dispatchEvent(new CustomEvent("timeupdate"));
      }
      requestAnimationFrame(me);
    });
  });

  audio.addEventListener("ended", () => {
    stop();
  });

  const isPlaying = () => {
    return state.playing;
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

  return {
    start, startBuffer, stop, getCurrentTime, getDuration, changeCurrentTime, isPlaying, updateAnalyser, getPowerDecibels,
  };
}