import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Checkout = () => {
  const [pin, setPin] = useState(""); // ✅ define pin
  const [service, setService] = useState(null);
  const router = useRouter(); // <-- needed for navigation

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
    router.push("/login"); // <-- navigate programmatically
  };

  return (
    <div>
      <div className="pin flex mt-6 space-x-2 text-xl justify-center ">
       
      <input
        type="text"
        value={""}
        className="px-47 border border-pink-600 rounded  text-grey "
        placeholder="Enter Name"
      />
      <br/><br/><br/>
        <input
          type="text"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="px-36 border border-pink-600 rounded"
          placeholder="Enter Pincode"
        />
        <button
          onMouseLeave={() => {
            alert("Double click to go to login page then you can buy this"); // ✅ simple browser alert
          }}
          onDoubleClick={goToCheckout}
          onClick={checkServiceability}
          className="text-white bg-pink-500 py-2 px-6 rounded hover:bg-pink-600"
        >
          Check
        </button>
      </div>

      <div className="justify-center">
        {service === false && (
          <div className="text-red-700 text-2xl mt-5 justify-center">
            Sorry! We do not deliver to this pin code yet
          </div>
        )}
        {service === true && (
          <div className="text-green-700 text-2xl mt-5 justify-center">
            This pin code is serviceable
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
