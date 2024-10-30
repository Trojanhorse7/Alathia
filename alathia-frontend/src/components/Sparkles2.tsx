import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import particlesConfig from "./particle-config"
import Particles, { initParticlesEngine } from "@tsparticles/react";

const Sparkles2 = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);
    
    return (
        <div className="absolute z-1 top-0 left-0 right-0 bottom-0 opacity-50">
            {init && (
                <Particles
                    className="w-[100vw] h-[120vh]"
                    options={particlesConfig as any}
                />
            )}
        </div>
    )
}

export default Sparkles2