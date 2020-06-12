import 'package:flutter_sound/flutter_sound.dart';

abstract class AudioRecorder {
  void startRecorder(String toFile);
  void stopRecorder();
  void dispose();


  // FIXME: 依存してしまっているので後で修正.
  Stream<RecordingDisposition> get onProgress;
}
