import { useMemo } from "react";

// scrollbar for the items only
const NoticeScroller = ({ items = [], isLoading, error, durationSeconds = 8 }) => {

    // dynammic duration 
    const duration = useMemo(() => {
        if (!items || items.length === 0) return 0;
        const baseDuration = durationSeconds; // seconds per ~10 items
        return Math.max(10, (items.length / 5) * baseDuration);
    }, [items]);

    if (isLoading) {
        return <div className="text-center text-gray-500 italic">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error loading notices</div>;
    }

    if (items.length === 0) {
        return (
            <div className="my-auto p-2 text-center text-gray-500 italic">
                No Notices available for now.
            </div>
        );
    }

    return (
        <div
            className="animate-scroll group-hover:paused-scroll"
            style={{ animationDuration: `${duration}s` }}
        >
            <ul className="space-y-2">
                {items.map((item, idx) => (
                    <li
                        key={idx}
                        className="hover:bg-blue-100 rounded py-1 px-2 transition-colors duration-200"
                    >
                        <a
                            href={item.link}
                            target={item.samePage ? "_self" : "_blank"}
                            rel={item.samePage ? undefined : "noopener noreferrer"}
                            className="text-gray-700 hover:text-blue-900 flex items-center w-full"
                        >
                            {item.name}
                            <span className="ml-2 animated-label">NEW</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoticeScroller;
