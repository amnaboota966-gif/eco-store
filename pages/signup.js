"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !phone || !password) {
      alert("Please fill all fields");
      return;
    }

    const user = { name, phone, password };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Account Created!");
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5">
      <h1 className="text-3xl font-bold mb-6 text-center">Signup</h1>

      <form className="w-full max-w-md p-5 bg-white rounded-lg" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Enter Name"
          className="w-full p-3 border rounded-md mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Phone Number"
          className="w-full p-3 border rounded-md mb-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-md mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-pink-500 text-white py-3 rounded-md font-semibold">
          Create Account
        </button>
      </form>
    </div>
  );
}
