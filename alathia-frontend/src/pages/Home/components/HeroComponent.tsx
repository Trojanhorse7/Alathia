import { ContainerScroll } from './Container-Scroll-Animation';
import heroImg from 'assets/hero2.jpg';
import { Cover } from "components/Cover";

export default function HeroScroll() {
    return (
        <div className="flex flex-col">
            <ContainerScroll
                titleComponent={
                    <h1 className="inline-flex flex-col text-4xl font-semibold  dark:text-white">
                        <Cover className=''> Unleash the Power of Alathia</Cover>
                        <span className="text-4xl md:text-[6rem] font-bold leading-none mt-[2rem] text-gold10">
                            Where Gods Clash and Legends Rise
                        </span>
                    </h1>
                }
            >
                <img
                    src={heroImg}
                    alt="hero"
                    height={800}
                    width={1000}
                    className="mx-auto rounded-1xl object-cover h-full object-bottom-center"
                    draggable={false}
                />
            </ContainerScroll>
        </div>
    );
}
