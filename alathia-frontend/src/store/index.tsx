import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { playAudio, sparcle } from 'utils/animation.js';
import { defenseSound } from 'assets/index.js';

//Blockchain
import {  useAccount, useContractRead, useContractEvent } from 'wagmi'
import { abi, contractAddress } from '../contract/index.js';

interface GameData {
  players: string[];
  pendingBattles: any[];
  activeBattle: any | null;
}

interface GlobalContextType {
  player1Ref: React.RefObject<HTMLDivElement>;
  player2Ref: React.RefObject<HTMLDivElement>;
  battleGround: string;
  setBattleGround: React.Dispatch<React.SetStateAction<string>>;
  gameData: GameData;
  battleName: string;
  setBattleName: React.Dispatch<React.SetStateAction<string>>;
}

//* Get battle card coordinates
const getCoords = (cardRef: any) => {
  const { left, top, width, height } = cardRef.current.getBoundingClientRect();

  return {
    pageX: left + width / 2,
    pageY: top + height / 2.25,
  };
};

const emptyAccount = '0x0000000000000000000000000000000000000000';
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const { address } = useAccount();
  const navigate = useNavigate();
  const [battleGround, setBattleGround] = useState<string>('bg-astral');
  const [gameData, setGameData] = useState<any>({ players: [], pendingBattles: [], activeBattle: null });
  const [battleName, setBattleName] = useState<string>('');
  const [updateGameData, setUpdateGameData] = useState<number>(0);

  const player1Ref = useRef<any>(null);
  const player2Ref = useRef<any>(null);

  // Set battleground to local storage
  useEffect(() => {
    const isBattleground = localStorage.getItem('battleground');
    if (isBattleground) {
      setBattleGround(isBattleground);
    } else {
      localStorage.setItem('battleground', battleGround);
    }
  }, [battleGround]);

  const { data: allBattles } = useContractRead({
    address: contractAddress,
    abi,
    functionName: 'getAllBattles',
    watch: true,
  })

  useContractEvent({
    address: contractAddress,
    abi,
    eventName: 'NewBattle',
    listener(log: any) {
      const { player1, player2, battleName } = log[0].args;
      // console.log('New battle started!', log[0].args, address);
      if (
        address?.toLowerCase() === player1.toLowerCase() ||
        address?.toLowerCase() === player2.toLowerCase()
      ) {
        // Navigate to the new battle page
        navigate(`/battle/${battleName}`);
      }

      // Update the game data
      setUpdateGameData((prev) => prev + 1);
    },
  });

  useContractEvent({
    address: contractAddress,
    abi,
    eventName: 'NewGameToken',
    listener(log: any) {
      const { owner } = log[0].args;
      if (
        address?.toLowerCase() === owner.toLowerCase()
      ) {
        // Navigate to the Create Battle Page
        toast.info("Player Game Token successfully created.")
        navigate(`/create}`);
      }
    },
  });

  useContractEvent({
    address: contractAddress,
    abi,
    eventName: 'BattleMove',
    listener() {
      toast.info('Battle move initiated!')
    },
  });

  useContractEvent({
    address: contractAddress,
    abi,
    eventName: 'RoundEnded',
    listener(log: any) {
      const args = log[0].args;

      for (let i = 0; i < args.damagedPlayers.length; i += 1) {
        if (args.damagedPlayers[i] !== emptyAccount) {
          if (args.damagedPlayers[i] === address) {
            sparcle(getCoords(player1Ref));
          } else if (args.damagedPlayers[i] !== address) {
            sparcle(getCoords(player2Ref));
          }
        } else {
          playAudio(defenseSound);
        }
      }
  
      setUpdateGameData((prev) => prev + 1);
    },
  });

  useContractEvent({
    address: contractAddress,
    abi,
    eventName: 'BattleEnded',
    listener(log: any) {
      const args = log[0].args;

      if (address?.toLowerCase() === args.winner.toLowerCase()) {
        toast.success('You won!');
      } else if (address?.toLowerCase() === args.loser.toLowerCase()) {
        toast.error('You lost!');
      }
  
      navigate('/create');
    },
  });

  // Set the game data to the state
  useEffect(() => {
    // console.log(allBattles)
    const fetchGameData = () => {
      if (allBattles && Array.isArray(allBattles)) {
        const pendingBattles = allBattles.filter((battle: any) => battle.battleStatus === 0);
        const activeBattle = allBattles.find(
          (battle: any) =>
            battle.players.some((player: any) => player.toLowerCase() === address?.toLowerCase()) &&
            battle.winner.startsWith('0x00')
        ) || null;
        setGameData({ pendingBattles: pendingBattles.slice(1), activeBattle });
      }
    };

    fetchGameData();
  }, [allBattles, updateGameData]);

  return (
    <GlobalContext.Provider
      value={{
        player1Ref,
        player2Ref,
        battleGround,
        setBattleGround,
        gameData,
        battleName,
        setBattleName,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  return context;
};
