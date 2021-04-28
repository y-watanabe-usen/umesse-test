import { reactive } from 'vue';
import { NewAudioPlayerState } from '@/utils/newAudioPlayer/state';

export default function useNewAudioPlayer() {
  const state = reactive<NewAudioPlayerState>({
    playing: false,
    powerDecibels: -100,
    currentTime: 0,
    duration: 0,
  });

  const audio = new window.Audio();

  const start = async (src?: string) => {
    if (src) {
      audio.src = src;
    }
    if (!audio.src) return;
    await audio.play();
    state.playing = true;
  };

  const stop = () => {
    audio.pause();
    audio.currentTime = 0;
    state.playing = false;
  };

  const getCurrentTime = () => {
    return state.currentTime;
  };

  const getDuration = () => {
    return state.duration;
  };

  const changeCurrentTime = (time: number) => {
    audio.currentTime = time;
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