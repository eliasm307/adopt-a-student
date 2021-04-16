import 'package:adopt_student/welcome/welcome.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class Home extends StatefulWidget{
  @override
  State<StatefulWidget> createState(){
    return _Home();
  }
}

class _Home extends State<Home>{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: new Container(
              child: new Column(
                children: [
                  new Container(
                    color: Color(0xFF099BA8),
                    height: 80,
                    width: 400,
                  ),
                  new Container(
                    height: 350,
                    decoration: BoxDecoration(
                    color: Color(0xFFD3EDF1),
                      shape: BoxShape.rectangle,
                      borderRadius: BorderRadius.only(
                        bottomLeft: Radius.circular(25.0),
                        bottomRight: Radius.circular(25.0),
                      )
                    ),
                    child: new Image.asset('assets/images.png'),
                    ),
                  new Container(
                    margin: EdgeInsets.only(top: 60),
                    child: new Text(
                        "on your way to knowledge, do you want to learn something new or deepen your knowledge? you are in the right place, it's here",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          fontFamily: 'open sans',
                          fontSize: 20.0,
                        ),
                    ),
                  ),
                  new Container(
                    margin: EdgeInsets.only(top: 60),
                    child: new OutlineButton(
                        onPressed: (){
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => welcome()),
                          );
                        },
                      child: new Text('GET STARTED'),
                    )
                  )
                ],
              ),
        )
    );
  }

}