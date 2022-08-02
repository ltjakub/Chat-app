import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import DisplayMessage from "./Components/DisplayMessage";
import "./App.css";
const socket = io("http://localhost:5000");

function App() {
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [room, setRoom] = useState("");

  socket.on("received", (res) => {
    setMessages([...messages, res]);
  });
  socket.on("received-room", (res, receivedRoom) => {
    if (receivedRoom === room) {
      setMessages([...messages, res]);
    }
  });
  const handleSend = () => {
    const date =
      new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
    socket.emit("newMessage", { userName, id: socket.id, input, date }, room);
    setMessages([...messages, { userName, id: socket.id, input, date }]);
    setInput("");
  };

  return (
    <div className="App">
      <p>Username:</p>
      <input
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      ></input>
      <div
        className="msg-window"
        style={{
          height: "200px",
          border: "2px solid black",
          width: "50%",
          margin: "auto",
          marginBottom: 20,
          overflow: "scroll",
        }}
      >
        <DisplayMessage messages={messages} />
      </div>
      <div className="buttons">
        <input value={input} onChange={(e) => setInput(e.target.value)}></input>
        <button onClick={handleSend}>Send Message</button>
        <p>Set your room:</p>
        <input value={room} onChange={(e) => setRoom(e.target.value)}></input>
      </div>
    </div>
  );
}

export default App;
