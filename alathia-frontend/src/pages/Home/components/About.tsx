import aboutPlus from "assets/aboutPlus.png"

const About = () => {
    return (
        <div className='relative w-[90%] mx-auto py-[1.5rem] md:py-[5rem'>
            <div className='relative flex flex-col items-center justify-between w-[95%] sm:w-[70%] mx-auto gap-[2rem]'>
                <div className='relative flex items-center font-medium text-[1.7rem] md:text-[3.125rem] justify-center w-[60%] max-w-[412px] h-[3.5rem] md:h-[5.375rem] gap-[1rem] sm:gap-[2rem] text-gold10  rounded-xl overflow-hidden'>
                    <div className='w-[2.5rem] animate-wiggle'>
                        <img
                            className="size-full"
                            src={aboutPlus}
                            alt="plusIcon"
                        />
                    </div>
                    <h1>About Alathia</h1>
                </div>
                <h1 className='text-neutral-500 font-medium sm:text-[2rem] text-center text-[1.5rem] shadow-sm'>
                    <span className="text-gold10">Alathia:</span> Battle of the Gods is a multiplayer NFT card game that combines strategy, skill, and blockchain technology. Players collect and battle with unique, powerful cards representing gods, mythical creatures, and legendary warriors, each with distinct abilities. With weekly tournaments, leaderboards, and valuable rewards, Alathia offers an immersive experience where players can prove their dominance in epic, ever-evolving battles.
                </h1>
            </div>
        </div>
    )
}

export default About