import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:umesse/models/voices.dart';
import 'package:umesse/utils/audio_player/audio_player_flutter_sound.dart';

class PresetWidget extends StatefulWidget {
  @override
  _PresetWidgetState createState() => _PresetWidgetState();
}

class _PresetWidgetState extends State<PresetWidget> {
  AudioPlayer audioPlayer;
  Future<Voices> getPresetVoices() async {
    String data = await rootBundle.loadString('assets/json/presetvoices.json');
    return voicesFromJson(data);
  }

  @override
  void initState() {
    super.initState();
    audioPlayer = AudioPlayerFlutterSound()
      ..setCodec(AudioCodec.mp3)
      ..setStateListener((AudioPlayerState state) {
        //setState(() => _isPlaying = (AudioPlayerState.isPlaying == state));
      });
  }

  @override
  void dispose() {
    audioPlayer.dispose();
    super.dispose();
  }

  void startPlayer(String path) async {
    try {
      print('startPlayer');
      audioPlayer.play(path);
    } catch (err) {
      print('startPlayer error: $err');
      stopPlayer();
    }
  }

  void stopPlayer() async {
    try {
      print('stopPlayer');
      audioPlayer.stop();
    } catch (err) {
      print('stopPlayer error: $err');
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Voices>(
      future: getPresetVoices(),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return ListView.builder(
              itemCount: snapshot.data.voices.length,
              itemBuilder: (context, index) => ListTile(
                  onTap: () =>
                      startPlayer(snapshot.data.voices.elementAt(index).file),
                  title: Text(snapshot.data.voices.elementAt(index).title)));
        }
        return Container();
      },
    );
  }
}
