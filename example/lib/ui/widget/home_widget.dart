import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:umesse/ui/transitions/page_transitions.dart';
import 'package:umesse/ui/widget/bottom_navigation_bar_widget.dart';
import 'package:umesse/ui/widget/mix_widget.dart';
import 'package:umesse/ui/widget/navigator_manager.dart';
import 'package:umesse/ui/widget/record_widget.dart';
import 'package:umesse/ui/widget/tts_widget.dart';

class HomeWidget extends StatefulWidget {
  static String routeName = '/';

  @override
  _HomeWidgetState createState() => _HomeWidgetState();
}

class _HomeWidgetState extends State<HomeWidget> {
  final _navigatorKey = NavigatorManager.instance.homeNavigatorKey;
  int selectedIndex = 0;

  void onBottomItemTapped(int index) {
    if (selectedIndex == index) return;
    setState(() {
      selectedIndex = index;
    });
    switch (index) {
      case 0:
        _navigatorKey.currentState.pushReplacementNamed(HomeWidget.routeName);
        break;
      case 1:
        _navigatorKey.currentState.pushReplacementNamed(RecordWidget.routeName);
        break;
      case 2:
        _navigatorKey.currentState.pushReplacementNamed(TtsWidget.routeName);
        break;
      default:
        throw Exception('system error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('home'),
      ),
      body: _buildRouter(),
      bottomNavigationBar: BottomNavigationBarWidget(
        selectedIndex: selectedIndex,
        onTap: onBottomItemTapped,
      ),
    );
  }

  Widget _buildRouter() {
    return Navigator(
      key: _navigatorKey,
      observers: [
        HeroController(),
      ],
      onGenerateRoute: (settings) {
        Widget child;
        switch (settings.name) {
          case '/':
            child = MixWidget();
            break;
          case '/record':
            child = RecordWidget();
            break;
          case '/tts':
            child = TtsWidget();
            break;
          default:
            throw Exception('Invalid route: ${settings.name}');
        }
        return PageTransition<dynamic>(
          child: child,
          type: PageTransitionType.fade,
          settings: settings,
        );
      },
    );
  }
}
