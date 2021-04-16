import 'dart:ui';
import 'package:flutter/material.dart';

class dashtabs extends StatelessWidget{
  @override
  Widget build(BuildContext context) {

    return dashtab();
  }
}

class dashtab extends StatefulWidget{
  @override
  State<StatefulWidget> createState(){
    return _dashtab();
  }
}

class _dashtab extends State<dashtab>{
  @override
  Widget build(BuildContext context) {

    return Scaffold(
        appBar: new AppBar(
          title: new Text(
              'Adopt A Student',
            style: TextStyle(
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
    );
  }
}