import 'package:adopt_student/welcome/tableau_de_bord.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';


class chose extends StatelessWidget{
  @override
  Widget build(BuildContext context) {

    return choose();
  }
}

class choose extends StatefulWidget{
  @override
  State<StatefulWidget> createState(){
    return _choose();
  }
}

class _choose extends State<choose>{
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
                child: new Image.asset('assets/choose.png'),
              ),
              new Container(
                margin: EdgeInsets.only(top: 60),
                child: new Text(
                  "Are you Student Or Teacher ? ",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontFamily: 'open sans',
                    fontSize: 20.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              new Container(
                margin: EdgeInsets.only(top: 50),
                child: new OutlineButton(
                  shape: new RoundedRectangleBorder(borderRadius: new BorderRadius.circular(30.0)),
                  onPressed: (){
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => dashtabs()),
                    );
                  },
                  child: new Text(
                      'STUDENT',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                  ),
                ),
              ),
              new Container(
                margin: EdgeInsets.only(top: 20),
                child: new OutlineButton(
                  shape: new RoundedRectangleBorder(borderRadius: new BorderRadius.circular(30.0)),
                  onPressed: (){
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => dashtabs()),
                    );
                  },
                  child: new Text(
                      'TEACHER',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                ),
              )
            ],
          ),
        ),
    );
  }
}