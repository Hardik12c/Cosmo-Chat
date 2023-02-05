import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Error from "./components/Error";
import Alert from "./components/Alert";
import { useState } from "react";
import Chat from "./components/Chat";
function App() {
  const [alert, setalert] = useState(null);
  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 2000);
  };
  return (
    <>
      <Router>
        <Alert alert={alert} />
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/login" element={<Login showalert={showalert} />} />
          <Route path="/signup" element={<Signup showalert={showalert} />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
