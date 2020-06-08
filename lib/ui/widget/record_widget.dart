import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class RecordWidget extends StatelessWidget {
  static String routeName = '/record';

  @override
  Widget build(BuildContext context) {
    return Center(
      child: IconButton(
        icon: Icon(Icons.mic_off),
        onPressed: () => null,
      ),
    );
  }
}
