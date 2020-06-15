import 'dart:io';

import 'package:flutter_sound/flutter_sound.dart';
import 'package:intl/intl.dart';
import 'package:path_provider/path_provider.dart';

mixin PathUtils {
  static Future<Directory> getAudioDir() {
    return getTemporaryDirectory();
  }

  static Future<String> getNewRecordedFileName() async {
    Directory tempDir = await PathUtils.getAudioDir();
    var formatted =
        DateFormat('yyyy-MM-dd-HH-mm-ss', "ja_JP").format(DateTime.now());
    final toFile = '${tempDir.path}/$formatted${ext[Codec.aacADTS.index]}';
    return toFile;
  }
}
