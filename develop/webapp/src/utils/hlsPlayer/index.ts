import { reactive } from 'vue';
import { HlsPlayerState } from '@/utils/hlsPlayer/state';
import Hls from 'hls.js';

export default function useHlsPlayer() {
  const state = reactive<HlsPlayerState>({
    playing: false,
    playbackTime: 0,
    duration: 0,
  });

  let timer: number | undefined;
  const video = document.createElement("video");
  let hls: Hls;

  const start = async (url: string) => {
    hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    await video.play();
    video.removeEventListener("pause", stopFunction);
    video.removeEventListener("end", stopFunction);
    video.addEventListener("pause", stopFunction);
    video.addEventListener("end", stopFunction);
    startFunction();
  };

  const startFunction = () => {
    timer = setInterval(() => {
      updatePlaybackTime();
    }, 50);
    state.playing = true;
    state.duration = video.duration;
  };

  const stop = () => {
    video.pause();
    stopFunction();
  };

  const stopFunction = () => {
    clearInterval(timer);
    state.playbackTime = 0;
    state.playing = false;
  };
  const getPlaybackTime = () => {
    return state.playbackTime;
  };

  const getDuration = () => {
    return state.duration;
  };

  const changePlaybackTime = (time: number) => {
    video.currentTime = time;
  };

  const isPlaying = () => state.playing;

  const updatePlaybackTime = () => {
    if (!state.playing) return;
    state.playbackTime = <number>video.currentTime;
  };

  return {
    start, stop, getPlaybackTime, getDuration, changePlaybackTime, isPlaying,
  };
}