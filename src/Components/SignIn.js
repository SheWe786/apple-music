import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Country/Region");
  const [showEmailForm, setShowEmailForm] = useState(true);
  const navigate = useNavigate();
  const countries = ["Algeria", "Angola" /* Add all the countries here */];
  const [placeholderText, setPlaceholderText] = useState(
    newEmail ? newEmail : "Apple ID"
  );

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleContinueClick = () => {
    // Just switch to the second part of the form
    setShowEmailForm(false);
  };

  const handleSecondContinueClick = async () => {
    // Replace 'user_email' and 'user_password' with actual user input

    const apiUrl = "https://academics.newtonschool.co/api/v1/user/login";

    // Create the request body
    const requestBody = {
      email: email,
      password: password,
      appType: "music",
    };

    // Make the POST request

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        projectID: "f104bi07c490", // Replace with your actual project ID
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response contains a 'token' field
        console.log("my data", data);
        const token = data.token;

        // Check if the response contains a token
        if (token) {
          // Store the token in local storage
          localStorage.setItem("token", token);

          // Hide the email form and show the rest of the form or perform any other action
          setShowEmailForm(false);
          alert("You are logged in!"); // Show an alert
          navigate("/browse");
        } else {
          // Handle the case where no token is received, e.g., show an error message
          console.error("No token received from the API");
        }
      })
      .catch((error) => {
        // Handle any network or API request errors
        console.error("Error fetching data:", error);
      });
  };

  const handleBackClick = () => {
    // Reset the form and show the email input form
    setShowEmailForm(true);
  };

  return (
    <div className="maindiv">
    <div className="signInBox"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "500px",
        height: "500px",
        margin: "0 auto",
        fontFamily: "Arial",
        marginTop: "100px",
        position: "fixed",
        zIndex: 1000,
        background: "lightgray",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        overflow: "auto",
      }}
    >
      {showEmailForm ? (
        <>
        <div className="heading">
          <h1 style={{ marginBottom: "20px" }}>Sign In or Sign Up</h1>
          <h2 style={{ marginBottom: "20px" }}>
            Enter your email to get started.
          </h2></div>
          <label style={{ marginBottom: "0px" }}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Apple ID"
              style={{
                width: "300px",
                height: "55px",
                padding: "20px",
                fontSize: "15px",
                borderRadius: "5px",
              }}
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{
                width: "300px",
                marginBottom: "10px",
                height: "55px",
                padding: "20px",
                fontSize: "15px",
                borderRadius: "5px",
              }}
            />
          </label>
          <a style={{ marginBottom: "20px" }} href="#">
            Forgot Apple ID or Password?
          </a>
          <button
            onClick={handleContinueClick}
            style={{
              backgroundColor: "pink",
              width: "300px",
              height: "45px",
              borderRadius: "9px",
              fontSize: "18px",
            }}
          >
            Continue
          </button>
        </>
      ) : (
        <div
          style={{
            height: "300px",
            width: "400px",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>Create Apple ID</h2>
          <label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Apple ID"
              style={{
                width: "500px",
                height: "55px",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "9px",
              }}
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{
                width: "500px",
                marginBottom: "10px",
                height: "55px",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
              }}
            />
          </label>
          <p style={{ fontSize: "12px", marginBottom: "20px" }}>
            Your password must have 8 or more characters, upper and lowercase
            letters, and at least one number.
          </p>
          <label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              style={{
                width: "500px",
                marginBottom: "10px",
                height: "55px",
                marginBottom: "15px",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
              }}
            />
          </label>
          <label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              style={{
                width: "500px",
                marginBottom: "10px",
                height: "55px",
                marginBottom: "15px",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
              }}
            />
          </label>
          <label>
            <input
              type="date"
              name="birthday"
              placeholder="Birthday"
              style={{
                width: "500px",
                marginBottom: "10px",
                height: "55px",
                marginBottom: "15px",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
              }}
            />
          </label>
          <label style={{ marginBottom: "20px" }}>
            <select
              style={{
                width: "500px",
                marginBottom: "10px",
                height: "55px",
                marginBottom: "15px",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
              }}
              onChange={handleCountryChange}
            >
              <option value="Country/Region" disabled selected>
                {selectedCountry}
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>

          <label>
            Apple Updates:
            <input type="checkbox" name="appleUpdates" />
          </label>

          <p style={{ fontSize: "11px" }}>
            Receive Apple emails and communications including new releases,
            exclusive content, special offers, and marketing and recommendations
            for apps, music, movies, TV, books, podcasts, Apple Pay, and more.
          </p>

          <label>
            Agree to Terms & Conditions:
            <input type="checkbox" name="termsAndConditions" />
          </label>

          <p style={{ fontSize: "11px" }}>
            By selecting Continue, you agree to the Apple Media Services Terms &
            Conditions and acknowledge that you will be signed in on this
            browser.
          </p>

          <button
            onClick={handleBackClick}
            style={{
              backgroundColor: "gray",
              width: "150px",
              height: "45px",
              borderRadius: "9px",
              fontSize: "18px",
              // marginRight: "5px"
            }}
          >
            Back
          </button>
          <button
            onClick={handleSecondContinueClick}
            style={{
              backgroundColor: "pink",
              width: "150px",
              height: "45px",
              borderRadius: "9px",
              fontSize: "18px",
            }}
          >
            Continue
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default SignIn;
