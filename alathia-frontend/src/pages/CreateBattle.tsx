import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton, CustomInput, GameLoad, PageHOC } from '../components';
import { toast } from 'sonner';

// Blockchain Imports
import { useContractWrite, usePrepareContractWrite, useAccount, useContractEvent } from 'wagmi'
import { abi, contractAddress } from '../contract/index.js';
import { useGlobalContext } from '../store';

const CreateBattle = () => {
  const { gameData, battleName, setBattleName } = useGlobalContext();
  const [waitBattle, setWaitBattle] = useState(false);
  const navigate = useNavigate();
  const { isConnected } = useAccount();

  // Function that Require Write
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: 'createBattle',
    args: [battleName],
  })

  const { write, error, isLoading, isSuccess } = useContractWrite(config)
  
  useContractEvent({
    address: contractAddress,
    abi,
    eventName: 'NewPlayer',
    listener(log) {
      console.log(log)
    },
})

  // Error Display
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

  useEffect(() => {
    if (isSuccess) {
      setWaitBattle(true);
    }
  }, [isSuccess])

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    } else if (gameData?.activeBattle?.battleStatus === 0) {
      setWaitBattle(true);
    }
  }, [gameData]);

  const handleClick = async () => {
    try {
      if (battleName !== '') {
        if (isConnected) {
          write?.()
        } else {
          toast.error("Account Not Connected.")
        }
      } else {
        toast.error("Input Player Name")
      }
    } catch(error: any) {
      toast.error(error?.message)
    }
  };

  return (
    <>
      { waitBattle 
      
        ? <GameLoad />
        : <>
            <div className='mb-5 flex flex-col'>
              <CustomInput
                label='Battle'
                placeHolder='Enter battle name'
                value={battleName}
                handleValueChange={setBattleName}
              />
              <CustomButton
              title="Register"
              handleClick={handleClick}
              disabled={isLoading || isSuccess}
            />
            </div>
            <p className='font-rajdhani font-medium text-lg text-siteViolet cursor-pointer' onClick={() => navigate('/join')}>
              Or join already existing battles
            </p>
          </>
      }
    </>
  );
};

export default PageHOC(
  CreateBattle,
  <>
    Create <br /> a new Battle
  </>,
  <>Create your own battle and wait for other players to join you</>,
);