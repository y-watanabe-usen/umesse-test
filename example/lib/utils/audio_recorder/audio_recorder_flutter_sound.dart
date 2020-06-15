import 'dart:io';

import 'package:flutter_sound/flutter_sound.dart';
import 'package:intl/intl.dart';

import '../path_utils.dart';
import 'audio_recorder.dart';

class AudioRecorderFlutterSound implements AudioRecorder {
  @override
  Stream<RecordingDisposition> get onProgress => recorder.onProgress;
  final FlutterSoundRecorder recorder = FlutterSoundRecorder()
    ..openAudioSession(
      focus: AudioFocus.requestFocusTransient,
      category: SessionCategory.playAndRecord,
      mode: SessionMode.modeDefault,
      audioFlags: outputToSpeaker,
    );
  @override
  void startRecorder() async {
    Directory tempDir = await PathUtils.getAudioDir();
    var formatted =
        DateFormat('yyyy-MM-dd-HH-mm-ss', "ja_JP").format(DateTime.now());
    final toFile = '${tempDir.path}/$formatted${ext[Codec.aacADTS.index]}';
    recorder.startRecorder(
      toFile: toFile,
      codec: Codec.aacADTS,
      bitRate: 8000,
      sampleRate: 8000,
    );
  }

  @override
  void stopRecorder() {
    recorder.stopRecorder();
  }

  @override
  void dispose() {
    if (recorder.isRecording) recorder.stopRecorder();
    recorder.closeSession();
  }
}
