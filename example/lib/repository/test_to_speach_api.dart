import 'dart:io';
import 'dart:async';
import 'dart:convert' show json, utf8;
import 'package:umesse/models/cloud_tts_voice.dart';

class TextToSpeechAPI {
  static final TextToSpeechAPI _singleton = TextToSpeechAPI._internal();
  final _httpClient = HttpClient();
  static const _apiKey = "AIzaSyACc2LrBusx_UTfHvzEf5ApizQzqQ9X8GM"; // 個人で取得したAPIキー
  static const _apiURL = "texttospeech.googleapis.com";
//  static const _apiURL = "speech.googleapis.com";

  factory TextToSpeechAPI() {
    return _singleton;
  }

  TextToSpeechAPI._internal();

  Future<dynamic> synthesizeText(
      String text, String name, String languageCode) async {
    try {
      final uri = Uri.https(_apiURL, '/v1beta1/text:synthesize');
      final Map json = {
        'input': {'text': text},
        'voice': {'name': name, 'languageCode': languageCode},
        'audioConfig': {'audioEncoding': 'MP3'}
      };

      final jsonResponse = await _postJson(uri, json);
      if (jsonResponse == null) return null;
      final String audioContent = await jsonResponse['audioContent'];
      return audioContent;
    } on Exception catch (e) {
      print("$e");
      return null;
    }
  }

  Future<List<CloudTtsVoice>> getVoices() async {
    try {
      final uri = Uri.https(_apiURL, '/v1beta1/voices');

      final jsonResponse = await _getJson(uri);
      if (jsonResponse == null) {
        return null;
      }

      final List<dynamic> voicesJSON = jsonResponse['voices'].toList();

      if (voicesJSON == null) {
        return null;
      }

      final voices = CloudTtsVoice.mapJSONStringToList(voicesJSON);
      return voices;
    } on Exception catch (e) {
      print("$e");
      return null;
    }
  }

  Future<Map<String, dynamic>> _postJson(Uri uri, Map jsonMap) async {
    try {
      final httpRequest = await _httpClient.postUrl(uri);
      final jsonData = utf8.encode(json.encode(jsonMap));
      final jsonResponse =
          await _processRequestIntoJsonResponse(httpRequest, jsonData);
      return jsonResponse;
    } on Exception catch (e) {
      print("$e");
      return null;
    }
  }

  Future<Map<String, dynamic>> _getJson(Uri uri) async {
    try {
      final httpRequest = await _httpClient.getUrl(uri);
      final jsonResponse =
          await _processRequestIntoJsonResponse(httpRequest, null);
      return jsonResponse;
    } on Exception catch (e) {
      print("$e");
      return null;
    }
  }

  Future<Map<String, dynamic>> _processRequestIntoJsonResponse(
      HttpClientRequest httpRequest, List<int> data) async {
    try {
      httpRequest.headers.add('X-Goog-Api-Key', _apiKey);
      httpRequest.headers.add(HttpHeaders.contentTypeHeader, 'application/json');
      httpRequest.headers.add(HttpHeaders.refererHeader, 'http://usen.com/'); // リファラーがこのURLのときしかAPIが動かないように制限してる
      if (data != null) {
        httpRequest.add(data);
      }
      final httpResponse = await httpRequest.close();
      if (httpResponse.statusCode != HttpStatus.ok) {
        print(httpResponse.statusCode);
        throw Exception('Bad Response');
      }
      final responseBody = await httpResponse.transform(utf8.decoder).join();
      return json.decode(responseBody);
    } on Exception catch (e) {
      print("$e");
      return null;
    }
  }
}
