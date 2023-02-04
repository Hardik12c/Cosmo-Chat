import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
    console.log(name);
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
      setMessages([
        ...messages,
        { text: `${data.name}: ${data.message}`, position: "left" },
      ]);
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

  const submitForm = (event) => {
    event.preventDefault();
    setMessages([...messages, { text: `You: ${message}`, position: "right" }]);
    console.log(name);
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
