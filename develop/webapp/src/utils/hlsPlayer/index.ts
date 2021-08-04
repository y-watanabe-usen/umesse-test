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
  let video = document.createElement("video");
  let hls: Hls;

  const load = (url: string) => {
    hls = new Hls();
    video = document.createElement("video");
    hls.loadSource(url);
    hls.attachMedia(video);
    video.load();
    video.removeEventListener("pause", stopFunction);
    video.removeEventListener("error", stopFunction);
    video.removeEventListener("end", stopFunction);
    video.addEventListener("pause", stopFunction);
    video.addEventListener("error", stopFunction);
    video.addEventListener("end", stopFunction);
  };

  const start = async () => {
    await video.play();
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
    video.currentTime = 0;
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
    load, start, stop, getPlaybackTime, getDuration, changePlaybackTime, isPlaying,
  };
}