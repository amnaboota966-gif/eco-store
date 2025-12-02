import React from 'react'

const Contact = () => {
  return (
    <div style={{ 
      maxWidth: "400px",
      margin: "40px auto",
      padding: "20px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    }}>
      
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Contact Us
      </h2>

      <form>

        <label>Name</label>
        <input 
          type="text" 
          placeholder="Enter your name"
          style={inputStyle}
        />

        <label>Email</label>
        <input 
          type="email" 
          placeholder="Enter your email"
          style={inputStyle}
        />

        <label>Message</label>
        <textarea 
          placeholder="Write your message"
          style={{ ...inputStyle, height: "100px" }}
        />

        <button 
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            background: "blue",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Submit
        </button>

      </form>
    </div>
  )
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  marginBottom: "15px",
  borderRadius: "5px",
  border: "1px solid #ccc"
}

export default Contact
