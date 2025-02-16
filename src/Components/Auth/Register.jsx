import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const birthDateRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const profileImageRef = useRef(null);
  const addressRef = useRef(null);


  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hideOrShow, setHideOrShow] = useState("block");

  const navigate = useNavigate();



  

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);





    const formData = new FormData();
    formData.append("firstName", firstNameRef.current.value);
    formData.append("lastName", lastNameRef.current.value);
    formData.append("birthDate", birthDateRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("password", passwordRef.current.value);
    formData.append("address", addressRef.current.value);




    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await fetch("http://localhost:3005/profile/users/Register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User registered:", data);
        navigate("/");
      } else {
        setError(data.message || "Error registering user");
      }
    } catch (err) {
      setError("Error registering user: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };



  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };





  const GoBack = () => {
    setHideOrShow("none");
    navigate("/");
  };



  return (
    <div>
      <img
        onClick={GoBack}
        width="40"
        style={{ marginBottom: "2rem", cursor: "pointer" }}
        height="40"
        src="https://img.icons8.com/ios/50/circled-left-2.png"
        alt="Go Back"
      />



      <form style={{ display: hideOrShow }} className="LOGIN" onSubmit={handleRegister}>
        <label htmlFor="firstName">First Name:</label>
        <br />
        <input type="text" id="firstName" ref={firstNameRef} required />
        <br />
        <br />

        <label htmlFor="lastName">Last Name:</label>
        <br />
        <input type="text" id="lastName" ref={lastNameRef} required />
        <br />
        <br />

        <label htmlFor="birthDate">Birth Date:</label>
        <br />
        <input type="date" id="birthDate" ref={birthDateRef} required />
        <br />
        <br />
        <label htmlFor="address">Address:</label>
        <br />
        <input type="address" id="address" ref={addressRef} required />
        <br />
        <br />

        <label htmlFor="email">Email:</label>
        <br />
        <input type="email" id="email" ref={emailRef} required />
        <br />
        <br />

        <label htmlFor="password">Password:</label>
        <br />
        <input type="password" id="password" ref={passwordRef} required />
        <br />
        <br />

        <label htmlFor="profileImage">Profile Image:</label>
        <br />
        <input
          type="file"
          ref={profileImageRef}
          id="profileImage"
          accept="image/*"
          onChange={handleImageChange}
        />
        <br />
        <br />

        {profileImage && (
          <div>
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Profile Preview"
              width="100"
              height="100"
            />
          </div>
        )}

        {error && <div className="ERROR">{error}</div>}

        <button className="SIGNIN_BTN" type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
        <br />
      </form>
    </div>
  );
};

export default Register;
