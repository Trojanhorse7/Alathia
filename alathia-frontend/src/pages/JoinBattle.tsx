import  { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton, PageHOC } from '../components';
import { toast } from 'sonner';

// Blockchain Imports
import { useContractWrite, usePrepareContractWrite, useAccount } from 'wagmi'
import { abi, contractAddress } from '../contract/index.js';
import { useGlobalContext } from '../store';

const JoinBattle = () => {
  const navigate = useNavigate();
  const { gameData } =  useGlobalContext();
  const { address, isConnected } = useAccount();
  const [joinBattleName, setJoinBattleName] = useState<string | undefined>();

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1) navigate(`/battle/${gameData.activeBattle.name}`);
  }, [gameData]);
    
   // Prepare contract write for move made
  const { config, isLoading: configLoading } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: 'joinBattle',
    args: [joinBattleName],
    enabled: joinBattleName !== undefined,
    onError(error) {
      if (error?.message.includes("You have already made a move!")) {
        toast.error("You have already made a move!");
      } else {
        // toast.error('Error Occured!')
      }
    },
    onSuccess () {
      handleClick();
    }
  });

  const { write, isLoading } = useContractWrite({
    ...config,
    onError(error) {
      console.error('Contract call error:', error);
      if (error?.message.includes("User denied transaction")) {
        toast.error("User denied the transaction.");
      } else if (error.message.includes("insufficient funds")) {
        toast.error("Insufficient funds to complete the transaction.");
      } else {
        toast.error('Error Occured!')
      }
    },
    onSettled() {
      setJoinBattleName(undefined);
    }
  });

  const handleClick = () => {
    try {
      if (isConnected) {
        if (write) {
          write();
        }
      } else {
        toast.error("Account Not Connected.")
      }
    } catch(error: any) {
      toast.error(error?.message)
    }
  };

  return (
    <>
      <h2 className='font-rajdhani font-semibold text-2xl text-white mb-3'>Available Battles List:</h2>

      <div className='flex flex-col gap-3 mt-3 mb-5'>
        {gameData.pendingBattles.length ? (
          gameData.pendingBattles
            .filter((battle : any) => !battle.players.includes(address) && battle.battleStatus !== 1)
            .map((battle : any, index: any) => (
              <div key={battle.name + index} className='flex justify-between items-center'>
                <p className='font-rajdhani font-normal text-xl text-white'>
                  {index + 1}. {battle.name}
                </p>
                <CustomButton title='Join' loading={configLoading || isLoading} handleClick={
                  () => {setJoinBattleName(battle.name)}} />
              </div>
            ))
        ) : (
          <p className='font-rajdhani font-normal text-xl text-white'>Reload the page to see new battles</p>
        )}
      </div>

      <p className='font-rajdhani font-medium text-lg text-siteViolet cursor-pointer' onClick={() => navigate('/create')}>
        Or create a new battle
      </p>
    </>
  );
};

export default PageHOC(
  JoinBattle,
  <>
    Join <br /> a Battle
  </>,
  <>Join already existing battles</>,
);
