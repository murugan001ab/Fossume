import {createContext, useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";
import Loder from './Loder';
import { AuthContext } from './AuthContext';


const SignupPage = () => {

  const [username, setUsername] =useState('');
  const [password, setPassword] =useState('');
  const [error, setError] =useState('');
  const [loading, setLoading] =useState(false);
  const [success, setSuccess] =useState(false);
  // const [isLogged,setIsLogged]=useState(false)
  const navegate=useNavigate();

  const { isLogged, setIsLogged } = useContext(AuthContext);

 const handleLogin = async (e) => {

    e.preventDefault();
    // Perform login logic here
    setLoading(true);
    await axios.post('http://localhost:8000/auth/login/', {
     username,password
    })
    .then((response) => {
      // console.log(response.data);
      setSuccess(true);
      setLoading(false);
      localStorage.setItem('accessToken', response.data.access);
      // console.log(response.data.access)
      localStorage.setItem("refreshToken", response.data.refresh);

      setIsLogged(true);
      navegate("/")
    
    }).catch((error) => {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      setLoading(false);
    });



  }

  return (
    <div className="signup-container">
{loading && (
        <div className="loader-overlay">
          <Loder className="loader" />
        </div>
      )}      <div className={`signup-wrapper ${success ? 'blurred' : ''}`}>
        <div className="signup-info">
          <h2>Create a resume you are proud of</h2>
          <ul>
            <li>Save time with hassle-free templates</li>
            <li>Beat the competition using actionable, contextual advice</li>
            <li> Highlight key achievements with memorable visuals</li>
          </ul>
          <a href="#">Get inspired by 1800+ Free Resume Examples and Templates</a>
        </div>

        <div className="signup-form">
          <h2>Sign in your account</h2>
          {/* <button className="social-btn linkedin">LinkedIn</button>
          <button className="social-btn google">Google</button>
          <button className="social-btn facebook">Facebook</button> */}
          {/* <p>or use your email</p> */}
          <input type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
          <button className="create-account" onClick={(e)=>handleLogin(e)} >Sign In</button>
          <p className="login-options">
            Forgot your password? <a href="#">Reset</a>
          </p>
          <p>First time here? <Link to="/register"> Create an account </Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
