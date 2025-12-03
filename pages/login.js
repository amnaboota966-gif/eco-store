"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";  // FIXED

export default function Login() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!phone || !name) {
      alert("Please enter both name and phone number.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      alert(`OTP sent to ${phone}`);
    }, 2000);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (!otp) {
      alert("Please enter OTP.");
      return;
    }

    alert("OTP Verified!");
    router.push("/");
  };

  return (
    <div className="relative min-h-screen">
      {loading && !otpSent && (
        <div className="absolute inset-0 z-50 bg-white flex items-center justify-center">
          <div className="text-center">
            <img src="/logo.jpg" className="h-20 mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Sending OTP...</h1>
            <p className="text-gray-600">Please wait a moment.</p>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center min-h-screen px-5">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {otpSent ? "Enter OTP" : "Enter your details"}
        </h1>

        <form
          className="w-full max-w-md p-5 rounded-lg bg-white"
          onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
        >
          {!otpSent && (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
              />
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
              />

              <p className="text-center text-sm">
                You don't have an account?{" "}
                <Link href="/signup" className="text-pink-600 font-semibold">
                  Register
                </Link>
              </p>
            </>
          )}

          {otpSent && (
            <input
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
          )}

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-md font-semibold"
          >
            {otpSent ? "Verify OTP" : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
