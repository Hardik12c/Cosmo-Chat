import 'dart:convert';

import 'package:cosmicchat/routes/route.dart';
import 'package:cosmicchat/textbox.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
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
        title: const Text("Register Page"),
      ),
      body: SafeArea(
          child: ListView(
        children: <Widget>[
          Column(
            children: const <Widget>[
              // const SizedBox(height: 120,),
              // Image.asset("assets/tshirt.jpeg"),
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
            height: 30,
          ),
          MyTextField(
            controller: _name,
            hintText: "Name",
            obscureText: false,
          ),
          const SizedBox(
            height: 10.0,
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
            height: 10.0,
          ),
          TextButton(
            onPressed: () async {
              final name = _name.text;
              final email = _email.text;
              final password = _password.text;

              try {
                var url = Uri.parse(
                    "https://inotebook-backend-d9ht.onrender.com/api/v1/auth/register/");
                var response = await http.post(
                  url,
                  body: jsonEncode(<String, String>{
                    'name': name,
                    'email': email,
                    'password': password,
                  }),
                );
                print('Response : $name');
                var responseJson = jsonDecode(response.body);
                var responseName = responseJson['name'];
                print(responseJson);
                print('Response : ${response}');
              } catch (e) {
                print(e);
              }
            },
            child: const Text("Register"),
          ),
          Column(
            children: <Widget>[
              ButtonTheme(
                  // height: 10,
                  disabledColor: Colors.blue,
                  child: TextButton(
                      onPressed: () {
                        Navigator.of(context).pushNamedAndRemoveUntil(
                            loginRoute, (route) => false);
                      },
                      child: const Text("Have an account? Login Here")))
            ],
          )
        ],
      )),
    );
  }
}
