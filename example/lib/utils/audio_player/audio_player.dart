enum AudioPlayerState {
  isStopped,
  isPlaying,
  isPaused,
}
enum AudioCodec {
  mp3,
  aac,
}
typedef void UpdateStateListener(AudioPlayerState state);

abstract class AudioPlayer {
  void setCodec(AudioCodec codec);
  void play(String path);
  void stop();
  void setStateListener(UpdateStateListener listener);
  void dispose();
}
