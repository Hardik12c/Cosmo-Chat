require("dotenv").config();
const connectToMongo = require("./Db/db");
const express = require("express");
const auth = require("./routes/auth");
const Messages = require("./routes/Messages");
var cors = require("cors");
const User = require('./models/User');


const port = process.env.PORT || 3000;

const app = express();


const http=require('http').Server(app);

// middleware

const fetchUser=require('./middleware/fetchuser')
app.use(cors());
app.use(express.json());


const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
  }
});
io.on('connection', socket=>{
console.log("backend connected")
      socket.on('send', async(data)=>{
        const user = await User.findById(data.id);
        if(user)
        {
          socket.broadcast.emit('recieve', {message: data.message, name: user.name})
        }
        else
        {
          console.log("User is null");
        }
    });
});
  

// Available Routes
app.use("/api/auth", auth);
app.use("/api/messages",fetchUser,Messages)
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
