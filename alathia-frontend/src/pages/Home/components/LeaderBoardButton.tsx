import { Link } from 'react-router-dom';

const LeaderBoardButton = () => {
    const buttons = [
        { path: "/leaderboard", label: "Check Leaderboard" }
    ];

    return (
        <div className='flex flex-col gap-[2rem] md:gap-[3rem] items-center justify-center'>
            <div>
                {buttons.map((button, index) => (
                    <button key={index} className="">
                        <Link to={button.path} className="relative px-[3rem] sm:px-[6rem] py-5 font-medium text-white group">
                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
                            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
                            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
                            <span className="relative">{button.label}</span>
                        </Link>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default LeaderBoardButton;
