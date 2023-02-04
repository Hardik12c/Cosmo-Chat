import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import translate from "translate";
const socket = io("http://localhost:5000");

const Chat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [name, setname] = useState("");

  const fetchdata = () => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const { data } = await axios.post(
            "http://localhost:5000/api/auth/getuser",
            {},
            {
              headers: {
                Authorization: `${localStorage.getItem("token")}`,
              },
            }
          );
          setname(data.name);
          resolve(data.name);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      })();
    });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchdata();
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    // console.log(name);
    if (name) {
      socket.emit("new-user-joined", name);
    }
  }, [name]);

  useEffect(() => {
    socket.on("user-joined", (newName) => {
      setMessages([
        ...messages,
        { text: `${newName} joined the chat`, position: "left" },
      ]);
    });

    socket.on("recieve", (data) => {
      changeMessage(data.name,data.message);
      // setMessages([
      //   ...messages,
      //   { text: `${data.name}: ${recMessage}`, position: "left" },
      // ]);
      // setRecMessage("");
    });

    socket.on("leave", (leaveName) => {
      setMessages([
        ...messages,
        { text: `${leaveName} has left the chat`, position: "left" },
      ]);
    });

    return () => {
      socket.off("user-joined");
      socket.off("recieve");
      socket.off("leave");
    };
  }, [messages]);
 
  const changeMessage = (recName,messageToChange) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const recMessage = await translate(messageToChange, "es");
          setMessages([
            ...messages,
            { text: `${recName}: ${recMessage}`, position: "left" },
          ]);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      })();
    });
  };

  // const submitForm = async(event) => {
  //   event.preventDefault();
  //   socket.emit("send", message);
  //   // const text = await translate(message, "es");
  //   // setMessage(text);
  //   changeMessage();
  //   console.log(message);
  //   setMessages([...messages, { text: `You: ${message}`, position: "right" }]);
  //   setMessage("");
  // };

  const submitForm = (event) => {
    event.preventDefault();
    setMessages([...messages, { text: `You: ${message}`, position: "right" }]);
    // console.log(name);
    socket.emit("send", message);
    setMessage("");
  };

  return (
    <>
      <div className="container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.position}`}>
            {message.text}
          </div>
        ))}
        <div className="send">
          <form action="/" onSubmit={submitForm}>
            <input
              type="text"
              name="messageInp"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button type="submit" className="btn">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
