import 'package:flutter/material.dart';

class BottomNavigationBarWidget extends StatelessWidget {
  final int selectedIndex;
  final ValueSetter<int> onTap;
  final double height;

  const BottomNavigationBarWidget({
    Key key,
    this.selectedIndex,
    this.onTap,
    this.height = 58.0,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: height,
      child: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            title: Text('home'),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.mic),
            title: Text('record'),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.library_music),
            title: Text('tts'),
          ),
        ],
        currentIndex: selectedIndex,
        onTap: onTap,
        showSelectedLabels: false,
        showUnselectedLabels: false,
      ),
    );
  }
}
