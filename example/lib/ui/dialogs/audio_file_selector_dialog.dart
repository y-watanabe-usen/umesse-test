import 'dart:io';

import 'package:flutter/material.dart';
import 'package:umesse/utils/audio_converter.dart';

Future<String> showAudioFileSelectorDialog(BuildContext context) {
  return showDialog(
      context: context,
      builder: (BuildContext context) => AudioFileSelectorDialog());
}

class AudioFileSelectorDialog extends StatefulWidget {
  @override
  _AudioFileSelectorDialogState createState() =>
      _AudioFileSelectorDialogState();
}

class _AudioFileSelectorDialogState extends State<AudioFileSelectorDialog> {
  List<FileSystemEntity> listItems = [];

  final AudioConverter _audioManager = AudioConverter();
  @override
  void initState() {
    super.initState();
    _audioManager.listAudioFiles().then((value) => setState(() {
          listItems = value;
        }));
  }

  Widget _buildRecordedList() {
    if (listItems.length == 0) return Container();
    return ListView.builder(
        itemCount: listItems.length,
        itemBuilder: (context, index) {
          return ListTile(
              onTap: () {
                Navigator.of(context)
                    .pop(listItems.elementAt(index).path.toString());
              },
              title: Text(listItems.elementAt(index).path.toString()),
              trailing: Icon(Icons.play_arrow));
        });
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: _buildRecordedList(),
    );
  }
}
