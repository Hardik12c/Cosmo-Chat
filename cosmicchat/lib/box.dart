import 'package:flutter/material.dart';

// class MessageTile extends StatefulWidget {
//   final String message;
//   final String sender;
//   final bool sentByMe = true;

//   const MessageTile({
//     Key? key,
//     required this.message,
//     required this.sender,
//     // required this.sentByMe
//   }) : super(key: key);

//   @override
//   State<MessageTile> createState() => _MessageTileState();
// }

// class _MessageTileState extends State<MessageTile> {
//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       padding: EdgeInsets.only(
//           top: 4,
//           bottom: 4,
//           left: widget.sentByMe ? 0 : 24,
//           right: widget.sentByMe ? 24 : 0),
//       alignment: widget.sentByMe ? Alignment.centerRight : Alignment.centerLeft,
//       child: Container(
//         margin: widget.sentByMe
//             ? const EdgeInsets.only(left: 30)
//             : const EdgeInsets.only(right: 30),
//         padding:
//             const EdgeInsets.only(top: 17, bottom: 17, left: 20, right: 20),
//         decoration: BoxDecoration(
//             borderRadius: widget.sentByMe
//                 ? const BorderRadius.only(
//                     topLeft: Radius.circular(20),
//                     topRight: Radius.circular(20),
//                     bottomLeft: Radius.circular(20),
//                   )
//                 : const BorderRadius.only(
//                     topLeft: Radius.circular(20),
//                     topRight: Radius.circular(20),
//                     bottomRight: Radius.circular(20),
//                   ),
//             color: widget.sentByMe
//                 ? Theme.of(context).primaryColor
//                 : Colors.grey[700]),
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             Text(
//               widget.sender.toUpperCase(),
//               textAlign: TextAlign.start,
//               style: const TextStyle(
//                   fontSize: 13,
//                   fontWeight: FontWeight.bold,
//                   color: Colors.white,
//                   letterSpacing: -0.5),
//             ),
//             const SizedBox(
//               height: 8,
//             ),
//             Text(widget.message,
//                 textAlign: TextAlign.start,
//                 style: const TextStyle(fontSize: 16, color: Colors.white))
//           ],
//         ),
//       ),
//     );
//   }
// }

// class ChatStream extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return StreamBuilder(
//       stream: _firestore.collection('messages').orderBy('timestamp').snapshots(),
//       builder: (context, snapshot) {
//         if (snapshot.hasData) {
//           final messages = snapshot.data.documents.reversed;
//           List<MessageBubble> messageWidgets = [];
//           for (var message in messages) {
//             final msgText = message.data['text'];
//             final msgSender = message.data['sender'];
//             // final msgSenderEmail = message.data['senderemail'];
//             final currentUser = loggedInUser.displayName;

//             // print('MSG'+msgSender + '  CURR'+currentUser);
//             final msgBubble = MessageBubble(
//                 msgText: msgText,
//                 msgSender: msgSender,
//                 user: currentUser == msgSender);
//             messageWidgets.add(msgBubble);
//           }
//           return Expanded(
//             child: ListView(
//               reverse: true,
//               padding: EdgeInsets.symmetric(vertical: 15, horizontal: 10),
//               children: messageWidgets,
//             ),
//           );
//         } else {
//           return Center(
//             child:
//                 CircularProgressIndicator(backgroundColor: Colors.deepPurple),
//           );
//         }
//      },
// );
// }
// }

class MessageBubble extends StatelessWidget {
  final String msgText;
  final String msgSender;
  final bool user;
  const MessageBubble(
      {required this.msgText, required this.msgSender, required this.user});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(12.0),
      child: Column(
        crossAxisAlignment:
            user ? CrossAxisAlignment.end : CrossAxisAlignment.start,
        children: <Widget>[
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: Text(
              msgSender,
              style: const TextStyle(
                  fontSize: 13, fontFamily: 'Poppins', color: Colors.black87),
            ),
          ),
          Material(
            borderRadius: BorderRadius.only(
              bottomLeft: const Radius.circular(50),
              topLeft: user ? Radius.circular(50) : Radius.circular(0),
              bottomRight: const Radius.circular(50),
              topRight: user ? Radius.circular(0) : Radius.circular(50),
            ),
            color: user ? Colors.blue : Colors.white,
            elevation: 5,
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 20),
              child: Text(
                msgText,
                style: TextStyle(
                  color: user ? Colors.white : Colors.blue,
                  fontFamily: 'Poppins',
                  fontSize: 15,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
