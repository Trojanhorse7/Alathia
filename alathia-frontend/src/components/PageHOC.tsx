import React, { ComponentType, ReactNode } from 'react';
import { heroImg } from '../assets';
import Navbar from 'src/pages/Home/components/Navbar';

const PageHOC = (
  Component: ComponentType, 
  title: ReactNode, 
  description: ReactNode
): React.FC => () => {

  return (
    <div className='min-h-screen flex flex-col gap-[3rem] w-[100vw] text-yellow10 text-[2rem] font-bold bg-siteblack pb-[2rem] pt-[7rem]'>
      <Navbar />
      <div className='flex xl:flex-row flex-col relative justify-center items-center w-[90%] md:w-[70%] mx-auto border-2 border-yellow10 rounded-3xl h-fit overflow-hidden p-[2rem]'>
        <div className='h-full font-rajdhani flex flex-1 rounded-xl justify-between z-10 bg-siteblack/85 py-8 w-full px-[2rem] flex-col'>
          <div className='flex-1 flex justify-center flex-col my-16'>
            <div className="flex flex-row w-full">
              <h1 className={`flex font-rajdhani font-bold text-white sm:text-6xl text-4xl head-text`}>{title}</h1>
            </div>
            <p className={`font-rajdhani font-normal text-[24px] text-siteWhite my-10`}>{description}</p>
            <Component />
          </div>
        </div>
        <div className="flex flex-1 absolute top-0 z-1 h-full shadow-2xl ">
          <img src={heroImg} alt="hero-img" className="w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default PageHOC;