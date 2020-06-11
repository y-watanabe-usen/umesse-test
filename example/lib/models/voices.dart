// To parse this JSON data, do
//
//     final voices = voicesFromJson(jsonString);

import 'dart:convert';

Voices voicesFromJson(String str) => Voices.fromJson(json.decode(str));

String voicesToJson(Voices data) => json.encode(data.toJson());

class Voices {
    Voices({
        this.voices,
    });

    List<Voice> voices;

    factory Voices.fromJson(Map<String, dynamic> json) => Voices(
        voices: List<Voice>.from(json["voices"].map((x) => Voice.fromJson(x))),
    );

    Map<String, dynamic> toJson() => {
        "voices": List<dynamic>.from(voices.map((x) => x.toJson())),
    };
}

class Voice {
    Voice({
        this.title,
        this.file,
        this.playtime,
    });

    String title;
    String file;
    int playtime;

    factory Voice.fromJson(Map<String, dynamic> json) => Voice(
        title: json["title"],
        file: json["file"],
        playtime: json["playtime"],
    );

    Map<String, dynamic> toJson() => {
        "title": title,
        "file": file,
        "playtime": playtime,
    };
}
