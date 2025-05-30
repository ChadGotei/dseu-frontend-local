const OurCampusesLoading = () => {
  return (
    <section className="pb-12 pt-3 bg-gray-100 mt-10">
      <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-8 mt-10 font-sans">
        Our Campuses
        <div className="mt-2 mx-auto w-20 h-1 bg-blue-600 rounded"></div>
      </h2>

      {/* Desktop Shimmer Grid */}
      <div className="max-w-7xl mx-7 lg:mx-auto hidden md:grid grid-cols-3 gap-6 px-6">
        {Array(3).fill(0).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-white rounded-lg overflow-hidden shadow-lg px-6 py-4"
          >
            <div className="h-52 bg-gray-300 rounded-t-lg w-full mb-4" />
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>

      {/* Mobile Shimmer Slider */}
      <div className="block md:hidden px-7">
        <div className="animate-pulse space-y-6">
          {Array(1).fill(0).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="w-full h-48 bg-gray-300 rounded-t-lg" />
              <div className="h-6 bg-gray-300 rounded mx-4 my-3" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurCampusesLoading;
