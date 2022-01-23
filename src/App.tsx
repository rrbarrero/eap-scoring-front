import React, { useEffect } from "react";
import HallOfFame from "./components/HallOfFame";
import "./App.css";

const socket = new WebSocket("ws://192.168.1.151:8000/ws");

function App() {
  const [nick, setNick] = React.useState("");
  const [reto, setReto] = React.useState("");
  const [respuesta, setRespuesta] = React.useState("");
  const [jugadores, setJugadores] = React.useState<Jugador[]>([]);

  useEffect(() => {
    socket.onopen = () => {
      // setRespuesta("Connected to server");
      console.log("Connected to server");
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data !== "null") {
        setJugadores(data);
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  const handleClick = React.useCallback(
    (e) => {
      e.preventDefault();

      socket.send(
        JSON.stringify({
          nick,
          reto,
          respuesta,
        })
      );
    },
    [nick, reto, respuesta]
  );

  const handleChangeNick = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNick(e.target.value);
    },
    []
  );

  const handleChangeRespuesta = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRespuesta(e.target.value);
    },
    []
  );

  const handleChangeReto = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setReto(e.target.value);
    },
    []
  );

  return (
    <div className="App">
      <div>
        <label htmlFor="nick">Nick</label>
        <input id="nick" type="text" value={nick} onChange={handleChangeNick} />
      </div>
      <div>
        <label htmlFor="reto">Reto</label>
        <input id="reto" type="text" value={reto} onChange={handleChangeReto} />
      </div>
      <div>
        <label htmlFor="respuesta">Respuesta</label>
        <input
          id="respuesta"
          type="text"
          value={respuesta}
          onChange={handleChangeRespuesta}
        />
      </div>
      <button onClick={handleClick}>enviar</button>
      <HallOfFame players={jugadores} />
    </div>
  );
}

export default App;
