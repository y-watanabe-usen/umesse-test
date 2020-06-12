import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:umesse/ui/widget/mix_widget.dart';
import 'package:umesse/ui/widget/record_widget.dart';
import 'package:umesse/ui/widget/tts_widget.dart';

import 'audio_analyzer.widget.dart';
import 'audio_concat_widget.dart';
import 'preset_widget.dart';

class HomeWidget extends StatefulWidget {
  static String routeName = '/';

  @override
  _HomeWidgetState createState() => _HomeWidgetState();
}

class _HomeWidgetState extends State<HomeWidget>
    with SingleTickerProviderStateMixin {
  int selectedIndex = 0;

  final tabs = [
    Tab(text: 'Home'),
    Tab(text: 'Preset'),
    Tab(text: 'Record'),
    Tab(text: '結合'),
    Tab(text: '音圧'),
    Tab(text: 'TTS')
  ];

  TabController _tabController;
  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: tabs.length, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('home'),
      ),
      bottomNavigationBar: BottomAppBar(
        child: TabBar(
          isScrollable: true,
          tabs: tabs,
          controller: _tabController,
          unselectedLabelColor: Colors.grey,
          labelColor: Colors.black,
        ),
      ),
      body: TabBarView(controller: _tabController, children: [
        MixWidget(),
        PresetWidget(),
        RecordWidget(),
        AudioConcatWidget(),
        AudioAnalyzerWidget(),
        TtsWidget()
      ]),
    );
  }
}
