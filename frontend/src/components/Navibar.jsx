import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import { AuthContext } from "./AuthContext";


import './ProfileDropdown.css';
import "./home.css"
import { FiChevronDown } from 'react-icons/fi';
import { FaGlobe } from 'react-icons/fa';




export const Navibar = () => {
    // const [isLogged, setIsLogged] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    // const { isLogged, setIsLogged } = useState(true);
    const navigate=useNavigate();
    const { isLogged, setIsLogged } = useContext(AuthContext);
    
    // const location=useLocation();
   
    
    // const [menuOpen, setMenuOpen] = useState(false); // For burger menu
    
    return (
      <header className={`header ${menuOpen ? "open" : ""}` }>
        <div className="logo">Fossume</div>
        
        {/* Burger Icon */}
        <div
          className={`nav-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
  
        {/* Nav Menu */}
        <nav className={`nav-menu ${menuOpen ? "show" : ""}`}>
          <ul>
            {isLogged && (
              <li>
                <NavLink to="dashboard" className="menu-item">
                  Documents
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="builresume" className="menu-item">
                Build Resume
              </NavLink>
            </li>
            <li>
              <NavLink to="template" className="menu-item">
                Templates
              </NavLink>
            </li>
            {isLogged && (
              <li>
                <NavLink to="ai-assistant" className="menu-item">
                  AI Assistant
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="help" className="menu-item">
                Help
              </NavLink>
            </li>
          </ul>
        </nav>
  
        {/* Authentication Buttons */}
        {isLogged ? (
         <div className={`profile ${menuOpen ? "show" : ""}`}> <ProfileDropdown setIsLogged={setIsLogged} show={menuOpen} /></div>
        ) : (
          <div className={`auth-buttons ${menuOpen ? "show" : ""}`}>
         
              <button className="sign-in" onClick={()=>navigate("/login",{replace:true})} >Sign In</button>
          
            <button className="get-started">Get Started</button>
          </div>
        )}
      </header>
    );
  };



export const ProfileDropdown = ({setIsLogged,show}) => {
    const navigate=useNavigate();
    const [open, setOpen] = useState(false);
    const onLogout= () => {
        setIsLogged(false)
        navigate('/');
  
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
  
        5173
        console.log("logout");
      }
    return (
      <div 
        className="profile-dropdown-container"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen(true)}
  
      >
        <div className="profile-button">
          <div className="profile-avatar">M</div>
          <FiChevronDown size={16} />
        </div>
  
  {open && (
          <div className={`dropdown-menu ${show ? 'show' : ''}`}>
            <div className="dropdown-item"><Link to="/account" >Account</Link></div>
            <div className="dropdown-item logout" onClick={()=>onLogout()} >Log Out</div>
          </div>
        )}
      </div>
    );
  };
  
 
  