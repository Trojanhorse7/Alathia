import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CustomButton, CustomInput, PageHOC } from '../components';

// Blockchain
import { useContractWrite, usePrepareContractWrite, useAccount, useContractRead } from 'wagmi'
import { abi, contractAddress } from '../contract/index.js';
import { useGlobalContext } from '../store';

const RegisterPlayer = () => {
  // States
  const { gameData } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  // Prepare write configuration for registering a player
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: 'registerPlayer',
    enabled: playerName !== '',
    args: [playerName, playerName],
  })

  // Execute contract write
  const { write, error, isLoading } = useContractWrite(config)
  
  // Read if the address is a player
  const { data: isPlayer } = useContractRead({
    address: contractAddress,
    abi,
    functionName: 'isPlayer',
    args: [address],
    watch: true,
  })

  // Read if the address has a player token
  const { data: isPlayerToken } = useContractRead({
    address: contractAddress,
    abi,
    functionName: 'isPlayerToken',
    args: [address],
    watch: true,
  })

  // Display error messages
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

  // Handle register button click
  const handleClick = async () => {
    if (isPlayer && isPlayerToken) {
      toast.info("Already Registered, Create Battle")
      return navigate('/create')
    }
    try {
      if (playerName !== '') {
        if (isConnected) {
          write?.()
          setPlayerName('')
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

  // Navigate to active battle if it exists
  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    } else {
    }
  }, [gameData]);

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
        loading={isLoading}
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