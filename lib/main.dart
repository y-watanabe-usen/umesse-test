import 'package:flutter/material.dart';
import 'package:umesse/ui/widget/home_widget.dart';
import 'package:umesse/ui/widget/record_widget.dart';
import 'package:umesse/ui/widget/tts_widget.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'U-Messe Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      initialRoute: HomeWidget.routeName,
      routes: <String, WidgetBuilder>{
        HomeWidget.routeName: (_) => HomeWidget(),
        RecordWidget.routeName: (_) => RecordWidget(),
        TtsWidget.routeName: (_) => TtsWidget(),
      },
    );
  }
}
