import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// Images and Icon Import
import Logo from 'assets/logo.png'
import { GiHamburgerMenu  } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

type MobileNavProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMenu: () => void;
};

//Navlnk Details
const navLinks = [
  { link: '/', title: 'Home' },
  { link: '/register', title: 'Register' },
  { link: '/create', title: 'Create' },
  { link: '/join', title: 'Join' },
  { link: '/profile', title: 'Profile' },
  { link: '/leaderboard', title: 'Leaderboard' },
];

// Mobile View Navbar
const MobileNav = ({ open, setOpen, toggleMenu }: MobileNavProps) => {
  const location = useLocation();

  const activeLink = (path: string) =>
    location.pathname.includes(path)
      ? 'flex flex-col items-center text-[14px] font-semibold' 
      : 'flex flex-col items-center text-[14px]';

  return (
    <div className={`md2:hidden fixed z-[90] top-0 ${!open ? "right-[-1000px]" : "right-0"} h-[100vh] w-[60%] sm:w-[40vw] bg-yellow10 text-black10 border-black10`}>
      <div className='flex items-center justify-center flex-col gap-[2rem] py-[3rem] size-full'>

        <div className='flex items-center flex-col justify-between max-w-[300px] gap-[1rem]'>
          <IoCloseSharp onClick={() => setOpen(!open)} className="flex md2:hidden cursor-pointer text-[30px]" />
          <div className="flex w-[60%] h-fit">
            <img src={Logo} alt="Alathia" className='shrink-0 w-[100%] h-auto' />
          </div>
        </div>

        <ul className="flex flex-col items-center gap-[1rem]">
          {navLinks.map((nav) => (
            <Link
              key={nav.link}
              className={`${activeLink(nav.link)}`}
              to={nav.link}
              onClick={toggleMenu}
            > 
              <h1 className='text-[2rem]'>{nav.title}</h1>
            </Link>
          ))}
          <div className='flex items-center justify-between text-[1rem] mt-[1rem]'>
            <ConnectButton />
          </div>
        </ul>
      </div>
    </div>
  );
};

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const activeLink = (path: string): string => {
    const isActive = location.pathname === path;

    return isActive ? 'text-gold10 text-[35px] font-extrabold opacity-70' : 'text-yellow10 tetx-[25px]';
  };

  return (
    <nav className={`w-full h-fit shrink-0 fixed top-0 left-0 bg-slate-700/50 py-[5px] z-[999] text-[2rem]`}>
      <div className="flex flex-row items-center justify-between w-[85vw] mx-auto gap-[1rem]">
        
        <Link to="/" className="flex w-[70px]">
          <img src={Logo} alt="Alathia" className='shrink-0 w-[100%] h-auto' />
        </Link>

        <ul className="hidden md2:flex items-center gap-[1rem] md:gap-[1.1rem]">
          {navLinks.map((nav) => (
            <Link
              key={nav.link}
              className={`${activeLink(nav.link)} flex flex-col items-center hover:text-yellow20`}
              to={nav.link}
            > 
              <p>{nav.title}</p>
            </Link>
          ))}
        </ul>
        
        <div onClick={toggleMenu} className="flex md2:hidden cursor-pointer text-yellow10 text-[30px]">
          <GiHamburgerMenu className={`${location.pathname === "/" ? "text-grey10 font-bold" : "text-green30 font-bold"}`} />
        </div>
        <div className='hidden md2:flex items-center justify-between text-[1rem]'>
          <ConnectButton />
        </div>
        
        {open && <MobileNav open={open} setOpen={setOpen} toggleMenu={toggleMenu} />}
      </div>
    </nav>
  );
};

export default Navbar;
