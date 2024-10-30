const regex = /^[A-Za-z0-9]+$/;

interface CustomInputProps {
  label: string;
  placeHolder: string;
  value: string;
  handleValueChange: (value: string) => void;
}

const CustomInput = ({ label, placeHolder, value, handleValueChange }: CustomInputProps) => (
  <div className='flex flex-col gap-[1rem]'>
    <label htmlFor="name" className='font-rajdhani font-semibold text-2xl text-white mb-3'>{label}</label>
    <input
      type="text"
      placeholder={placeHolder}
      value={value}
      onChange={(e) => {
        if (e.target.value === '' || regex.test(e.target.value)) handleValueChange(e.target.value);
      }}
      className='bg-siteDimBlack text-white outline-none focus:outline-siteViolet p-4 rounded-md sm:max-w-[50%] max-w-full'
    />
  </div>
);

export default CustomInput;
