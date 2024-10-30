import Navbar from "./components/Navbar";
import HeroScrollDemo  from "./components/HeroComponent";
import Sparkles2 from '../../components/Sparkles2';
import CTAButton from "./components/CTAButton";
import { FeaturesSectionDemo } from "./components/Features";
import Roadmap from "./components/TimelineComponent";

const index = () => {
    return (
        <div className='relative bg-black20 overflow-x-hidden'>
            <Sparkles2 />
            <div className='flex flex-col gap-[3rem] w-[100vw] text-yellow10 p-[2rem] pt-[7rem] text-[2rem] font-bold'>
                <Navbar />
                <HeroScrollDemo />
                <CTAButton />
                <Roadmap />
                <FeaturesSectionDemo />
            </div>
        </div>
    )
}

export default index