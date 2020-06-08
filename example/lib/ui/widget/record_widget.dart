import 'dart:async';
import 'dart:io';

import 'package:assets_audio_player/assets_audio_player.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_sound/flutter_sound.dart';
import 'package:intl/intl.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';

class RecordWidget extends StatefulWidget {
  static String routeName = '/record';

  @override
  _RecordWidgetState createState() => _RecordWidgetState();
}

class _RecordWidgetState extends State<RecordWidget> {
  FlutterSoundRecorder recorder;
  StreamSubscription recorderSubscription;
  AssetsAudioPlayer assetsAudioPlayer;

  bool _isRecording;
  String _recorderTxt;
  double _dbLevel;
  Codec _codec = Codec.aacADTS;
  String _path;

  @override
  void initState() {
    super.initState();
    recorder = FlutterSoundRecorder()
      ..openAudioSession(
        focus: AudioFocus.requestFocusTransient,
        category: SessionCategory.playAndRecord,
        mode: SessionMode.modeDefault,
        audioFlags: outputToSpeaker,
      );
    assetsAudioPlayer = AssetsAudioPlayer();

    _isRecording = false;
    _recorderTxt = '00:00:00';
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        _isRecording
            ? LinearProgressIndicator(
                value: 100.0 / 160.0 * (this._dbLevel ?? 1) / 100,
                valueColor: AlwaysStoppedAnimation<Color>(Colors.green),
                backgroundColor: Colors.red,
              )
            : Container(),
        Text(
          _recorderTxt,
          style: TextStyle(
            fontSize: 35.0,
            color: Colors.black,
          ),
        ),
        FlatButton(
          onPressed: () => _isRecording ? stopRecorder() : startRecoder(),
          child: _isRecording ? Icon(Icons.mic_off) : Icon(Icons.mic),
        ),
        FlatButton(
          onPressed: () => assetsAudioPlayer
              .open(Audio.file(_path))
              .then((_) => assetsAudioPlayer.play()),
          child: Icon(Icons.play_circle_filled),
        ),
      ],
    );
  }

  @override
  void dispose() {
    super.dispose();
    recorder.closeSession();
    assetsAudioPlayer.dispose();
    cancelRecorderSubscriptions();
  }

  void startRecoder() async {
    try {
      PermissionStatus status = await Permission.microphone.request();
      if (status != PermissionStatus.granted) {
        throw RecordingPermissionException('Microphone permission not granted');
      }

      Directory tempDir = await getTemporaryDirectory();
      _path = '${tempDir.path}/${recorder.slotNo}-${ext[_codec.index]}';
      print(_path);
      await recorder.startRecorder(
        toFile: _path,
        codec: _codec,
        bitRate: 8000,
        sampleRate: 8000,
      );
      print('startRecorder');

      recorderSubscription = recorder.onProgress.listen((e) {
        if (e != null && e.duration != null) {
          DateTime date = DateTime.fromMillisecondsSinceEpoch(
            e.duration.inMilliseconds,
            isUtc: true,
          );
          String txt = DateFormat('mm:ss:SS', 'ja_JP').format(date);

          setState(() {
            _recorderTxt = txt.substring(0, 8);
            _dbLevel = e.decibels;
          });
        }
      });

      setState(() => _isRecording = true);
    } catch (err) {
      print('startRecorder error: $err');
      stopRecorder();
      cancelRecorderSubscriptions();
    }
  }

  void stopRecorder() async {
    try {
      print('stopRecorder');
      await recorder.stopRecorder();
    } catch (err) {
      print('stopRecorder error: $err');
    }
    setState(() => _isRecording = false);
  }

  void cancelRecorderSubscriptions() {
    if (recorderSubscription != null) {
      recorderSubscription.cancel();
      recorderSubscription = null;
    }
  }
}
