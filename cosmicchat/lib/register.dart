import 'dart:convert';
import 'dart:io';
import 'package:cosmicchat/error.dart';
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
                await register(name, email, password);
                Navigator.of(context)
                    .pushNamedAndRemoveUntil(chatRoute, (route) => false);
              } catch (e) {
                showErrorDialog(context, "Unable to register");
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

Future<void> register(String name, String email, String password) async {
  String url1 =
      Platform.isAndroid ? 'http://10.12.52.152:5000' : 'http://localhost:5000';
  final response = await http.post(
    Uri.parse('$url1/api/auth/register'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({'name': name, 'email': email, 'password': password}),
  );

  final responseData = jsonDecode(response.body);
  // print(responseData['success']);

  if (responseData['success']) {
  } else {
    // Handle the error
    throw Exception('Failed to register: ${responseData['message']}');
  }
}
