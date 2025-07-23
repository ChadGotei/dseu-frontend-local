import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Info } from 'lucide-react';
import { FaQuestionCircle } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';

import { getStudentResult } from '../../utils/apiservice';
import { showErrorToast, showSuccessToast } from '../../utils/toasts';
import dseulogo from "../../assets/dseulogofullnew.svg";

import Tooltip from '../Reusable/Tooltip';

const Result = () => {
  const [isHindi, setIsHindi] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: getStudentResult,
    onSuccess: (data) => {
      showSuccessToast('Result fetched successfully');
      sessionStorage.setItem("studentResult", JSON.stringify(data));
      navigate('/admission/result/show');
    },
    onError: (error) => {
      showErrorToast(error.response?.data?.message || "Something went wrong");
      // console.log(error);
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
        <img alt='dseu logo' className='h-15' src={dseulogo} />
        <h2 className="text-4xl font-extrabold text-center text-blue-700 font-sans">
          DSEU Seat Allocation
          <div className="mt-2 mx-auto w-20 h-1 bg-blue-600 rounded"></div>
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
      </div >

      <div className="flex flex-col items-center gap-4 max-w-xl w-full">
        <div className="flex gap-2">
          <button
            onClick={() => setIsHindi(false)}
            className={`px-4 py-1 rounded-md transition-colors ${!isHindi ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            English
          </button>
          <button
            onClick={() => setIsHindi(true)}
            className={`px-4 py-1 rounded-md transition-colors ${isHindi ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Hindi
          </button>
        </div>

        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded-lg shadow flex items-start gap-2 w-full">
          <Info className="w-5 h-5 mt-1 shrink-0" />
          <p className="text-sm">
            {isHindi
              ? 'Email वही है जो आपने Form के समय दिया था। Password आपकी जन्मतिथि है, जैसे DD-MM-YYYY'
              : 'Your email is the one you registered with. Password is your Date of Birth like DD-MM-YYYY.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;
