import 'dart:async';
import 'dart:io';

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
  FlutterSoundPlayer player;
  FlutterSoundRecorder recorder;
  StreamSubscription recorderSubscription;

  bool _isPlaying;
  bool _isRecording;
  String _recorderTxt;
  double _dbLevel;
  Codec _codec = Codec.aacADTS;
  String _path;

  @override
  void initState() {
    super.initState();
    player = FlutterSoundPlayer()
      ..openAudioSession(
        focus: AudioFocus.requestFocusTransient,
        category: SessionCategory.playAndRecord,
        mode: SessionMode.modeDefault,
        audioFlags: outputToSpeaker,
      );

    recorder = FlutterSoundRecorder()
      ..openAudioSession(
        focus: AudioFocus.requestFocusTransient,
        category: SessionCategory.playAndRecord,
        mode: SessionMode.modeDefault,
        audioFlags: outputToSpeaker,
      );

    _isPlaying = false;
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
          onPressed: () => _isPlaying ? stopPlayer() : startPlayer(),
          child: _isPlaying ? Icon(Icons.stop) : Icon(Icons.play_arrow),
        ),
      ],
    );
  }

  @override
  void dispose() {
    super.dispose();
    player.stopPlayer();
    player.closeSession();
    recorder.stopRecorder();
    recorder.closeSession();
  }

  void startPlayer() async {
    try {
      print('startPlayer');
      await player.startPlayer(
        fromURI: _path,
        codec: _codec,
        whenFinished: () {
          print('startPlayerFinish');
          setState(() => _isPlaying = false);
        },
      );
      setState(() => _isPlaying = true);
    } catch (err) {
      print('startPlayer error: $err');
      stopPlayer();
    }
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
    }
  }

  void stopPlayer() async {
    try {
      print('stopPlayer');
      await player.stopPlayer();
    } catch (err) {
      print('stopPlayer error: $err');
    }
    setState(() => _isPlaying = false);
  }

  void stopRecorder() async {
    try {
      print('stopRecorder');
      await recorder.stopRecorder();
      cancelRecorderSubscriptions();
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
