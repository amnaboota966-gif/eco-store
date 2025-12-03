import React, { useState } from "react";
import { useRouter } from "next/router";

const Checkout = () => {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [service, setService] = useState(null);
  const router = useRouter();

  const checkServiceability = async () => {
    try {
      let res = await fetch("/api/pincode");
      let pins = await res.json();
      setService(pins.includes(Number(pin)));
    } catch (err) {
      console.error(err);
    }
  };

  const goToCheckout = () => {
    router.push("/login");
  };

  return (
    <div className="w-full flex justify-center py-10">
      <div className="bg-white shadow-lg p-6 rounded-xl w-80 text-center">

        <h2 className="text-2xl font-semibold text-pink-600 mb-5">
          Checkout
        </h2>

        <div className="flex flex-col items-center space-y-3">

          {/* Name Input */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-pink-600 rounded text-gray-700"
            placeholder="Enter Name"
          />

          {/* Pincode Input */}
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full px-3 py-2 border border-pink-600 rounded text-gray-700"
            placeholder="Enter Pincode"
          />

          {/* Check Button */}
          <button
            onMouseLeave={() => {
              alert("Double click to go to login page then you can buy this");
            }}
            onDoubleClick={goToCheckout}
            onClick={checkServiceability}
            className="w-full text-white bg-pink-500 py-2 rounded hover:bg-pink-600"
          >
            Check
          </button>
        </div>

        {/* Serviceability Message */}
        <div className="mt-5">
          {service === false && (
            <div className="text-red-700 text-lg">
              Sorry! We do not deliver to this pin code yet
            </div>
          )}
          {service === true && (
            <div className="text-green-700 text-lg">
              This pin code is serviceable
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Checkout;
