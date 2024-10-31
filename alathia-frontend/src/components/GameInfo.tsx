import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import CustomButton from './CustomButton';
import { alertIcon, gameRules } from '../assets';

//Blockchain
import { useContractWrite, usePrepareContractWrite, useAccount } from 'wagmi'
import { abi, contractAddress } from '../contract/index.js';
import { useGlobalContext } from '../store';

const GameInfo = () => {
  const { gameData } = useGlobalContext();
  const { isConnected } = useAccount();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const navigate = useNavigate();

   // Function that Require Write
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: 'quitBattle',
    args: [gameData.activeBattle.name],
  })

  const { write, error } = useContractWrite(config)

  // Reject Error Display
  useEffect(() => {
    if (error) {
      if (error?.message.includes("User denied transaction")) {
        toast.error("User denied the transaction.");
      } else if (error.message.includes("insufficient funds")) {
        toast.error("Insufficient funds to complete the transaction.");
      } else {
        toast.error(error.message)
      }
    }
  }, [error])

  const handleBattleExit = async () => {
    try {
      if (isConnected) {
        write?.()
        toast.success(`You're quitting the ${gameData.activeBattle.name}`)
      } else {
        toast.error("Account Not Connected.")
      }
    } catch(error: any) {
      toast.error(error?.message)
    }
  };

  return (
    <>
      <div className='absolute right-2 top-1/2'>
        <div
          className={`bg-siteViolet w-10 h-10 rounded-md cursor-pointer flex items-center justify-center`}
          onClick={() => setToggleSidebar(true)}
        >
          <img
            src={alertIcon}
            alt="info"
            className='w-3/5 h-3/5 object-contain invert'
          />
        </div>
      </div>

      <div className={`absolute p-6 right-0 top-0 h-screen rounded-md flex-col transition-all ease-in duration-300 ${toggleSidebar ? 'translate-x-0' : 'translate-x-full'} bg-siteViolet backdrop-filter backdrop-blur-lg bg-opacity-40 flex justify-between items-center `}>
        <div className="flex flex-col">
          <div className='flex justify-end mb-8'>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-md bg-siteViolet text-white font-rajdhani font-extrabold text-xl cursor-pointer`}
              onClick={() => setToggleSidebar(false)}
            >
              X
            </div>
          </div>

          <h3 className='font-rajdhani font-bold text-white text-3xl'>Game Rules:</h3>

          <div className="mt-3">
            {gameRules.map((rule, index) => (
              <p key={`game-rule-${index}`} className='font-rajdhani font-medium text-white text-xl mb-2'>
                <span className="font-bold">{index + 1}</span>. {rule}
              </p>
            ))}
          </div>
        </div>

        <div className={`flex justify-between items-center mt-10 gap-4 w-full`}>
          <CustomButton title="Change Battleground" handleClick={() => navigate('/battleground')} />
          <CustomButton title="Exit Battle" handleClick={() => handleBattleExit()} />
        </div>
      </div>
    </>
  );
};

export default GameInfo;
