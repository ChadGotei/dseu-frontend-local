const ResearchNotices = ({ count = 5 }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="border border-gray-200 bg-white rounded-xl p-4 md:p-5 shadow-sm w-full sm:w-[85%] lg:w-[80%] animate-pulse"
        >
          <div className="flex flex-row sm:items-center sm:justify-between">
            {/* Left Side (Text placeholders) */}
            <div className="flex-1 space-y-3">
              <div className="h-5 md:h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>

            {/* Right Side (Button placeholder) */}
            <div className="mt-4 sm:mt-0 h-8 w-20 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResearchNotices;
