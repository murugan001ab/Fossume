import React, { useState } from 'react';
import './ProfileDropdown.css';
import { FiChevronDown } from 'react-icons/fi';
import { FaGlobe } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

// const navigate=useNavigate();



const ProfileDropdown = ({setIsLogged,show}) => {
  const navigate=useNavigate();
  const [open, setOpen] = useState(false);
  const onLogout= () => {
      setIsLogged(false)
      navigate('/');

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');


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

export default ProfileDropdown;
