import 'package:flutter/material.dart';
import 'package:adopt_student/welcome/home.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {

    return MaterialApp(
      title: 'Adopt a Student',
      debugShowCheckedModeBanner: false,
      theme: new ThemeData(
        primarySwatch: Colors.red,
      ),
      home: Home(),

    );
  }
}