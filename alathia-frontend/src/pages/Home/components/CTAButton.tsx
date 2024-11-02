import { Link } from 'react-router-dom';

const CTAButton = () => {
    const buttons = [
        { path: "/register", label: "Register Player" },
        { path: "/create", label: "Create Game" },
        { path: "/join", label: "Join Game" },
    ];

    return (
        <div className='flex flex-col md:flex-row gap-[2rem] md:gap-[3rem] items-center justify-center'>
            {buttons.map((button, index) => (
                <button key={index} className="">
                    <Link to={button.path} className="relative px-5 py-2 font-medium text-white group">
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
                        <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
                        <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
                        <span className="relative">{button.label}</span>
                    </Link>
                </button>
            ))}
        </div>
    );
}

export default CTAButton;
