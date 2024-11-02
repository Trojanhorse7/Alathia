import { Link } from 'react-router-dom';

//img and Icon Imports
import Logo from "assets/logo.png"
import BottomOverlay from "assets/bottomOverlay.png"
import { FaTwitter } from 'react-icons/fa6';
import { FaDiscord  } from "react-icons/fa6";

const Footer = () => {

    const socialLinks: {
        link: string;
        icon: any; 
        title: string
        style: string
    }[] = [
        {
            link: '#',
            icon: FaDiscord,
            title: "Discord",
            style: "w-fit h-[27px] text-white"
        },
        {
            link: '#',
            icon: FaTwitter,
            title: "Twitter",
            style: "w-fit h-[24px] text-white"
        },
    ];

    //Navlnk Details
    const navLinks = [
        { link: '/', title: 'Home' },
        { link: '/register', title: 'Register' },
        { link: '/create', title: 'Create' },
        { link: '/join', title: 'Join' },
        { link: '/profile', title: 'Profile' },
        { link: '/leaderboard', title: 'Leaderboard' },
    ];

    return (
        <div className='flex flex-col items-center relative w-full bg-slate-700/50'>
            <img
                className="w-full absolute top-0"
                src={BottomOverlay}
                alt="BottomOverlay"
            />
            <div className='flex flex-col lg:flex-row items-center w-[90%] mx-auto py-[4rem] justify-between gap-[2rem]'>
                <div className='flex items-center flex-col gap-[10px] sm:gap-[1rem]'>
                    <img
                        className="sm:size-[100px] size-[70px]"
                        src={Logo}
                        alt="Logo"
                    />
                    <h1 className='text-red10 text-[2.375rem] font-medium'>
                        ALATHIA: <span className='text-neutral-300'>Battle Of The Gods</span>
                    </h1>
                </div>
                <div className="relative p-6 border-t-4 border-b-4 border-gold10 bg-neutral-800/50 overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow10 to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent to-gold10"></div>
                    <ul className="grid grid-cols-3 items-start justify-start gap-[5px]">
                        {navLinks.map((nav) => (
                            <Link
                                key={nav.link}
                                className={` hover:text-gold10 text-white text-[2rem] font-medium`}
                                to={nav.link}
                            > 
                                <p>{nav.title}</p>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className='flex items-center justify-center flex-col gap-[10px] sm:gap-[1.5rem]'>
                    <h1 className='font-poppins text-[1.5rem] text-gold10 font-bold'>Join Our Community</h1>
                    <div className='flex flex-row gap-[2rem]'>
                        {socialLinks.map((nav, idx) => (
                                <Link
                                    key={idx + 1}
                                    to={`${nav.link}`}
                                    className='px-[1rem] h-[2.4rem] gap-[10px] flex items-center justify-center rounded-[6px] font-Poppins hover:scale-[0.97] bg-black10 text-white hover:text-gold10'
                                >   
                                    {
                                        idx === 0 ? <FaDiscord className={nav.style}/> : <FaTwitter className={nav.style}/> 
                                    }
                                    <h1 className='text-[1rem] mb-[-3px]'>{nav.title}</h1>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='w-full flex h-[55px] sm:h-[50px] bg-grey15 items-center justify-center'>
                <h1 className='font-medium text-gray-500 text-[1rem] sm:text-[1.4375rem]'>
                    Alathia {new Date().getFullYear()}  <span className='text-gold10'> | </span>All Rights Reserved
                </h1>
            </div>
        </div>
    )
}

export default Footer