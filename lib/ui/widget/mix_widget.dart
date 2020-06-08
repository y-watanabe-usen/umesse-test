import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class MixWidget extends StatelessWidget {
  static String routeName = '/mix';

  @override
  Widget build(BuildContext context) {
    return Center(
      child: IconButton(
        icon: Icon(Icons.audiotrack),
        onPressed: () => null,
      ),
    );
  }
}
