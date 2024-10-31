import ReactTooltip from 'react-tooltip';

const healthPoints = 25;

const healthLevel = (points : number) => (points >= 12 ? 'bg-green-500' : points >= 6 ? 'bg-orange-500' : 'bg-red-500');
const marginIndexing = (index: number) => (index !== healthPoints - 1 ? 'mr-1' : 'mr-0');

const PlayerInfo = ({ player, playerIcon, mt }: any) => (
  <div className={`flex items-center justify-center ${mt ? 'mt-4' : 'mb-4'}`}>
    <img data-for={`Player-${mt ? '1' : '2'}`} data-tip src={playerIcon} alt="player02" className="w-14 h-14 object-contain rounded-full" />

    <div
      data-for={`Health-${mt ? '1' : '2'}`}
      data-tip={`Health: ${player.health}`}
      className='flex flex-row bg-white rounded-md p-2 sm:min-w-[512px] min-w-[312px] sm:min-h-[48px] min-h-[40px] bg-opacity-10 backdrop-filter backdrop-blur-lg mx-3'
    >
      {[...Array(player.health).keys()].map((item, index) => (
        <div
          key={`player-item-${item}`}
          className={`sm:w-4 w-2 sm:h-8 h-6 rounded-sm ${healthLevel(player.health)} ${marginIndexing(index)}`}
        />
      ))}
    </div>

    <div
      data-for={`Mana-${mt ? '1' : '2'}`}
      data-tip="Mana"
      className={`flex items-center justify-center bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 w-14 h-14 rounded-full text-white font-rajdhani font-extrabold text-2xl cursor-pointer`}
    >
      {player.mana || 0}
    </div>

    <ReactTooltip id={`Player-${mt ? '1' : '2'}`} effect="solid" backgroundColor="#7f46f0">
      <p className='font-rajdhani font-medium'>
        <span className='font-extrabold text-white'>Name:</span> {player?.playerName}
      </p>
      <p className='font-rajdhani font-medium'>
        <span className='font-extrabold text-white'>Address:</span> {player?.playerAddress?.slice(0, 10)}
      </p>
    </ReactTooltip>
    <ReactTooltip id={`Health-${mt ? '1' : '2'}`} effect="solid" backgroundColor="#7f46f0" />
    <ReactTooltip id={`Mana-${mt ? '1' : '2'}`} effect="solid" backgroundColor="#7f46f0" />
  </div>
);

export default PlayerInfo;
