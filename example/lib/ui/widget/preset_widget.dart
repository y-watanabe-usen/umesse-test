import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_sound/flutter_sound.dart';
import 'package:umesse/models/voices.dart';

class PresetWidget extends StatefulWidget {
  @override
  _PresetWidgetState createState() => _PresetWidgetState();
}

class _PresetWidgetState extends State<PresetWidget> {
  FlutterSoundPlayer player;
  Future<Voices> getPresetVoices() async {
    String data = await rootBundle.loadString('assets/json/presetvoices.json');
    return voicesFromJson(data);
  }

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
  }

  @override
  void dispose() {
    player.stopPlayer();
    player.closeSession();
    super.dispose();
  }

  void startPlayer(String path) async {
    try {
      print('startPlayer');
      await player.startPlayer(
        fromURI: path,
        codec: Codec.mp3,
        whenFinished: () {
          print('startPlayerFinish');
        },
      );
    } catch (err) {
      print('startPlayer error: $err');
      stopPlayer();
    }
  }

  void stopPlayer() async {
    try {
      print('stopPlayer');
      await player.stopPlayer();
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
