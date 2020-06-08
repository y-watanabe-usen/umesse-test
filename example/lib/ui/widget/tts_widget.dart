import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class TtsWidget extends StatelessWidget {
  static String routeName = '/tts';

  @override
  Widget build(BuildContext context) {
    return Center(
      child: IconButton(
        icon: Icon(Icons.speaker),
        onPressed: () => null,
      ),
    );
  }
}
