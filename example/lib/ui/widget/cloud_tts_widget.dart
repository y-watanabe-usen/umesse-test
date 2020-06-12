import 'package:flutter/material.dart';
import 'dart:io';
import 'dart:convert';
import 'package:path_provider/path_provider.dart';
import 'package:umesse/repository/test_to_speach_api.dart';
import 'package:umesse/models/cloud_tts_voice.dart';
import 'package:umesse/utils/audio_player/audio_player_flutter_sound.dart';

class CloudTtsWidget extends StatefulWidget {
  @override
  _CloudTtsWidgetState createState() => new _CloudTtsWidgetState();
}

class _CloudTtsWidgetState extends State<CloudTtsWidget> {
  List<CloudTtsVoice> _voices = [];
  CloudTtsVoice _selectedVoice;
  // AudioPlayer audioPlugin = AudioPlayer();
  AudioPlayer audioPlayer;
  final TextEditingController _searchQuery =
      TextEditingController(text: "いらっしゃいませ");

  initState() {
    super.initState();
    getVoices();
   audioPlayer = AudioPlayerFlutterSound()
      ..setCodec(AudioCodec.mp3)
      ..setStateListener((AudioPlayerState state) {
        //setState(() => _isPlaying = (AudioPlayerState.isPlaying == state));
      });
  }

  void synthesizeText(String text) async {
    final String audioContent = await TextToSpeechAPI().synthesizeText(
        text, _selectedVoice.name, _selectedVoice.languageCodes.first);
    if (audioContent == null) return;
    final bytes = Base64Decoder().convert(audioContent, 0, audioContent.length);
    final dir = await getTemporaryDirectory();
    final file = File('${dir.path}/wavenet.mp3');
    await file.writeAsBytes(bytes);
    audioPlayer.play(file.path);
  }

  void getVoices() async {
    final voices = await TextToSpeechAPI().getVoices();
    if (voices == null) return;
    setState(() {
      _selectedVoice = voices.firstWhere(
          (e) =>
              e.name == 'ja-JP-Wavenet-A' && e.languageCodes.first == 'ja-JP',
          orElse: () => CloudTtsVoice('en-US-Wavenet-F', 'FEMALE', ['en-US']));
      _voices = voices;
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      body: SingleChildScrollView(
          child: Column(children: <Widget>[
        Text("Cloud Text-to-Speech"),
        Padding(
          padding: EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
          child: DropdownButton<CloudTtsVoice>(
            value: _selectedVoice,
            hint: Text('Select Voice'),
            items: _voices
                .map((f) => DropdownMenuItem(
                      value: f,
                      child: Text(
                          '${f.name} - ${f.languageCodes.first} - ${f.gender}'),
                    ))
                .toList(),
            onChanged: (voice) {
              setState(() {
                _selectedVoice = voice;
              });
            },
          ),
        ),
        Padding(
          padding: EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
          child: TextField(
            autofocus: true,
            controller: _searchQuery,
            keyboardType: TextInputType.multiline,
            maxLines: null,
            decoration: InputDecoration(
              hintText: 'おはようございます',
            ),
          ),
        )
      ])),
      floatingActionButton: FloatingActionButton(
        elevation: 4.0,
        child: Icon(Icons.audiotrack),
        onPressed: () {
          final text = _searchQuery.text;
          if (text.length == 0 || _selectedVoice == null) return;
          synthesizeText(text);
        },
      ),
    );
  }
}
