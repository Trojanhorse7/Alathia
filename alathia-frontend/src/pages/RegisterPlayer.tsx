import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CustomButton, CustomInput, PageHOC } from '../components';

//Blockchain
import { useContractWrite, usePrepareContractWrite, useAccount, useContractRead, useContractEvent } from 'wagmi'
import { abi, contractAddress } from '../contract/index.js';

const RegisterPlayer = () => {
  // const { contract, gameData } = useGlobalStore();
  
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  // Function that Require Write
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: 'registerPlayer',
    args: [playerName, playerName],
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

  const handleClick = async () => {
    if (isPlayer && isPlayerToken) {
      toast.info("Already Registered, Create Battle")
      return navigate('/create')
    }
    try {
      if (playerName !== '') {
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

  // useEffect(() => {
  //   if (gameData.activeBattle) {
  //     navigate(`/battle/${gameData.activeBattle.name}`);
  //   }
  // }, [gameData]);

  return (
    <div className="flex flex-col">
      <CustomInput
        label="Player Name"
        placeHolder="Enter your player name"
        value={playerName}
        handleValueChange={setPlayerName}
      />
      <CustomButton
        title="Register"
        handleClick={handleClick}
        disabled={isLoading || isSuccess}
      />
    </div>
  );
};

export default PageHOC(
  RegisterPlayer,
  <div>
    Welcome to <span className='text-gold10'>Alathia</span> <br /> Battle Of The Gods
  </div>,
  <>
    Connect your wallet to start playing <br /> the ultimate Web3 Battle Card
    Game
  </>,
);
