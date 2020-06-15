import 'dart:io';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:umesse/ui/dialogs/audio_file_selector_dialog.dart';
import 'package:umesse/utils/audio_converter.dart';

class AudioConcatWidget extends StatefulWidget {
  @override
  _AudioConcatWidgetState createState() => _AudioConcatWidgetState();
}

class _AudioConcatWidgetState extends State<AudioConcatWidget> {
  final AudioConverter _audioConverter = AudioConverter();
  String first, seccond;
  bool _loading = false;

  bool get loading => _loading;

  set loading(bool loading) {
    setState(() {
      _loading = loading;
    });
  }

  @override
  void initState() {
    super.initState();
    updateList();
  }

  void updateList() {
    _audioConverter.listAudioOutiutFiles().then((list) {
      setState(() => listItems = list);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Stack(children: [
      Column(
        children: [
          Text('←で録音したデータの結合\n再生はRecordの場所'),
          _buildFirstAudioFile(context),
          _buildSeccondAudioFile(context),
          _buildJoinButton(),
          Expanded(child: _buildRecordedList())
        ],
      ),
      if (loading) Center(child: CircularProgressIndicator())
    ]);
  }

  Widget _buildFirstAudioFile(BuildContext context) {
    return RaisedButton(
      child: Text(first ?? 'select file1'),
      onPressed: () {
        showAudioFileSelectorDialog(context)
            .then((value) => setState(() => first = value));
      },
    );
  }

  Widget _buildSeccondAudioFile(BuildContext context) {
    return RaisedButton(
      child: Text(seccond ?? 'select file2'),
      onPressed: () {
        showAudioFileSelectorDialog(context)
            .then((value) => setState(() => seccond = value));
      },
    );
  }

  _buildJoinButton() {
    return RaisedButton(
        child: Text('ファイル結合'),
        onPressed: (first == null || seccond == null)
            ? null
            : () {
                loading = true;
                final datetime = DateTime.now();
                var formatter = new DateFormat('yyyy-MM-dd-HH-mm-ss', "ja_JP");
                var formatted = formatter.format(datetime);
                final outputFile = "output_$formatted.aac";
                _audioConverter.concat(first, seccond, outputFile).then((result) {
                  first = null;
                  seccond = null;
                  loading = false;
                  updateList();
                  Scaffold.of(context).showSnackBar(
                      SnackBar(content: Text("generate $outputFile")));
                });
              });
  }

  List<FileSystemEntity> listItems = [];
  Widget _buildRecordedList() {
    return (listItems.length == 0)
        ? Container()
        : ListView.builder(
            itemCount: listItems.length,
            itemBuilder: (context, index) => ListTile(
                title: Text(listItems.elementAt(index).path.toString())));
  }
}
