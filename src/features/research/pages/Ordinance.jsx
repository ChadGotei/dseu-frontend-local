const Ordinance = () => {
  return (
    <div className="w-full px-6 md:px-10 py-16 flex flex-col items-center text-gray-800 bg-gray-50 min-h-[70vh]">
      <div className="w-[70%] bg-white shadow-lg rounded-2xl p-10 border border-gray-100 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-6">
          Research Ordinance
        </h1>
        <div className="mt-10">
          <div className="border-2 border-dashed border-blue-300 rounded-xl p-10 bg-blue-50">
            <p className="text-blue-800 font-medium">
              📄 PDF will be available soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ordinance;
