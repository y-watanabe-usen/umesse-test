import 'package:flutter/material.dart';

class NavigatorManager {
  static NavigatorManager _instance;

  static NavigatorManager get instance =>
      _instance ??= NavigatorManager._internal();

  NavigatorManager._internal();

  final GlobalKey<NavigatorState> homeNavigatorKey =
      GlobalKey<NavigatorState>();
  GlobalKey<NavigatorState> anotherNavigatorKey = GlobalKey<NavigatorState>();
}
