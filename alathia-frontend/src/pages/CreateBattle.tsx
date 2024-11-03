import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton, CustomInput, GameLoad, PageHOC } from '../components';
import { toast } from 'sonner';

// Blockchain Imports
import { useContractWrite, usePrepareContractWrite, useAccount } from 'wagmi'
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
    onError(error) {
      if (error?.message.includes("Please Register Player First")) {
        toast.error("Please Register Player First");
        navigate('/register');
      } else if (error?.message.includes("Battle already exists!")) {
        toast.error("BattleName Already Exist, Use Another.");
      } else {
        toast.error('Error Occured!')
      }
      // console.log(error)
    }
  })

  const { write, error, isLoading, isSuccess } = useContractWrite(config)

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
    // Set waitBattle to true if the transaction is successful
    if (isSuccess) {
      setWaitBattle(true);
    }
  }, [isSuccess])

  useEffect(() => {
    // Navigate to the battle page if the battle is created and the status is 1
    if (gameData?.activeBattle?.battleStatus === 1) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    } else if (gameData?.activeBattle?.battleStatus === 0) {
      // Set waitBattle to true if the battle is created and the status is 0
      setWaitBattle(true);
    }
  }, [gameData]);

  // Function to handle the button click
  const handleClick = async () => {
    try {
      // Check if the battle name is empty
      if (battleName !== '') {
        // Check if the account is connected
        if (isConnected) {
          // Write the contract
          write?.()
        } else {
          // Display an error if the account is not connected
          toast.error("Account Not Connected.")
        }
      } else {
        // Display an error if the battle name is empty
        toast.error("Input Player Name")
      }
    } catch(error: any) {
      // Display an error if there is an error
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
              title="Create"
              handleClick={handleClick}
              loading={isLoading}
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

export default PageHOC (
  CreateBattle,
  <>
    Create <br /> a new Battle
  </>,
  <>Create your own battle and wait for other players to join you</>,
);
