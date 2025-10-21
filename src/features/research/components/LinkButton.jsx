const LinkButton = ({ href, children }) => {
    if (!href || href.trim() === '') {
        return null;
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors flex items-center gap-1"
        >
            {children}
        </a>
    );
};

export default LinkButton;