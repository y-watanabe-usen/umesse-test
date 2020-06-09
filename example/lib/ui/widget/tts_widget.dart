import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_tts/flutter_tts.dart';

class TtsWidget extends StatefulWidget {
  static String routeName = '/tts';

  @override
  _TtsWidgetState createState() => _TtsWidgetState();
}

class _TtsWidgetState extends State<TtsWidget> {
  FlutterTts flutterTts;

  double volume = 1.0;
  double pitch = 1.0;
  double rate = 1.0;

  String _voiceText;
  bool _isPlaying = false;

  @override
  void initState() {
    super.initState();
    flutterTts = FlutterTts()
      ..setLanguage('ja-JP')
      ..isLanguageAvailable('ja-JP')
      ..setStartHandler(() => setState(() => _isPlaying = true))
      ..setCompletionHandler(() => setState(() => _isPlaying = false))
      ..setCancelHandler(() => setState(() => _isPlaying = false))
      ..setErrorHandler((error) => setState(() => _isPlaying = false));
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        TextField(
          enabled: true,
          maxLength: 30,
          obscureText: false,
          maxLines: 1,
          decoration: const InputDecoration(
            hintText: 'おはようございます',
          ),
          onChanged: (value) => _voiceText = value,
        ),
        FlatButton(
          onPressed: () => _isPlaying ? _stop() : _speak(),
          child: _isPlaying ? Icon(Icons.stop) : Icon(Icons.play_arrow),
        ),
        Divider(),
        Text('Volume'),
        Slider(
          value: volume,
          onChanged: (value) => setState(() => volume = value),
          min: 0.0,
          max: 1.0,
          divisions: 10,
          label: 'Volume: $volume',
        ),
        Text('Pitch'),
        Slider(
          value: pitch,
          onChanged: (value) => setState(() => pitch = value),
          min: 0.5,
          max: 2.0,
          divisions: 15,
          label: 'Pitch: $pitch',
        ),
        Text('Rate'),
        Slider(
          value: rate,
          onChanged: (value) => setState(() => rate = value),
          min: 0.0,
          max: 2.0,
          divisions: 20,
          label: 'Rate: $rate',
        ),
      ],
    );
  }

  @override
  void dispose() {
    super.dispose();
  }

  Future _speak() async {
    if (_voiceText == null) _voiceText = 'おはようございます';
    print(_voiceText);
    flutterTts
      ..setVolume(volume)
      ..setPitch(pitch)
      ..setSpeechRate(rate);

    dynamic result = await flutterTts.speak(_voiceText);
    if (result == 1) setState(() => _isPlaying = true);
  }

  Future _stop() async {
    dynamic result = await flutterTts.stop();
    if (result == 1) setState(() => _isPlaying = false);
  }
}
