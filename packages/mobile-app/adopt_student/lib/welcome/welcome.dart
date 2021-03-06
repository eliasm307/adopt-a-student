import 'package:flutter/material.dart';
import 'package:adopt_student/welcome/items.dart';
import 'package:flutter/rendering.dart';
import 'package:adopt_student/welcome/choose.dart';

class welcome extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return WelcomeScreen();
  }
}


class WelcomeScreen extends StatefulWidget {
  @override   _WelcomeScreen createState() {
    return _WelcomeScreen();
  }
}

class _WelcomeScreen extends State<WelcomeScreen> {

  List<Widget> slides = items
      .map((item) => Container(
      padding: EdgeInsets.symmetric(horizontal: 18.0),
      child: Column(
        children: <Widget>[
          Flexible(
            flex: 1,
            fit: FlexFit.tight,
            child: Image.asset(
              item['image'],
              fit: BoxFit.fitWidth,
              width: 300.0,
              alignment: Alignment.bottomCenter,
            ),
          ),
          Flexible(
            flex: 1,
            fit: FlexFit.tight,
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 30.0),
              child: Column(
                children: <Widget>[
                  Text(item['header'],
                      style: TextStyle(
                          fontSize: 50.0,
                          fontWeight: FontWeight.w300,
                          color: Color(0XFF3F3D56),
                          height: 2.0)),
                  Text(
                    item['description'],
                    style: TextStyle(
                        color: Colors.grey,
                        letterSpacing: 1.2,
                        fontSize: 16.0,
                        height: 1.3),
                    textAlign: TextAlign.center,
                  )
                ],
              ),
            ),
          ),
          ],
      )))
      .toList();
  double currentPage = 0.0;
  final _pageViewController = new PageController();

  List<Widget> indicator() => List<Widget>.generate(
      slides.length,
          (index) => Container(
        margin: EdgeInsets.symmetric(horizontal: 3.0),
        height: 10.0,
        width: 10.0,
        decoration: BoxDecoration(
            color: currentPage.round() == index
                ? Color(0XFF256075)
                : Color(0XFF256075).withOpacity(0.2),
            borderRadius: BorderRadius.circular(10.0)),
      ));
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: Stack(
          children: <Widget>[
            PageView.builder(
              controller: _pageViewController,
              itemCount: slides.length,
              itemBuilder: (BuildContext context, int index) {
                _pageViewController.addListener(() {
                  setState(() {
                    currentPage = _pageViewController.page;
                  });
                });
                return slides[index];
              },
            ),
            Align(
                alignment: Alignment.bottomCenter,
                child: Container(
                  margin: EdgeInsets.only(top: 70.0),
                  padding: EdgeInsets.symmetric(vertical: 40.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: indicator(),
                  ),
                )
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                margin: EdgeInsets.only(top: 50.0),
                padding: EdgeInsets.symmetric(vertical: 100.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    OutlineButton(
                      shape: new RoundedRectangleBorder(borderRadius: new BorderRadius.circular(30.0)),
                        onPressed: (){
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => choose()),
                          );
                        },
                        child: new Text(
                            'Skip',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                    )
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}

