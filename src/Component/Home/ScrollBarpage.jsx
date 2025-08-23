import { useEffect, useState } from "react";
import { useNoticesBySection } from "../../hooks/useNoticesBySection";
import { toAdd } from "../Body/Announcements";
import { normalize } from "../../utils/helper";
import { ExternalLink } from "lucide-react";
import Modal from "../UI/Modal";

const TYPES = {
    ALL: "all",
    LINKS: "links",
    TEXTS: "texts",
}

const Shimmer = () => (
    <div className="w-full max-w-5xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="rounded-xl border border-gray-200 bg-white p-4 animate-pulse"
                >
                    <div className="h-4 w-1/3 bg-gray-200 rounded mb-3" />
                    <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded" />
                </div>
            ))}
        </div>
    </div>
);

const ScrollBarpage = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [type, setType] = useState(TYPES.ALL);  // to set the type of announcement

    const [open, setOpen] = useState(false);
    const [modalText, setModalText] = useState("");

    const { data, isLoading, isError } = useNoticesBySection(
        "announcements",
        false,
        100,
        1
    );
    useEffect(() => {
        const fromAPI = Array.isArray(data?.data?.notices) ? data.data.notices : [];
        const merged = [...toAdd, ...fromAPI].map(normalize);

        const filtered = merged.filter((item) => {
            if (type === TYPES.LINKS) return !!item.fileLink;
            if (type === TYPES.TEXTS) return !item.fileLink;
            return true;
        });

        setAnnouncements(filtered);
    }, [data, type]);


    const hasItems = announcements.length > 0;

    if (isError) {
        return (
            <main className="min-h-[30vh] flex flex-col items-center justify-center px-4">
                <div className="max-w-xl w-full rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
                    <p className="font-semibold">Couldn’t load announcements.</p>
                    <p className="text-sm mt-1">
                        {/* {error?.name ? `${error.name}: ` : ""}{error?.message ?? "Unknown error"} */}
                        Network Error please refresh or reload the page to see announcements.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-[30vh] flex flex-col items-center justify-start pt-8 pb-16">
            {/* Heading */}
            <div className="text-center mb-8 px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900">
                    Announcements
                </h1>
                <p className="mt-2 md:mt-3 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                    Stay updated with the latest notices and information.
                </p>
                <div className="mt-4 mx-auto w-24 h-1 bg-blue-600 rounded-full" />
            </div>

            {/* Content */}
            {isLoading ? (
                <Shimmer />
            ) : hasItems ? (
                <section className="w-full max-w-5xl px-4">
                    {/* sticky topbar with backdrop */}
                    <div className="sticky top-0 z-10 -mx-4 px-4 py-2 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100 flex flex-row justify-between">
                        <div className="text-xs sm:text-sm text-gray-500">
                            Showing {announcements.length} announcement{announcements.length > 1 ? "s" : ""}
                        </div>

                        <select
                            className="mr-2 border-2 border-black/10 rounded px-2 py-1 text-sm "
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            {Object.values(TYPES).map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                </option>
                            ))}
                        </select>

                    </div>

                    {/* Responsive grid of cards */}
                    <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {announcements.map((item, idx) => {
                            const isLink = !!item.fileLink;
                            const Cmp = isLink ? "a" : "button";
                            const props = isLink
                                ? { href: item.fileLink, target: item.fileLink.includes("dseu.ac.in") ? "" : "__blank", rel: "noopener noreferrer" }
                                : { onClick: () => { setModalText(item.fileName); setOpen(true); } };

                            return (
                                <li key={`${item.fileName}-${idx}`}>
                                    <Cmp
                                        {...props}
                                        className={[
                                            "group block h-full rounded-xl border border-gray-200 bg-white",
                                            "p-4 shadow-sm hover:shadow-md focus:shadow-md",
                                            "transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500/40",
                                            !isLink && "text-left w-full"
                                        ].join(" ")}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="min-w-0 flex-1">
                                                <h3 className={`text-base text-gray-900 leading-relaxed hover:font-semibold ${isLink ? "line-clamp-2" : "line-clamp-4"} ${(item.fileName.length > 50) ? "text-xs md:text-[0.9rem]" : "text-sm md:text-[1rem]"}`}>
                                                    {item.fileName}
                                                </h3>

                                                {isLink && (
                                                    <div className="mt-2 inline-flex items-center gap-1 text-xs md:text-sm text-blue-700 group-hover:underline">
                                                        <span className="truncate">Open</span>
                                                        <ExternalLink className="h-3 w-3" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Cmp>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            ) : (
                <div className="w-full max-w-3xl px-4">
                    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-600">
                        No announcements yet.
                    </div>
                </div>
            )}

            {/* To see all the non links  modals */}
            <Modal isOpen={open} onClose={() => setOpen(false)} lockScroll={"gaurav" === "gaurav"}>
                <Modal.Overlay />
                <Modal.Content>
                    <Modal.Close />
                    <Modal.Header>
                        <Modal.Title>Announcement</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p className="leading-relaxed text-sm md:text-base">{modalText}</p>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </main>
    );
};

export default ScrollBarpage;
