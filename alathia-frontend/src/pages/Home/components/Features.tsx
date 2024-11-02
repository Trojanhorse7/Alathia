import { cn } from "utils/index";
import { 
  FaMagic, 
  FaShieldAlt, 
  FaHandsHelping, 
  FaBolt, 
} from "react-icons/fa";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Master the Arcane",
      description: "Harness mystical powers with ease, no spellbooks required.",
      icon: <FaMagic />,
    },
    {
      title: "Epic Rewards Await",
      description: "Earn treasures and glory unlike any other realm. No hidden traps.",
      icon: <FaShieldAlt />,
    },
    {
      title: "Allies Across Realms",
      description: "Gather your allies, share knowledge, and conquer together.",
      icon: <FaHandsHelping />,
    },
    {
      title: "Power in Every Choice",
      description: "Your choices are powerful. Embrace your destiny in Alathia.",
      icon: <FaBolt />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l border-neutral-800",
        index < 4 && "lg:border-b border-neutral-800",
        // Apply hover styles on all screen sizes, but only apply them on hover for screens above md
        "group/feature",
        "md:hover:bg-gradient-to-t md:hover:from-neutral-800 md:hover:to-transparent",
        "bg-gradient-to-t from-neutral-800 to-transparent md:from-transparent md:to-transparent"
      )}
    >
      <div className="mb-4 relative z-10 px-10 text-gray10">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 md:group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 md:group-hover/feature:bg-purple10 transition-all duration-200 origin-center" />
        <span className="md:group-hover/feature:translate-x-2 transition duration-200 inline-block text-[1.5rem] font-rajdhani text-gold10">
          {title}
        </span>
      </div>
      <p className="text-[1rem] leading-2 text-gray-400/70 max-w-xs relative z-10 px-10 tracking-widest font-Carvist">
        {description}
      </p>
    </div>
  );
};
