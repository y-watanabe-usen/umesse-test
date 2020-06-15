import 'dart:async';
import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_sound/flutter_sound.dart';
import 'package:intl/intl.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:umesse/utils/audio_player/audio_player.dart';
import 'package:umesse/utils/audio_player/audio_player_flutter_sound.dart';
import 'package:umesse/utils/audio_recorder/audio_recorder.dart';
import 'package:umesse/utils/audio_recorder/audio_recorder_flutter_sound.dart';
import 'package:umesse/utils/path_utils.dart';

class RecordWidget extends StatefulWidget {
  static String routeName = '/record';

  @override
  _RecordWidgetState createState() => _RecordWidgetState();
}

class _RecordWidgetState extends State<RecordWidget> {
  AudioPlayer audioPlayer;
  AudioRecorder audioRecorder;
  StreamSubscription recorderSubscription;

  bool _isRecording;
  String _recorderTxt;
  double _dbLevel;

  @override
  void initState() {
    super.initState();
    audioPlayer = AudioPlayerFlutterSound()
      ..setCodec(AudioCodec.aac)
      ..setStateListener((AudioPlayerState state) => setState(() => {}));
    audioRecorder = AudioRecorderFlutterSound();

    _isRecording = false;
    _recorderTxt = '00:00:00';

    updateList();
  }

  updateList() {
    PathUtils.getAudioDir().then((dir) {
      setState(() {
        listItems = dir.listSync();
      });
    });
  }

  List<FileSystemEntity> listItems = [];

  Widget _buildRecordController() {
    return Column(
      children: [
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
        RawMaterialButton(
          onPressed: () {
            if (_isRecording) {
              stopRecorder();
              updateList();
            } else
              startRecoder();
          },
          elevation: 2.0,
          fillColor: Colors.white,
          child: _isRecording
              ? Icon(Icons.stop, size: 35.0)
              : Icon(Icons.mic, size: 35.0),
          padding: EdgeInsets.all(15.0),
          shape: CircleBorder(),
        ),
      ],
    );
  }

  Widget _buildRecordedList() {
    if (listItems.length == 0) return Container();
    return ListView.builder(
        itemCount: listItems.length,
        itemBuilder: (context, index) {
          return ListTile(
              onTap: () {
                audioPlayer.isPlaying
                    ? audioPlayer.stop()
                    : audioPlayer
                        .play(listItems.elementAt(index).path.toString());
              },
              title: Text(listItems.elementAt(index).path.toString()),
              trailing: Icon(Icons.play_arrow));
        });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _buildRecordController(),
        Expanded(child: _buildRecordedList()),
      ],
    );
  }

  @override
  void dispose() {
    audioPlayer.dispose();
    audioRecorder.dispose();
    super.dispose();
  }

  void startRecoder() async {
    try {
      PermissionStatus status = await Permission.microphone.request();
      if (status != PermissionStatus.granted) {
        throw RecordingPermissionException('Microphone permission not granted');
      }
      audioRecorder.startRecorder();
      print('startRecorder');

      recorderSubscription = audioRecorder.onProgress.listen((e) {
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

  void stopRecorder() async {
    try {
      print('stopRecorder');
      audioRecorder.stopRecorder();
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
