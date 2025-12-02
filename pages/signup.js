import React, { useState } from 'react'

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Please fill all fields")
      return
    }

    localStorage.setItem("userEmail", email)
    localStorage.setItem("userPassword", password)

    alert("Account Created Successfully!")
    window.location.href = "/login"
  }

  return (
    <div style={{ width: 300, margin: "100px auto" }}>
      <h2>Create Account</h2>

      <form onSubmit={handleRegister}>
        <input 
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input 
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button type="submit" style={btn}>Register</button>
      </form>
    </div>
  )
}

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
}

const btn = {
  width: "100%",
  padding: "10px",
  background: "green",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
}

export default Register
