const ResearchNotices = ({ count = 3 }) => {
  return (
    <div className="space-y-6 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-200"
        >
          <div className="h-5 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
};

export default ResearchNotices;
