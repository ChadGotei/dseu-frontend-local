const Tooltip = ({ children, text, position = "top", bg = "black", textColor = "white"}) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div
        className={`absolute z-50 hidden group-hover:flex bg-${bg} text-${textColor} text-sm px-2 py-1 rounded shadow-md whitespace-nowrap
          ${
            position === "top"
              ? "bottom-full left-1/2 -translate-x-1/2 mb-2"
              : ""
          }
          ${
            position === "bottom"
              ? "top-full left-1/2 -translate-x-1/2 mt-2"
              : ""
          }
          ${
            position === "left"
              ? "right-full top-1/2 -translate-y-1/2 mr-2"
              : ""
          }
          ${
            position === "right"
              ? "left-full top-1/2 -translate-y-1/2 ml-2"
              : ""
          }
          `}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
