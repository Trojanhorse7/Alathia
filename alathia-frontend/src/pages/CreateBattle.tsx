import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton, CustomInput, GameLoad, PageHOC } from '../components';
import { toast } from 'sonner';

// Blockchain Imports
import { useContractWrite, usePrepareContractWrite, useAccount, useContractRead, useContractEvent } from 'wagmi'
import { abi, contractAddress } from '../contract/index.js';

const CreateBattle = () => {
  // const { contract, gameData } = useGlobalContext();
  const [battleName, setBattleName] = useState('');
  const [waitBattle, setWaitBattle] = useState(false);

  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  // Function that Require Write
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: 'createBattle',
    args: [battleName],
  })

  const { write, error, isLoading, isSuccess } = useContractWrite(config)
  
  // Function that Require Read
  const { data: isPlayer } = useContractRead({
    address: contractAddress,
    abi,
    functionName: 'isPlayer',
    args: [address],
    watch: true,
  })

  const { data: isPlayerToken } = useContractRead({
    address: contractAddress,
    abi,
    functionName: 'isPlayerToken',
    args: [address],
    watch: true,
  })

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

  const handleClick = async () => {
    if (isPlayer && isPlayerToken) {
      toast.info("Already Registered, Create Battle")
      return navigate('/create')
    }
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
      {waitBattle && <GameLoad />}

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
  );
};

export default PageHOC(
  CreateBattle,
  <>
    Create <br /> a new Battle
  </>,
  <>Create your own battle and wait for other players to join you</>,
);