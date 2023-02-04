import 'package:cosmicchat/routes/route.dart';
import 'package:cosmicchat/textbox.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  late final TextEditingController _email;
  late final TextEditingController _password;
  late final TextEditingController _name;

  @override
  void initState() {
    _name = TextEditingController();
    _email = TextEditingController();
    _password = TextEditingController();
    super.initState();
  }

  @override
  void dispose() {
    _name.dispose();
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Login Page"),
      ),
      body: SafeArea(
          child: ListView(
        children: <Widget>[
          Column(
            children: const <Widget>[
              // const SizedBox(height: 120,),
              SizedBox(
                height: 30,
              ),
              Text(
                "Cosmic Chat",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 25,
                  color: Color.fromARGB(255, 0, 145, 255),
                ),
              ),
            ],
          ),
          const SizedBox(
            height: 30.0,
          ),
          MyTextField(
            controller: _email,
            hintText: "Email",
            obscureText: false,
          ),
          const SizedBox(
            height: 10.0,
          ),
          MyTextField(
            controller: _password,
            hintText: "Password",
            obscureText: true,
          ),
          const SizedBox(
            height: 30.0,
          ),
          TextButton(
              onPressed: () {
                Navigator.of(context)
                    .pushNamedAndRemoveUntil(chatRoute, (route) => false);
              },
              child: const Text("Login")),
          // Column(
          //   children: <Widget>[
          ButtonTheme(
              // height: 10,
              disabledColor: Colors.blue,
              child: TextButton(
                  onPressed: () {
                    Navigator.of(context).pushNamedAndRemoveUntil(
                        registerRoute, (route) => false);
                  },
                  child: Text("Register Here")))
          //   ],
          // )
        ],
      )),
    );
  }
}
