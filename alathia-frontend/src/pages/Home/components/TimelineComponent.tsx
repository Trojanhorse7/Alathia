
import { Timeline } from "components/Timeline";

export default function Roadmap() {
    const data = [
        {
        title: "2024",
        content: (
            <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                Built and launched Aceternity UI and Aceternity UI Pro from scratch.
            </p>
            <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                <li>Enhanced design and user experience</li>
                <li>Integrated new components and templates</li>
                <li>Launched Aceternity Pro for premium users</li>
            </ul>
            </div>
        ),
        },
        {
        title: "Early 2023",
        content: (
            <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                Continued to expand on user-focused design and added new features.
            </p>
            <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                <li>Added various hero and feature sections</li>
                <li>Improved accessibility and responsiveness</li>
            </ul>
            </div>
        ),
        },
        {
        title: "Changelog",
        content: (
            <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                Deployed 5 new components on Aceternity today.
            </p>
            <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                <li>Card grid component</li>
                <li>Startup template Aceternity</li>
                <li>File upload functionality</li>
                <li>Enhanced user registration options</li>
            </ul>
            </div>
        ),
        },
    ];

    return (
        <Timeline data={data} />
    );
}
