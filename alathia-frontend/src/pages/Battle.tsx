import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ActionButton, Card, GameInfo, PlayerInfo } from '../components/index.js';
import { attack, attackSound, defense, defenseSound, player01 as player01Icon, player02 as player02Icon } from '../assets/index.js';
import { playAudio } from 'src/utils/animation.js';
import { toast } from 'sonner';
import { Tooltip } from 'react-tooltip';

//Blockchain
import { useContractWrite, usePrepareContractWrite, useAccount, useContractReads } from 'wagmi'
import { parseGwei } from 'viem'
import { abi, contractAddress } from '../contract/index.js';
import { useGlobalContext } from '../store';

const Battle: React.FC = () => {
  const {gameData, battleGround, player1Ref, player2Ref } = useGlobalContext();
  const { address, isConnected } = useAccount();
  const [player2, setPlayer2] = useState<any>();
  const [player1, setPlayer1] = useState<any>();
  const [choice, setChoice] = useState<number>();
  const [moveMade, setMoveMade] = useState<boolean>(false);
  const { battleName } = useParams<{ battleName: string }>();
  const [playerAddress01, setPlayerAddress01] = useState<string>();
  const [playerAddress02, setPlayerAddress02] = useState<string>();
  const navigate = useNavigate();

  // Redirects if no active battle
  useEffect(() => {
    const timer = setTimeout(() => {
      if (gameData?.activeBattle?.battleStatus === 0) navigate('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [gameData, isConnected]);

  useEffect(() => {
    if (gameData?.activeBattle?.players[0].toLowerCase() === address?.toLowerCase()) {
      setPlayerAddress01(gameData?.activeBattle?.players[0]);
      setPlayerAddress02(gameData?.activeBattle?.players[1]);
    } else {
      setPlayerAddress01(gameData?.activeBattle?.players[1]);
      setPlayerAddress02(gameData?.activeBattle?.players[0]);
    }
  }, [gameData, address]);


  // Fetch player info
  const getPlayerInfo = async () => {
    try {
      if (data && data[0].status !== "failure") {
        // console.log(data)
        const player01 = data[0].result as any;
        const player02 = data[1].result as any;
        const p1TokenData = data[2].result as any;
        const p1Att = Number(p1TokenData.attackStrength); 
        const p1Def = Number(p1TokenData.defenseStrength); 
        const p1H = Number(player01.playerHealth); 
        const p1M = Number(player01.playerMana); 
        const p2H = Number(player02.playerHealth); 
        const p2M = Number(player02.playerMana);

        setPlayer1({ ...player01, att: p1Att, def: p1Def, health: p1H, mana: p1M });
        setPlayer2({ ...player02, att: 'X', def: 'X', health: p2H, mana: p2M });
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Get Player Infos from Blockchain
  const { data } = useContractReads(
    {
      contracts: [
        {
          abi: abi as any,
          address: contractAddress,
          functionName: 'getPlayer',
          args: [playerAddress01],
        },
        {
          abi: abi as any,
          address: contractAddress,
          functionName: 'getPlayer',
          args: [playerAddress02],
        },
        {
          abi: abi as any,
          address: contractAddress,
          functionName: 'getPlayerToken',
          args: [playerAddress01],
        },
      ],
      watch: true,
      enabled: setPlayerAddress01 !== undefined && setPlayerAddress02 !== undefined,
      onSuccess: () => {
        if (gameData?.activeBattle?.battleStatus === 1) getPlayerInfo();
      }
    },
  )
  
  // Prepare contract write for move made
  const { config: attackDefendConfig, isSuccess } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: 'attackOrDefendChoice',
    args: [choice, battleName],
    enabled: choice !== undefined,
    gasPrice: parseGwei('200'),
    onError(error) {
      if (error?.message.includes("You have already made a move!")) {
        toast.error("You have already made a move!");
        setMoveMade(true);
      } else if (error?.message.includes("Mana not sufficient for attacking!")) {
        toast.error("Mana not sufficient for attacking!, Defend Instead");
      } else {
        toast.error('Error Occured!')
      }
    },
    onSuccess () {
      handleAttackOrDefend(choice as number);
    }
  });

  const { write } = useContractWrite({
    ...attackDefendConfig,
    onError(error) {
      // console.error('Contract call error:', error);
      if (error?.message.includes("User denied transaction")) {
        toast.error("User denied the transaction.");
      } else if (error.message.includes("insufficient funds")) {
        toast.error("Insufficient funds to complete the transaction.");
      } else {
        toast.error('Error Occured!')
      }
    },
    onSettled() {
      setChoice(undefined);
    }
  });

  const handleAttackOrDefend = (choiceNumber: number) => {
    if (isConnected) {
      if(!moveMade) {
          toast.info('Battle move is being initiated...')
        if (write) {
          playAudio(choiceNumber === 1 ? attackSound : defenseSound);
          write();
        }
      } else {
        toast.error("You have already made a move!")
        setMoveMade(false);
      }
    } else {
      toast.error("Account Not Connected.")
    }
  };

  // Fetch player info on battle change
  useEffect(() => {
    if (gameData.activeBattle) {
      getPlayerInfo();
    }
  }, [gameData.activeBattle, isSuccess]);

  return (
    <div className='min-h-screen flex flex-col gap-[3rem] w-[100vw] text-yellow10 text-[2rem] font-bold bg-siteblack '>
      <div className={`flex justify-between items-center w-screen min-h-screen bg-cover bg-no-repeat bg-center flex-col ${battleGround}`}>
        {
          (player1 && player2 )  && (
            <>
              <PlayerInfo player={player2} playerIcon={player02Icon} mt />
                <div className={`flex items-center justify-center my-10 flex-col`}>
                  <Card card={player2} title={player2?.playerName || 'Player 2'} cardRef={player2Ref} playerTwo />
                  <div className='flex flex-row items-center'>
                    <ActionButton imgUrl={attack} data-tooltip-id={`Attack`} data-tooltip-content={`Attack`} handleClick={() => {setChoice(1)}} restStyles='mr-2 hover:border-yellow-400' />
                    <Card card={player1} title={player1?.playerName || 'Player 1'} cardRef={player1Ref} restStyles='mt-3' />
                    <ActionButton imgUrl={defense} data-tooltip-id={`Defense`} data-tooltip-content={`Defense`} handleClick={() => {setChoice(2)}} restStyles='ml-6 hover:border-red-600' />
                    <Tooltip id={`Attack`} float />
                    <Tooltip id={`Defense`} float />
                  </div>
                </div>
              <PlayerInfo player={player1} playerIcon={player01Icon} />
              <GameInfo /> 
            </>
          )
        }
      </div>
    </div>
  );
};

export default Battle;
