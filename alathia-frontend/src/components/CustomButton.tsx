import PulseLoader from 'react-spinners/PulseLoader';

interface CustomButtonProps {
  title: string;
  handleClick: () => void;
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, handleClick, loading }) => (
  <div className="mt-[1rem] ">
    <button type='button' className="" onClick={handleClick} disabled={loading}>
      <div className="relative px-7 py-3 font-medium text-white group">
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
          <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
          <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
          {
            loading ? (
                <PulseLoader
                  className="loader-icon"
                  color={"rgb(255, 255, 255)"}
                  loading={loading}
                  size={13}
                  speedMultiplier={1}
                />
                ) : (
                  <span className="relative">{title}</span>
                )
          }
      </div>
    </button>
  </div>
);

export default CustomButton;
