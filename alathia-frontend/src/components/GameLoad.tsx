import { useNavigate } from 'react-router-dom';
import CustomButton from './CustomButton';
import { player01, player02 } from '../assets';
import { useAccount } from 'wagmi'

const GameLoad = () => {
  const navigate = useNavigate();
  const { address } = useAccount();

  return (
    <div className={`flex justify-between items-center inset-0 z-10 w-full h-screen gameload flex-col`}>
      <div className='w-full flex justify-end px-8'>
        <CustomButton
          title="Choose Battleground"
          handleClick={() => navigate('/battleground')}
        />
      </div>

      <div className={`flex-1 flex items-center justify-center flex-col`}>
        <h1 className={`font-rajdhani font-bold text-white sm:text-6xl text-4xl text-center`}>
          Waiting for a <br /> worthy opponent...
        </h1>
        <p className='font-rajdhani text-siteWhite text-2xl mt-5 text-center'>
          Tip: while you're waiting, choose your preferred battleground
        </p>

        <div className='flex justify-evenly items-center mt-20'>
          <div className={`flex items-center justify-center flex-col`}>
            <img src={player01} className='md:w-36 w-24 md:h-36 h-24 object-contain rounded-full drop-shadow-lg' />
            <p className='mt-3 font-rajdhani text-white md:text-xl text-base'>
              {address && address.slice(0, 30)}
            </p>
          </div>

          <h2 className='font-rajdhani font-extrabold text-siteViolet text-7xl mx-16'>Vs</h2>

          <div className={`flex items-center justify-center flex-col`}>
            <img src={player02} className='md:w-36 w-24 md:h-36 h-24 object-contain rounded-full drop-shadow-lg' />
            <p className='mt-3 font-rajdhani text-white md:text-xl text-base'>???????</p>
          </div>
        </div>

        <div className="mt-10">
          <p className={`font-rajdhani font-medium text-lg text-siteViolet cursor-pointer text-center mb-5`}>OR</p>

          <CustomButton
            title="Join other battles"
            handleClick={() => navigate('/join')}
          />
        </div>
      </div>
    </div>
  );
};

export default GameLoad;
