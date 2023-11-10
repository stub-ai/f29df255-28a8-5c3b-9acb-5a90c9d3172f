import React, { useState } from 'react';
import { sendOTP, verifyOTP } from '../pages/api/otp';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async () => {
    await sendOTP(phoneNumber);
    setOtpSent(true);
  };

  const handleVerifyOtp = async () => {
    const isValid = await verifyOTP(phoneNumber, otp);
    if (isValid) {
      // Handle successful login
    } else {
      // Handle failed login
    }
  };

  return (
    <div className="min-h-screen py-2 flex flex-col items-center justify-center">
      <div className="max-w-sm w-full p-6 bg-white shadow-md rounded-md">
        <div className="items-center justify-center flex">
          <span className="font-semibold text-2xl text-gray-700">Login</span>
        </div>
        <form className="mt-4">
          <label className="block">
            <span className="text-sm text-gray-700">Phone Number</span>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 shadow-sm rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="+1 234 567 890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          {otpSent && (
            <label className="block mt-3">
              <span className="text-sm text-gray-700">OTP</span>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 shadow-sm rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </label>
          )}
          <div className="mt-6">
            <button
              type="button"
              className="w-full py-2 px-4 text-center text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
              onClick={otpSent ? handleVerifyOtp : handleSendOtp}
            >
              {otpSent ? 'Verify OTP' : 'Send OTP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;