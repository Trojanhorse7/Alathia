import Avatar, { genConfig } from 'react-nice-avatar'
import { Link, useNavigate} from 'react-router-dom'
import { toast } from 'sonner';
import Navbar from './Home/components/Navbar.js';
import aboutPlus from "assets/aboutPlus.png"

//Blockchain
import { useAccount, useContractRead } from 'wagmi'
import { abi, contractAddress } from '../contract/index.js';
import { useEffect } from 'react';

const Profile = () => {
    const { address } = useAccount();
    const navigate = useNavigate();

    useEffect(() => {
        if (!address) {
            navigate('/')
            toast.info("Please Connect Your Wallet")
        }
    }, [])

    const { data: player } = useContractRead({
        address: contractAddress,
        abi,
        functionName: 'getPlayer',
        enabled: address !== undefined,
        args: [address],
    })

    if (!player) return <div>Loading...</div>
    const { playerName, gamesPlayed, gamesWon, gamesLost, inBattle} = player as any

    function formatAddress(addres: typeof address) {
        if (!addres) return '';
        if (addres.length < 10) return address; 
        return `${addres.slice(0, 6)}...${addres.slice(-6)}`;
    }

    const config = genConfig(address)

    return (
        <div className='min-h-screen flex flex-col gap-[1rem] w-[100vw] text-yellow10 text-[1.5rem] font-bold bg-siteblack pb-[2rem] pt-[7rem]'>
            <Navbar />
            {
                address ? (
                    <div className="flex justify-center items-center bg-siteblack p-8 ">
                        <div className="w-full max-w-md p-6 rounded-lg bg-siteDimBlack text-siteWhite shadow-2xl">
                            <div className='relative flex items-center w-full font-medium text-[1.7rem] md:text-[3.125rem] justify-center h-[3.5rem] md:h-[5.375rem] gap-[1rem] sm:gap-[2rem] text-gold10  rounded-xl overflow-hidden'>
                                <div className='w-[2.5rem] animate-wiggle'>
                                    <img
                                        className="size-full"
                                        src={aboutPlus}
                                        alt="plusIcon"
                                    />
                                </div>
                                <h1>Profile</h1>
                            </div>
                            {/* Profile Avatar */}
                            <div className="flex justify-center mb-6">
                                <Avatar className="w-32 h-32" {...config} />
                            </div>     
            
                            {/* Profile Header */}
                            <div className="text-center mb-6">
                                <h1 className="text-3xl font-bold text-gold10 mb-2">{playerName}</h1>
                                <p className="text-md text-gray10">{formatAddress(address)}</p>
                            </div>
            
                            {/* Game Stats */}
                            <div className="bg-siteblack p-4 rounded-lg mb-6">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-md text-gray10">Games Played:</span>
                                    <span className="font-semibold text-siteWhite">{Number(gamesPlayed)}</span>
                                </div>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-md text-gray10">Games Won:</span>
                                    <span className="font-semibold text-green10">{Number(gamesWon)}</span>
                                </div>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-md text-gray10">Games Lost:</span>
                                    <span className="font-semibold text-red10">{Number(gamesLost)}</span>
                                </div>
                            </div>
            
                            {/* In Battle Status */}
                            <div className="flex justify-between items-center bg-siteblack p-4 rounded-lg">
                            <span className="text-md text-gray10">In Battle:</span>
                            <span
                                className={`font-semibold ${
                                    inBattle ? 'text-gold10' : 'text-red10'
                                }`}
                            >
                                {inBattle ? 'Yes' : 'No'}
                            </span>
                            </div>
            
                            {/* Action Buttons */}
                            <div className="flex justify-center mt-8">
                                <Link to="/" className="px-4 py-2 bg-siteViolet text-siteWhite rounded-md font-semibold mr-3 hover:bg-purple10 transition-colors">
                                    Home
                                </Link>
                                <Link to="/create" className="px-4 py-2 bg-blue10 text-siteWhite rounded-md font-semibold hover:bg-blue30 transition-colors">
                                    Create Battle
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>No wallet Connected</div>
                )
            }
        </div>
    );
};

export default Profile;

