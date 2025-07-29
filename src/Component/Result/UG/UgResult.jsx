import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Info } from 'lucide-react';
import { FaQuestionCircle } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';

import useResultStore from '../../../store/resultStore';
import { getUGStudentResult } from '../../../utils/apiservice';
import { showErrorToast, showSuccessToast } from '../../../utils/toasts';
import dseulogo from "../../../assets/dseulogofullnew.svg";

import Tooltip from '../../Reusable/Tooltip';

const UgResult = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // result store
    const setResult = useResultStore((state) => state.setResult);

    const { mutate } = useMutation({
        mutationFn: getUGStudentResult,
        onSuccess: (data) => {
            showSuccessToast('Result fetched successfully');
            // storing in result store instead of session storage to make it more secure
            setResult(data);
            navigate('/admission/result/ug/show');
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
            showErrorToast('Enter email and password');
            return;
        }
        mutate(formData);
    };

    return (
        <div className="py-20 flex items-center justify-center bg-gray-100 p-4 flex-col gap-10">
            <div className='flex flex-col items-center justify-center gap-7'>
                <img alt='dseu logo' className='md:h-15' src={dseulogo} />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-blue-700 font-sans">
                    DSEU UG Seat Allocation
                    <div className="mt-2 mx-auto w-20 md:w-36 h-1 bg-blue-600 rounded"></div>
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
                            placeholder='Email of registration form'
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="relative">
                        <label className="text-sm font-medium mb-1 flex flex-row items-center gap-1">
                            Password <Tooltip text={"Password is your date of birth in DD-MM-YYYY format"}>
                                <FaQuestionCircle className='h-3 text-red-400 cursor-pointer' />
                            </Tooltip>
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                            placeholder='Example: 30-05-2006'
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-gray-500"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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

            <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded-lg shadow flex items-start gap-2 max-w-xl w-full">
                <Info className="w-5 h-5 mt-1 shrink-0" />
                <p className="text-sm">
                    Your email is the one you registered with. Password is your Date of Birth like DD-MM-YYYY.
                </p>
            </div>


        </div>
    );
};

export default UgResult;
