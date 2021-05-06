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

  const start = async (src?: string) => {
    state.sound = new Howl({
      src: src,
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
      },
      onend: function () {
        state.currentTime = 0;
        state.playing = false;
      },
    });
    state.sound.play();
    // if (src) {
    //   audio.src = src;
    // }
    // if (!audio.src) return;
    // await audio.play();
    timer = setInterval(() => {
      // updatePlaybackTime();
      state.currentTime = <number>state.sound.seek();
    }, 50);
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

  return {
    start, stop, getCurrentTime, getDuration, changeCurrentTime, isPlaying,
  };
}