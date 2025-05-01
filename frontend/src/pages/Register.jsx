import React, { useState } from 'react';
import './register.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loder from './Loder';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State for the pop-up message
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setIsLoading] = useState(false); // State to control pop-up visibility
  const [success, setSuccess] = useState(null); // State to control pop-up visibility
  const [green,setGreen]=useState(false);
  const navigate=useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      setIsLoading(true);
      setSuccess(true) // Show loader
      setGreen(true)
      const response = await axios.post('http://localhost:8000/auth/register/', {
        username,
        email,
        password,
      });

      
      setMessage('Verification link sent to your email!');
      setShowMessage(true);
      setIsLoading(false)
      setSuccess(null) 
      // setSuccess(null)
      // Clear form fields
      setEmail('');
      setUsername('');
      setPassword('');

      setTimeout(()=>{
        if (response.status === 201) {
          navigate('/login');
        }
      },3000)

      
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      setMessage('Registration failed. Please try again.');
      setShowMessage(true);
      setIsLoading(false); 
      setSuccess(false)// Hide loader
    } finally {

      setTimeout(() => {
        setIsLoading(false);
        setShowMessage(false);
       // Hide pop-up message after 3 seconds
       setGreen(false)
         // Hide loader
      }, 3000);

    }
  };

  return (
    <div className="signup-container">
      {/* Loader */}
      {loading && (
        <div className="loader-overlay">
          <Loder className="loader" />
        </div>
      )}

      <div className={`signup-wrapper ${success ? 'blurred' : ''}`}>
        <div className="signup-info">
          <h2>Create a resume you are proud of</h2>
          <ul>
            <li>🚀 Save time with hassle-free templates</li>
            <li>💡 Beat the competition using actionable, contextual advice</li>
            <li>🔥 Highlight key achievements with memorable visuals</li>
          </ul>
          <a href="#">Get inspired by 1800+ Free Resume Examples and Templates</a>
        </div>

        <div className="signup-form">
          <h2>Create your account</h2>
          <input
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="checkbox">
            <input type="checkbox" /> I agree to <a href="#">Terms of Service</a>
            
          </div>
          
          <button className="create-account" onClick={handleRegister}>
            CREATE AN ACCOUNT
          </button>
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>

      {/* Pop-up message */}
      {showMessage && <div className={`popup-message ${green ? 'success' : 'error'}`}>{message}</div>}
    </div>
  );
};

export default SignupPage;


