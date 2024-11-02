import Navbar from "./components/Navbar";
import HeroScrollDemo  from "./components/HeroComponent";
import Sparkles2 from '../../components/Sparkles2';
import CTAButton from "./components/CTAButton";
import { FeaturesSectionDemo } from "./components/Features";
import Roadmap from "./components/TimelineComponent";
import About from "./components/About";
import Faqs from "./components/Faqs";
import LeaderBoardButton from "./components/LeaderBoardButton";
import Footer from "./components/Footer";

const index = () => {
    return (
        <div className='relative bg-black20 overflow-x-hidden'>
            <Sparkles2 />
            <div className='flex flex-col gap-[1rem] w-[100vw] text-yellow10 pt-[10rem] md:pt-[7rem] text-[2rem] font-bold'>
                <Navbar />
                <HeroScrollDemo />
                <CTAButton />
                <About />
                <FeaturesSectionDemo />
                <LeaderBoardButton />
                <Roadmap />
                <Faqs />
                <Footer />
            </div>
        </div>
    )
}

export default index