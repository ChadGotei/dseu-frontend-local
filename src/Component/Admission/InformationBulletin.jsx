import InformationBulletin from "../Body/InformationBulletin";

    const IB = [
    {
        id: 1,
        name: "Information Bulletin 2025",
        link: "/DSEU_Admission_Brochure_2025_final.pdf",
    },
    ];

    const  Infoadmission = () => {
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
            {IB.map((cal) => (
            <div
                key={cal.id}
                className="border-l-4 border-blue-600 bg-white p-4 shadow-md rounded-md cursor-pointer hover:shadow-lg hover:scale-[1.04] transition-all duration-300 flex justify-between items-center gap-10"
            >
                <div>
                <p className="text-lg font-semibold text-gray-800">{cal.name}</p>
                <p className="text-sm text-gray-600">{cal.desc}</p>
                </div>

                <div className="md:flex md:gap-3 gap-2 hidden">
                <a
                    href={cal.link}
                    target="_blank"
                    className="px-3 py-2 bg-orange-600 text-white text-sm rounded-lg transition-colors hover:bg-orange-500"
                >
                    View
                </a>
                <a
                    href={cal.link}
                    download
                    className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg transition-colors hover:bg-blue-500"
                >
                    Download
                </a>
                </div>

                {/* For mobile */}
                <div className="block md:hidden">
                <a
                    href={cal.link}
                    target="_blank"
                    className="px-3 py-2 bg-orange-600 text-white text-sm rounded-lg transition-colors hover:bg-orange-500"
                >
                    Open
                </a>
                </div>
            </div>
            ))}
        </div>
        
        </main>
        
    );
    };

    export default Infoadmission;
