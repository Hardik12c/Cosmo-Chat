import 'package:cosmicchat/chat.dart';
import 'package:cosmicchat/register.dart';
import 'package:cosmicchat/routes/route.dart';
import 'package:flutter/material.dart';
import 'package:cosmicchat/login.dart';

void main() {
  runApp(const Myapp());
}


class Myapp extends StatelessWidget {
  const Myapp({super.key});

  @override
  Widget build(BuildContext context) {
    return  MaterialApp(
      title: 'Login',
      home: const RegisterPage(),
      // initialRoute: registerRoute,
      routes: {
      loginRoute: (context) => const LoginPage(),
      registerRoute: (context) => const RegisterPage(),
      chatRoute: (context) => const ChatPage(),
    },
    );
  }
}



