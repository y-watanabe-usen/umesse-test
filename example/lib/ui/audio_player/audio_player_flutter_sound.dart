import 'package:flutter_sound/flutter_sound.dart';

import 'audio_player.dart';
export 'audio_player.dart';

class AudioPlayerFlutterSound implements AudioPlayer {
  Codec codec = Codec.defaultCodec;
  final FlutterSoundPlayer player = FlutterSoundPlayer()
    ..openAudioSession(
      focus: AudioFocus.requestFocusTransient,
      category: SessionCategory.playAndRecord,
      mode: SessionMode.modeDefault,
      audioFlags: outputToSpeaker,
    );

  @override
  void play(String path) async {
    await player.startPlayer(
      fromURI: path,
      codec: codec,
      whenFinished: () => _updateState(),
    );
    _updateState();
  }

  @override
  void stop() async {
    await player.stopPlayer();
    _updateState();
  }

  UpdateStateListener updateStateListener;
  @override
  void setStateListener(UpdateStateListener listener) {
    updateStateListener = listener;
  }

  @override
  void setCodec(AudioCodec audioCodec) {
    switch (audioCodec) {
      case AudioCodec.aac:
        codec = Codec.aacADTS;
        break;
      case AudioCodec.mp3:
        codec = Codec.mp3;
        break;
      default:
        throw Exception('Invalid codec $audioCodec');
        break;
    }
  }

  void dispose() {
    if (player.isPlaying) player.stopPlayer();
    player.closeSession();
  }

  void _updateState() {
    AudioPlayerState state = AudioPlayerState.isStopped;
    switch (player.playerState) {
      case PlayerState.isStopped:
        state = AudioPlayerState.isStopped;
        break;
      case PlayerState.isPlaying:
        state = AudioPlayerState.isPlaying;
        break;
      case PlayerState.isPaused:
        state = AudioPlayerState.isPaused;
        break;
      default:
        throw Exception('Invalid state ${player.playerState}');
        break;
    }
    updateStateListener(state);
  }
}
