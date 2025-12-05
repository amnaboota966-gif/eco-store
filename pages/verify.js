import { useState } from "react";
import { useRouter } from "next/router";

export default function Verify() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  localStorage.setItem("logged", "true");
localStorage.setItem("username", name);


  const verifyOtp = () => {
    const original = localStorage.getItem("otp");

    if (otp == original) {
      router.push("/welcome");
    } else {
      alert("Incorrect OTP");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-3xl font-bold mb-6 text-center">Enter OTP</h1>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full mb-4 p-3 rounded bg-gray-700"
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={verifyOtp}
          className="w-full p-3 bg-green-600 rounded hover:bg-green-700"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
