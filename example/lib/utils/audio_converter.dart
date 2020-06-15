import 'dart:io';

import 'package:flutter_ffmpeg/flutter_ffmpeg.dart';

import 'path_utils.dart';

class AudioConverter {
  final FlutterFFmpeg _flutterFFmpeg = FlutterFFmpeg();
  Future<int> concat(
      String inputFile1, String inputFile2, String outputFileName,
      {bool delete = false}) async {
    final dir = await PathUtils.getAudioDir();
    final outputFile = '${dir.path}/$outputFileName';
    final rc = await _flutterFFmpeg.execute(
        "-i $inputFile1 -i $inputFile2 -filter_complex \"concat=n=2:v=0:a=1\" $outputFile");
    if (rc != 0) throw Exception('ffmpeg return value $rc');
    return rc;
  }

  Future<int> removeNoise(String inputFile, String outputFile) async {
    final rc = await _flutterFFmpeg.execute(
        "-i $inputFile -af \"highpass=f=200, lowpass=f=1000\" $outputFile");
    if (rc != 0) throw Exception('ffmpeg return value $rc');
    return rc;
  }

  Future<int> audioVolumeUp(String inputFile, String outputFile) async {
    final rc = await _flutterFFmpeg
        .execute("-i $inputFile -af \"volume=3.0\" $outputFile");
    if (rc != 0) throw Exception('ffmpeg return value $rc');
    return rc;
  }

  Future<List<FileSystemEntity>> listAudioFiles() async {
    final dir = await PathUtils.getAudioDir();
    return dir.listSync();
  }

  Future<List<FileSystemEntity>> listAudioOutiutFiles() async {
    final dir = await PathUtils.getAudioDir();
    return dir
        .listSync()
        .where((item) => item.path.contains('output'))
        .toList();
  }
}
