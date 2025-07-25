import Logo from "../Reusable/Logo";

const PwdMessage = () => {
    return (
        <div className="py-12 px-4">
            <div className="max-w-3xl mx-auto p-8 text-center">
                <Logo cn="h-20 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-red-600 mb-4">Important Reporting Instructions</h2>
                <p className="text-gray-800 text-base leading-relaxed mb-4 text-left mt-4 font-semibold">
                    Dear Applicant,
                </p>
                <p className="text-gray-700 text-base leading-relaxed mb-6 text-justify">
                    You are <span className="font-semibold">required to report</span> along with all original documents as per the Information Bulletin,
                    along with a set of Xerox copies as per the following schedule:
                </p>
                <div className="bg-gray-100 border border-gray-300 rounded-lg px-6 py-4 text-justify text-gray-800 mb-6 text-sm md:text-base flex flex-col gap-2">
                    <p><span className="font-semibold">📍 Venue:</span> Delhi Skill & Entrepreneurship University, Sec - 9, Dwarka, Delhi</p>
                    <p><span className="font-semibold">📅 Date & Time:</span> 25 July 2025, from 11:00 AM to 2:00 PM</p>
                </div>
                <p className="text-sm text-gray-700">
                    📩 For further details or information, please check your registered <span className="font-medium">email ID</span>.
                </p>
            </div>
        </div>
    );

}

const NoSeatAllocationMessage = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-white p-6 mt-10">
            <Logo cn="h-20 mb-6" />
            <h2 className="text-xl text-red-600 font-semibold mb-2">No Seat Allotted</h2>
            <p className="text-gray-700 text-center max-w-md">
                {"You have not been allotted a seat. Please wait for next round."}
            </p>
        </div>
    );
}


const PwdMessagebtech = () => {
    return (
        <div className="py-12 px-4">
            <div className="max-w-3xl mx-auto p-8 text-center">
                <Logo cn="h-20 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-red-600 mb-4">Important Information for B.Tech PwD & Defense Candidates</h2>

                <p className="text-gray-800 text-base leading-relaxed mb-4 text-left mt-4 font-semibold">
                    Dear Applicant,
                </p>

                <p className="text-gray-700 text-base leading-relaxed mb-6 text-justify">
                    The <span className="font-semibold">allocation of Defense and Persons with Disabilities (PwD) candidates is pending</span>,
                    subject to the verification of their documents. You shall receive a separate communication to appear in person as per the schedule below:
                </p>

                <div className="bg-gray-100 border border-gray-300 rounded-lg px-6 py-4 text-justify text-gray-800 mb-6 text-sm md:text-base flex flex-col gap-2">
                    <p><span className="font-semibold">📍 Venue:</span> GB Pant Okhla Campus (Library Block, Ground Floor)</p>
                    <p><span className="font-semibold">📅 Date & Time:</span> 31 July 2025, at 11:00 AM</p>
                </div>

                <p className="text-sm text-gray-700">
                    📩 Further communication will be shared via your registered <span className="font-medium">email ID</span>.
                </p>
            </div>
        </div>
    );
};

export { NoSeatAllocationMessage, PwdMessage, PwdMessagebtech }