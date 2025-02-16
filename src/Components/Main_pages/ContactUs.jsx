import React, { useRef, useState } from "react";
import { useNavigate ,useParams} from "react-router-dom";
import '../Styles/ContactUs.css';



const ContactUs = () => {
 
  
  
  
  const PhoneNumberRef = useRef(null);
  const NotesRef = useRef(null);
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  


  const navigate = useNavigate();
  const {userId}=useParams()



  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    const phoneNumber = PhoneNumberRef.current.value;
    const notes = NotesRef.current.value;
    setIsLoading(true);
  
    const token = sessionStorage.getItem('token');
  
    try {
      const response = await fetch(`http://localhost:3005/profile/users/ContactUs/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phoneNumber,
          notes,userId
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send data");
      }
  
      const result = await response.json();
      console.log(result);
  
      // Optionally redirect after success
      navigate("/Products/Grocery"); 
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div>
      <form className="ContactForm" onSubmit={handleSubmit}>
        <label htmlFor="PhoneNumber">Phone number:</label>
        <br />
        <input type="number" id="PhoneNumber" ref={PhoneNumberRef} required />
        <br />
        <br />

        <label htmlFor="Notes">Notes:</label>
        <br />
        <textarea id="Notes" ref={NotesRef} required />
        <br />
        <br />

        {error && <div className="ERROR">{error}</div>}

        <button className="SIGNIN_BTN" type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </button>
        <br />
      </form>
    </div>
  );
};

export default ContactUs;
