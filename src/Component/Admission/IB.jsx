const IB = () => {
  const ibLink =
    "https://drive.google.com/file/d/1SPyxoyPbJQ473x2rFds2q9DtWNPwPyYT/view";

  return (
    <main className="flex flex-col mt-8 md:mt-12 md:mb-10 mb-16 justify-center items-center w-full max-w-3xl gap-4 sm:gap-6 md:gap-8 mx-auto">
      <div className="text-center">
        <h2 className="text-3xl md:text-[2.4rem] font-bold text-[#222] tracking-wide">
          Information Bulletin
        </h2>
        <div className="flex items-center justify-center mt-4 w-[150px] mx-auto">
          <div className="h-[3px] bg-blue-700 md:flex-1 w-[20px]"></div>
          <div className="h-[6px] w-[40px] md:w-[60px] bg-blue-900 rounded-full mx-2"></div>
          <div className="h-[3px] bg-blue-700 md:flex-1 w-[20px]"></div>
        </div>
      </div>

      <div className="w-full p-5 space-y-4">
        <div className="border-l-4 border-blue-500 bg-white p-4 shadow-md rounded-md cursor-pointer hover:shadow-lg hover:scale-[1.04] transition-all duration-300 flex justify-between items-center gap-10">
          <div>
            <p className="text-lg font-semibold text-gray-800">
              Information Bulletin 2025
            </p>
            <p className="text-sm text-gray-600">
              Complete details for admissions and programs
            </p>
          </div>

          <div className="md:flex md:gap-3 gap-2 hidden">
            <a
              href={ibLink}
              target="_blank"
              className="px-3 py-2 bg-orange-600 text-white text-sm rounded-lg transition-colors hover:bg-orange-500"
            >
              View
            </a>
          </div>

          {/* For mobile */}
          <div className="block md:hidden">
            <a
              href={ibLink}
              target="_blank"
              className="px-3 py-2 bg-orange-600 text-white text-sm rounded-lg transition-colors hover:bg-orange-500"
            >
              Open
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default IB;
