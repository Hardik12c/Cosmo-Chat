import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import translate from "translate";
import Option from "./Option";
const socket = io("http://localhost:5000");

const Chat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [name, setname] = useState("");
  const [tag, settag] = useState("English");
  const [index,setindex]=useState('0')
  const arr = ["en", "hi", "es", "fr", "ar", "bn", "ne"];
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
  ];
  const onchangehandler=(e)=>{
    setindex(e.target.selectedIndex);
    settag(e.target.value)
  }
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
      changeMessage(data.name, data.message);
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

  const changeMessage = (recName, messageToChange) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const recMessage = await translate(messageToChange, arr[index]);
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
            <label htmlFor="dropmenu">Choose the language:</label>

            <select
              value={tag}
              className="form-select"
              onChange={onchangehandler}
              name="tag"
              id="dropmenu"
              aria-label="Default select example"
            >
              {category.map((item) => (
                <Option key={item.id} id={item.id} lang={item.lang} />
              ))}
            </select>
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
