import 'dart:convert';
import 'dart:io';
import 'package:cosmicchat/error.dart';
import 'package:http/http.dart' as http;
import 'package:cosmicchat/routes/route.dart';
import 'package:cosmicchat/textbox.dart';
import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  late final TextEditingController _email;
  late final TextEditingController _password;

  @override
  void initState() {
    _email = TextEditingController();
    _password = TextEditingController();
    super.initState();
  }

  @override
  void dispose() {
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
              onPressed: () async {
                try {
                  final String email = _email.text;
                  final String password = _password.text;
                  await login(email, password);
                  Navigator.of(context)
                      .pushNamedAndRemoveUntil(chatRoute, (route) => false);
                } catch (e) {
                  showErrorDialog(context, "Invalid Credentials");
                }
              },
              child: const Text("Login")),
          // Column(
          //   children: <Widget>[
          ButtonTheme(
              // height: 10,
              disabledColor: Colors.blue,
              child: TextButton(
                  onPressed: () async {
                    Navigator.of(context).pushNamedAndRemoveUntil(
                        registerRoute, (route) => false);
                  },
                  child: const Text("Register Here")))
          //   ],
          // )
        ],
      )),
    );
  }
}

Future<void> login(String email, String password) async {
  String url1 =
      Platform.isAndroid ? 'http://10.12.52.152:5000' : 'http://localhost:5000';
  final response = await http.post(
    Uri.parse('$url1/api/auth/login'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({'email': email, 'password': password}),
  );

  final responseData = jsonDecode(response.body);
  print(responseData['token']);

  if (responseData['success']) {
  } else {
    // Handle the error
    throw Exception('Failed to login: ${responseData['message']}');
  }
}
