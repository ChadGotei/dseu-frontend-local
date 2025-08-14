import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Info } from "lucide-react";
import { FaQuestionCircle } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";

import useResultStore from "../../../store/btechRound2Store";
import { getBtechRound2Result } from "../../../utils/resultservices";
import { showErrorToast, showSuccessToast } from "../../../utils/toasts";
import dseulogo from "../../../assets/dseulogofullnew.svg";

import Tooltip from "../../Reusable/Tooltip";

const BtechRound2Result = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // result store
    const setResult = useResultStore((state) => state.setResult);

    const { mutate } = useMutation({
        mutationFn: getBtechRound2Result,
        onSuccess: (data) => {
            showSuccessToast("Result fetched successfully");
            setResult(data);
            navigate("/admission/result/btech2/show");
        },
        onError: (error) => {
            showErrorToast(error.response?.data?.message || "Something went wrong");
        },
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            showErrorToast("Enter email and password");
            return;
        }
        mutate(formData);
    };

    return (
        <div className="pt-10 flex items-center justify-center bg-gray-100 p-4 flex-col gap-10 pb-20">

            <div className="flex gap-6 mb-10">
                <button
                    className={`px-6 py-3 rounded-full bg-gray-200`}
                    onClick={() => navigate("/admission/result?category=btech")}
                >
                    Round 1
                </button>
                <button
                    className={`px-6 py-3 rounded-full bg-blue-600 text-white font-semibold `}>
                    Round 2
                </button>
            </div>


            <div className="flex flex-col items-center justify-center gap-7">
                <img alt="dseu logo" className="h-15 mt-[-30px]" src={dseulogo} />
                <h2 className="text-2xl sm:text-2xl md:text-3xl font-extrabold text-center text-blue-700 font-sans mt-5">
                    DSEU <span className="capitalize">Btech Round 2</span> Seat Allocation
                    <div className="mt-2 mx-auto w-[190px] h-1 bg-blue-600 rounded"></div>
                </h2>
            </div>

            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Email of registration form"
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="relative">
                        <label className="text-sm font-medium mb-1 flex flex-row items-center gap-1">
                            Password{" "}
                            <Tooltip
                                text={"Password is your date of birth in DD-MM-YYYY format"}
                            >
                                <FaQuestionCircle className="h-3 text-red-400 cursor-pointer" />
                            </Tooltip>
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                            placeholder="Example: 30-05-2006"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-gray-500"
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>

            <div className="flex flex-col items-center gap-4 max-w-xl w-full">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded-lg shadow flex items-start gap-2 w-full">
                    <Info className="w-5 h-5 mt-1 shrink-0" />
                    <p className="text-sm">
                        Your email is the one you registered with. Password is your Date of Birth like DD-MM-YYYY.
                    </p>
                </div>
            </div>

            {/* <a
                href={`/seat-confirmation-btech-round2.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-center bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
                View Seat Confirmation Process (PDF)
            </a> */}
        </div>
    );
};

export default BtechRound2Result;
