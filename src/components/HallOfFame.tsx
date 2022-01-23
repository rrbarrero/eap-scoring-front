import img1 from "../assets/avatars/1.jpg";
import img2 from "../assets/avatars/2.jpg";
import img3 from "../assets/avatars/3.jpg";

type HallProps = { players: Jugador[] };

const images = () => [img1, img2, img3];

const HallOfFame = ({ players }: HallProps) => {
  return (
    <div id="hall-of-fame">
      <h1 className="text-2xl font-bold underline">Ranking</h1>
      {players &&
        players.map((player, i) => (
          <div
            className="hallOfFame-player"
            key={i}
            style={{ marginLeft: `${player.puntos * 100}px` }}
          >
            <div
              className="story-ring flex justify-start items-start
                                rounded-full relative cursor-pointer
                                hover:from-orange-300 hover:to-red-400
                                transition-all duration-150 delay-100"
            >
              <a className="block bg-white p-1 rounded-full" href="/">
                <img
                  className="w-32 rounded-full"
                  src={images()[i]}
                  alt={`avatar-n-${i}`}
                />
                {player.nick}
              </a>

              <button
                className="absolute transition duration-500 bg-white border-gray-400 
                                    h-8 w-8 rounded-full text-white border-2 
                                    border-white flex justify-start items-start opacity-80
                                    hover:opacity-60"
              ></button>

              <i className="absolute mdi mdi-plus mdi-18px mx-1 text-gray-500"></i>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HallOfFame;
