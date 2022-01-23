type HallProps = { players: Jugador[] };

const HallOfFame = ({ players }: HallProps) => {
  console.log(players);
  return (
    <div className="hallOfFame">
      <h1>Hall of Fame</h1>
      {players &&
        players.map((player, i) => (
          <div className="hallOfFame-player" key={i}>
            <div className="hallOfFame-player-name">Nick: {player.nick}</div>
            <div className="hallOfFame-player-score">
              Puntos: {player.puntos}
            </div>
          </div>
        ))}
    </div>
  );
};

export default HallOfFame;
