import { useEffect } from 'react';
import Avatar, { genConfig } from 'react-nice-avatar'
import { toast } from 'sonner';
import Navbar from './Home/components/Navbar.js';
import { useNavigate} from 'react-router-dom'
import aboutPlus from "assets/aboutPlus.png"

//Blockchain
import { useAccount, useContractRead } from 'wagmi'
import { abi, contractAddress } from '../contract/index.js';

const Leaderboard = () => {
    const { address } = useAccount();
    const navigate = useNavigate();

    // Fetch leaderboard data from contract
    const { data: players } = useContractRead({
        address: contractAddress,
        abi,
        functionName: 'getLeaderboard',
        enabled: address !== undefined,
        args: [30],
    });

    useEffect(() => {
        if (!address || players === undefined) {
            navigate('/')
            toast.info("Please Connect Your Wallet")
        }
    }, [players])

    const formattedPlayers = players as any[];

    // Format address to show the first and last few characters
    function formatAddress(addr: string) {
        if (!addr) return '';
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    }

    // Filter out 0x00000 and Sort players by games won
    const sortedPlayers = formattedPlayers?.filter(player => player.playerAddress !== "0x0000000000000000000000000000000000000000")
                        .sort((a, b) =>  Number(b.gamesWon) - Number(a.gamesWon));

    return (
        <div className="min-h-screen flex flex-col items-center text-[1.5rem] font-bold bg-siteblack pb-8 pt-28">
            <Navbar />
            {
                sortedPlayers?.length === 0 
                ? <p className="text-siteWhite">No Players Yet</p> 
                : <div className="w-[90%] mx-auto max-w-3xl bg-siteDimBlack p-8 rounded-lg shadow-2xl">
                    <div className='relative flex items-center font-medium text-[1.7rem] md:text-[3.125rem] justify-center gap-[1rem] sm:gap-[2rem] text-gold10  rounded-xl overflow-hidden mb-[2rem]'>
                        <div className='w-[2.5rem] animate-wiggle'>
                            <img
                                className="size-full"
                                src={aboutPlus}
                                alt="plusIcon"
                            />
                        </div>
                        <h1>Leaderboard</h1>
                    </div>
                    {sortedPlayers?.map((player: any, index: number) => {
                        const { playerName, gamesWon, playerAddress } = player;
                        const avatarConfig = genConfig(playerAddress);

                        return (
                            <div key={playerAddress} className="flex items-center justify-between p-4 border-b border-siteblack last:border-0">
                                <div className="flex items-center">
                                    <Avatar className="w-16 h-16 mr-4" {...avatarConfig} />
                                    <div>
                                        <h2 className="text-xl font-semibold text-siteWhite">{playerName}</h2>
                                        <p className="text-sm text-gray-400">{formatAddress(playerAddress)}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-green10">Games Won: {Number(gamesWon)}</p>
                                    {index < 3 && <span className="text-gold10 font-bold">🏆 Top {index + 1}</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            }
        </div>
    );
};

export default Leaderboard;
