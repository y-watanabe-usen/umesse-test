class CloudTtsVoice {
  final String name;
  final String gender;
  final List<String> languageCodes;

  CloudTtsVoice(this.name, this.gender, this.languageCodes);

  static List<CloudTtsVoice> mapJSONStringToList(List<dynamic> jsonList) {
    return jsonList.map((v) {
      return CloudTtsVoice(
          v['name'], v['ssmlGender'], List<String>.from(v['languageCodes']));
    }).toList();
  }
}
