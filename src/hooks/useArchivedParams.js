import { useSearchParams } from "react-router-dom";

export function useArchivedParams() {
    const [searchParams, setSearchParams] = useSearchParams();

    const isArchived = (searchParams.get("archived") ?? "false") === "true";
    const selectedTab = isArchived ? "archived" : "non-archived";

    const setArchived = (value, options = {}) => {
        if (value && typeof value.preventDefault === "function") {
            value = false;
        }

        const next = new URLSearchParams(searchParams);
        if (value) next.set("archived", "true");
        else next.delete("archived");

        const replace = Boolean(options.replace);
        setSearchParams(next, { replace });
    };

    return { isArchived, selectedTab, setArchived };
}
