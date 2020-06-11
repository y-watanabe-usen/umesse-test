import 'package:flutter/material.dart';
import 'package:umesse/ui/dialogs/audio_file_selector_dialog.dart';
import 'package:umesse/utils/audio_manager.dart';

class AudioAnalyzerWidget extends StatefulWidget {
  @override
  _AudioAnalyzerWidgetState createState() => _AudioAnalyzerWidgetState();
}

class _AudioAnalyzerWidgetState extends State<AudioAnalyzerWidget> {
  AudioManager _audioManager = AudioManager();
  String inputFile;

  bool _loading = false;

  bool get loading => _loading;

  set loading(bool loading) {
    setState(() {
      _loading = loading;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      Column(
        children: [
          Text('←で録音したデータの音圧\n再生はRecordの場所'),
          RaisedButton(
              onPressed: () async {
                final value = await showAudioFileSelectorDialog(context);
                setState(() => inputFile = value);
              },
              child: Text(inputFile ?? 'SelectFile')),
          RaisedButton(
            child: Text('３倍'),
            onPressed: () async {
              setState(() => loading = true);
              final outputFile = '$inputFile.3x.aac';
              final _ =
                  await _audioManager.audioVolumeUp(inputFile, outputFile);
              setState(() {
                loading = false;
                inputFile = null;
              });
            },
          ),
          RaisedButton(
            child: Text('ノイズ除去'),
            onPressed: () async {
              setState(() => loading = true);
              final outputFile = '$inputFile.noise.aac';
              final _ = await _audioManager.removeNoise(inputFile, outputFile);
              setState(() {
                loading = false;
                inputFile = null;
              });
            },
          ),
        ],
      ),
      if (loading) Center(child: CircularProgressIndicator()),
    ]);
  }
}
