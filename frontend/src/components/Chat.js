// import "./App.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import translate from "translate";
import Option from "./Option";
import { IoSend } from "react-icons/io5";
import Header from "./Header";
const socket = io("https://cosmochat-backend.onrender.com",{
  transports: ["websocket"]
});
let ind = 0;
const Chat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [tag, settag] = useState("English");
  const [id, setId] = useState();
  const arr = [
    "en",
    "hi",
    "es",
    "fr",
    "ar",
    "bn",
    "ne",
    "de",
    "el",
    "gu",
    "ja",
    "ko",
  ];
  const category = [
    {
      id: 0,
      lang: "English",
    },
    { id: 1, lang: "Hindi" },
    { id: 2, lang: "Spanish" },
    { id: 3, lang: "French" },
    { id: 4, lang: "Arabic" },
    { id: 5, lang: "Bengali" },
    { id: 6, lang: "Nepali" },
    { id: 7, lang: "German" },
    { id: 8, lang: "Greek" },
    { id: 9, lang: "Gujarati" },
    { id: 10, lang: "Japanese" },
    { id: 11, lang: "Korean" },
  ];

  const onchangehandler = (e) => {
    ind = e.target.selectedIndex;
    settag(e.target.value);
  };

  const fetchdata = () => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const { data } = await axios.post(
            "https://cosmochat-backend.onrender.com/api/auth/getuser",
            {},
            {
              headers: {
                Authorization: `${localStorage.getItem("token")}`,
              },
            }
          );
          setId(data._id);
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
    socket.on("recieve", (data) => {
      changeMessage(data.name, data.message);
    });
    return () => {
      socket.off("recieve");
    };
  }, [messages]);

  const changeMessage = (recName, messageToChange) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const recMessage = await translate(messageToChange, arr[ind]);
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

  const submitForm = (event) => {
    event.preventDefault();
    setMessages([...messages, { text: `You: ${message}`, position: "right" }]);
    fetchdata();
    socket.emit("send", { message: message, id: id });
    setMessage("");
  };

  return (
    <>
      <Header />
      <div className="main">
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
                id="messageInp"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
              <select
                value={tag}
                onChange={onchangehandler}
                name="tag"
                id="dropmenu"
                aria-label="Default select example"
              >
                {category.map((item) => (
                  <Option key={item.id} id={item.id} lang={item.lang} />
                ))}
              </select>
              <button className="butn" type="submit">
                <IoSend className="icon" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
