import 'package:flutter/material.dart';

class MyTextField extends StatelessWidget {
  final controller;
  final String hintText;
  final bool obscureText;

  const MyTextField({
    super.key,
    required this.controller,
    required this.hintText,
    required this.obscureText,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 25, vertical: 0),
      child: TextField(
        controller: controller,
        obscureText: obscureText,
        decoration:  InputDecoration(
          contentPadding: const EdgeInsets.symmetric(horizontal:15, vertical:0),
            enabledBorder:   OutlineInputBorder(
              borderSide: const BorderSide(color: Color.fromARGB(255, 0, 183, 255)),
              borderRadius: BorderRadius.circular(12),
            ),
            focusedBorder:  OutlineInputBorder(
              borderSide: const BorderSide(color: Color.fromARGB(255, 0, 183, 255)),
              borderRadius: BorderRadius.circular(12),
            ),
            fillColor: const Color.fromARGB(255, 255, 255, 255),
            filled: true,
            hintText: hintText,
            hintStyle: const TextStyle(
                color: Color.fromARGB(255, 0, 0, 0),
                fontWeight: FontWeight.w400)),
     ),
);
}
}