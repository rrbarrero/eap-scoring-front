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
      <div className="flex justify-center items-center">
        <form className="w-full lg:w-3/12 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h3 className="text-3xl">Envía tu respuestas</h3>
          <div className="mb-5">
            <label
              className="block mb-1 text-gray-600 font-semibold"
              htmlFor="nick"
            >
              Nick
            </label>
            <input
              className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
              id="nick"
              type="text"
              value={nick}
              onChange={handleChangeNick}
            />
          </div>
          <div className="mb-5">
            <label
              className="block mb-1 text-gray-600 font-semibold"
              htmlFor="reto"
            >
              Código del reto
            </label>
            <input
              className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
              id="reto"
              type="text"
              value={reto}
              onChange={handleChangeReto}
            />
          </div>
          <div className="mb-5">
            <label
              className="block mb-1 text-gray-600 font-semibold"
              htmlFor="respuesta"
            >
              Respuesta
            </label>
            <input
              className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
              id="respuesta"
              type="text"
              value={respuesta}
              onChange={handleChangeRespuesta}
            />
          </div>
          <button onClick={handleClick}>enviar</button>
        </form>
      </div>
      <HallOfFame players={jugadores} />
    </div>
  );
}

export default App;
