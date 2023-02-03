require("dotenv").config();
const connectToMongo = require("./Db/db");
const express = require("express");
const auth = require("./routes/auth");
var cors = require("cors");

const port = process.env.PORT || 3000;

const app = express();


const http=require('http').Server(app);


app.use(cors());
app.use(express.json());


const users={}
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
  }
});
io.on('connection', socket=>{
console.log("backend connected")
socket.on('new-user-joined', name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
      });
      socket.on('send', message=>{
      socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
    });
    socket.on('disconnect', message=>{
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });
});
  

// Available Routes
app.use("/api/auth", auth);

const start = async () => {
  try {
    await connectToMongo(process.env.connectionstring);
    http.listen(port, () =>
      console.log(`app listening on port http://localhost:${port}/`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
