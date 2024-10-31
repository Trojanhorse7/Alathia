import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { battlegrounds } from '../assets';

//Blockchain
import { useGlobalContext } from '../store';

const Battleground = () => {
  const navigate = useNavigate();
  const { setBattleGround } = useGlobalContext();

  const handleBattleChoice = (ground: any) => {
    setBattleGround(ground.id);

    localStorage.setItem('battleground', ground.id);
    toast.info(`${ground.name} is battle ready!`);

    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  return (
    <div className={`flex items-center justify-center min-h-screen bg-landing flex-col py-12 px-4`}>

      <h1 className={`font-rajdhani font-bold text-white sm:text-6xl text-4xl text-center`}>
        Choose your
        <span className='text-siteViolet'> Battle </span>
        Ground
      </h1>

      <div className={`flex items-center justify-center flex-wrap mt-10 max-w-[1200px]`}>
        {battlegrounds.map((ground) => (
          <div
            key={ground.id}
            className={`flex items-center justify-center sm:w-[420px] w-full h-[260px] p-2 glass-morphism m-4 rounded-lg cursor-pointer battle-card`}
            onClick={() => handleBattleChoice(ground)}
          >
            <img src={ground.image} alt='saiman' className='w-full h-full object-cover rounded-md' />
            <div className='info absolute'>
              <p className='font-rajdhani font-semibold text-2xl text-white'>{ground.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Battleground;
