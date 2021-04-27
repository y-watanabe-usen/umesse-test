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
    state.duration = audio.duration;
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
    console.log("timeupdate");
    state.currentTime = audio.currentTime;
    state.duration = audio.duration;
  });

  const isPlaying = () => {
    return state.playing;
  };

  return {
    start, stop, getCurrentTime, getDuration, changeCurrentTime, isPlaying,
  };
}