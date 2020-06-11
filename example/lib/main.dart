import 'package:flutter/material.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:umesse/ui/widget/home_widget.dart';

void main() {
  initializeDateFormatting('ja_JP');
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
        home: HomeWidget());
  }
}
