import 'package:assets_audio_player/assets_audio_player.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:soundpool/soundpool.dart';

class MixWidget extends StatefulWidget {
  static String routeName = '/mix';

  @override
  _MixWidgetState createState() => _MixWidgetState();
}

class _MixWidgetState extends State<MixWidget> {
  AssetsAudioPlayer assetsAudioPlayer;
  Soundpool soundPool;

  @override
  void initState() {
    super.initState();
    assetsAudioPlayer = AssetsAudioPlayer();
    soundPool = Soundpool();
  }

  @override
  Widget build(BuildContext context) {
    final _list = [
      _assetAudioPlayer('broadcasting-end1.mp3'),
      _assetAudioPlayer('broadcasting-start1.mp3'),
      _assetAudioPlayer('drum-japanese2.mp3'),
      _assetAudioPlayer('eye-shine1.mp3'),
      _assetAudioPlayer('people-performance-cheer1.mp3'),
      _assetAudioPlayer('self-regulation1.mp3'),
      _assetAudioPlayer('stupid3.mp3'),
      _assetAudioPlayer('title1.mp3'),
      _assetAudioPlayer('trumpet1.mp3'),
      _soundPool('broadcasting-end1.mp3'),
      _soundPool('broadcasting-start1.mp3'),
      _soundPool('drum-japanese2.mp3'),
      _soundPool('eye-shine1.mp3'),
      _soundPool('people-performance-cheer1.mp3'),
      _soundPool('self-regulation1.mp3'),
      _soundPool('stupid3.mp3'),
      _soundPool('title1.mp3'),
      _soundPool('trumpet1.mp3'),
    ];

    return GridView.count(
      crossAxisCount: 3,
      children: _list,
    );
  }

  @override
  void dispose() {
    super.dispose();
    assetsAudioPlayer.dispose();
    soundPool.dispose();
  }

  Widget _assetAudioPlayer(String name) {
    return GestureDetector(
      child: Container(
        decoration:
            BoxDecoration(border: Border.all(color: Colors.black, width: 0.5)),
        child: Text('assets_audio_player : $name'),
      ),
      onTap: () {
        assetsAudioPlayer
            .open(Audio('assets/$name'))
            .then((_) => assetsAudioPlayer.play());
      },
    );
  }

  Widget _soundPool(String name) {
    return GestureDetector(
      child: Container(
        decoration:
            BoxDecoration(border: Border.all(color: Colors.black, width: 0.5)),
        child: Text('sound_pool : $name'),
      ),
      onTap: () async {
        int soundId = await rootBundle
            .load('assets/$name')
            .then((ByteData soundData) => soundPool.load(soundData));
        soundPool.play(soundId);
      },
    );
  }
}
