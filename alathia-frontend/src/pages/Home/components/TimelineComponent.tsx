import { Timeline } from "components/Timeline";

export default function Roadmap() {
    const data = [
        {
            title: "Q3 2024 - Game Foundation",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Establishing the core mechanics, initial character designs, and lore of Alathia.
                    </p>
                    <ul className="list-disc pl-5 text-neutral-300 text-xs md:text-sm">
                        <li>Finalized initial lore and world-building</li>
                        <li>Designed base character stats and abilities</li>
                        <li>Developed prototype for core game mechanics</li>
                        <li>Feedback and bug fixes</li>
                        <li>Chat function for Players</li>
                    </ul>
                </div>
            ),
        },
        {
            title: "Q1 2025 - AI & Closed Beta",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        AI Integration and Launching a closed beta version of Alathia for selected players
                    </p>
                    <ul className="list-disc pl-5 text-neutral-300 text-xs md:text-sm marker:bg-blue-500">
                        <li>Enhanced character balance and game mechanics</li>
                        <li>Include NFT Buy and Sell for Upgrades</li>
                        <li>Add More Multiplayer Modes</li>
                        <li>Add Play with AI</li>
                        <li>In Game Currency</li>
                        <li>Achievements and Badges</li>
                        <li>Ability to Biuy and Replenish Mana</li>
                    </ul>
                </div>
            ),
        },
        {
            title: "Q5 2024 - Mini App and Community Events",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Opening the beta to the public and creation of a Mini APP
                    </p>
                    <ul className="list-disc pl-5 text-neutral-300 text-xs md:text-sm">
                        <li>In-game weekly tournaments with rewards</li>
                        <li>Added more maps and battle environments</li>
                        <li>Introduced seasonal leaderboards</li>
                        <li>Adaptation into a Telegram Miniapp to onboard More Players</li>
                    </ul>
                </div>
            ),
        },
    ];

    return (
        <Timeline data={data} />
    );
}
