const ExaminationLoading = () => {
    const shimmerRows = Array.from({ length: 4 }); 

    return (
        <div className="py-4 px-3 sm:px-10 bg-[#f8fafc]">
            <div className="divide-y divide-gray-100">
                {shimmerRows.map((_, idx) => (
                    <div
                        key={idx}
                        className="flex justify-between items-center px-3 sm:px-6 py-3"
                    >
                        <div className="flex-1 pr-4">
                            <div className="h-4 sm:h-5 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
                        </div>
                        <div className="w-32 sm:w-40 text-right">
                            <div className="h-4 sm:h-5 bg-gray-200 rounded-md w-1/2 ml-auto animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div> 
    );
};

export default ExaminationLoading;
