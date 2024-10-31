import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ActionButton, Card, GameInfo, PlayerInfo } from '../components/index.js';
import { attack, attackSound, defense, defenseSound, player01 as player01Icon, player02 as player02Icon } from '../assets/index.js';
import { playAudio } from 'src/utils/animation.js';
import { toast } from 'sonner';
import { Tooltip } from 'react-tooltip';
// import Navbar from 'src/pages/Home/components/Navbar';

//Blockchain
import { useContractWrite, usePrepareContractWrite, useAccount, useContractReads } from 'wagmi'
import { abi, contractAddress } from '../contract/index.js';
import { useGlobalContext } from '../store';

const Battle: React.FC = () => {
  const {gameData, battleGround, player1Ref, player2Ref } = useGlobalContext();
  console.log(gameData)
  const { address, isConnected } = useAccount();
  const [player2, setPlayer2] = useState<any>();
  const [player1, setPlayer1] = useState<any>();
  const [choice, setChoice] = useState<number>();
  const { battleName } = useParams<{ battleName: string }>();
  const navigate = useNavigate();

  /**
   * Redirects the user to the create page if the active battle is not defined within 2 seconds.
   * This is a failsafe to prevent the user from staying on the battle page if they don't have a battle.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!gameData?.activeBattle) navigate('/create');
    }, 2000);

    return () => clearTimeout(timer);
  }, [gameData, navigate]);

  const getPlayerInfo = async () => {
    try {
      let player01Address: string | null = null;
      let player02Address: string | null = null;

      if (gameData.activeBattle.players[0].toLowerCase() === address?.toLowerCase()) {
        player01Address = gameData.activeBattle.players[0];
        player02Address = gameData.activeBattle.players[1];
      } else {
        player01Address = gameData.activeBattle.players[1];
        player02Address = gameData.activeBattle.players[0];
      }

      if (data) {
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
      // console.log(error)
      toast.error(error.message);
    }
  };

  const { data } = useContractReads(
    {
      contracts: [
        {
          abi: abi as any,
          address: contractAddress,
          functionName: 'getPlayer',
          args: [gameData.activeBattle?.players[0]],
        },
        {
          abi: abi as any,
          address: contractAddress,
          functionName: 'getPlayer',
          args: [gameData.activeBattle?.players[1]],
        },
        {
          abi: abi as any,
          address: contractAddress,
          functionName: 'getPlayerToken',
          args: [gameData.activeBattle?.players[0]],
        },
      ],
      onSuccess: () => {
        if (gameData.activeBattle) getPlayerInfo();
      }
    },
  )
  
  // Write hook for initiating move
  const { config: attackDefendConfig, isSuccess } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: 'attackOrDefendChoice',
    args: [choice, battleName],
  });

  const { write, error } = useContractWrite(attackDefendConfig)

  useEffect(() => {
    if (gameData.activeBattle) {
      getPlayerInfo();
    }
  }, [gameData.activeBattle, isSuccess]);

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

  const handleMove = (choiceNumber: number) => {
    try {
      if (isConnected) {
        setChoice(choiceNumber);
        playAudio(choiceNumber === 1 ? attackSound : defenseSound);
        write?.();
      } else {
        toast.error("Account Not Connected.")
      }
    } catch(error: any) {
      toast.error(error?.message)
    }
  };

  return (
    <div className='min-h-screen flex flex-col gap-[3rem] w-[100vw] text-yellow10 text-[2rem] font-bold bg-siteblack '>
      <div className={`flex justify-between items-center w-screen min-h-screen bg-cover bg-no-repeat bg-center flex-col ${battleGround}`}>
        {
          (player1 && player2)  && (
            <>
              <PlayerInfo player={player2} playerIcon={player02Icon} mt />
                <div className={`flex items-center justify-center my-10 flex-col`}>
                  <Card card={player2} title={player2?.playerName || 'Player 2'} cardRef={player2Ref} playerTwo />
                  <div className='flex flex-row items-center'>
                    <ActionButton imgUrl={attack} data-tooltip-id={`Attack`} data-tooltip-content={`Attack`} handleClick={() => handleMove(1)} restStyles='mr-2 hover:border-yellow-400' />
                    <Card card={player1} title={player1?.playerName || 'Player 1'} cardRef={player1Ref} restStyles='mt-3' />
                    <ActionButton imgUrl={defense} data-tooltip-id={`Defense`} data-tooltip-content={`Defense`} handleClick={() => handleMove(2)} restStyles='ml-6 hover:border-red-600' />
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
