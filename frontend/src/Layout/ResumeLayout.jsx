// import React from 'react'

import { useState } from "react";
import "./SideBar.css";
import { PiDropHalfFill } from "react-icons/pi";
import { HiTemplate } from "react-icons/hi";
import { MdSwapVert,MdClose } from "react-icons/md";

import "./resume.css"

import "./resumelayout.css";
import { useEffect } from "react";

const Sidebar = ({setAddElement}) => {
  return (
    <div className="sidebar">
      {/* <div className="sidebar-group">
        <button className="sidebar-btn">↶</button>
        <button className="sidebar-btn disabled">↷</button>
      </div> */}

      <div className="sidebar-group">
        <button className="sidebar-btn"onClick={()=>setAddElement(true)} >✎ Add section</button>
        <button className="sidebar-btn">
          <MdSwapVert className="my-icon" /> Rearrange
        </button>
        <button className="sidebar-btn">
          <HiTemplate className="my-icon" /> Templates
        </button>
        <button className="sidebar-btn">
          <PiDropHalfFill className="my-icon" /> Design & Font
        </button>
      </div>

      <div className="sidebar-group">
        <button className="sidebar-btn">✔ Improve text</button>
        <button className="sidebar-btn">ATS Check</button>
        <button className="sidebar-btn">🤖 AI Assistant</button>
      </div>

      <div className="sidebar-group">
        <button className="sidebar-btn">⬇ Download</button>
      </div>
    </div>
  );
};

const Template = () => {
  return (
    <div className="template">
      <h2>helo</h2>
    </div>
  );
};

const AddSection = ({setAddElement}) => {
    const sections = [
        "Experience",
        "Summary",
        "Skills",
        "Custom",
        "Languages",
        "Training / Courses",
        "Projects",
        "Key Achievements",
        "Strengths",
        "Volunteering",
        "Industry Expertise",
        "Interests",
        
      ];
      useEffect(() => {
        // Disable background scroll
        document.body.style.overflow = "hidden";
    
        return () => {
          // Re-enable scroll when modal closes
          document.body.style.overflow = "auto";
        };
      }, []);

      const handleOverlayClick = (e) => {
        if (e.target.classList.contains("modal")) {
          setAddElement(false);
        //   console.log(e)
        }
      };
  return (
    <div className="modal"onClick={handleOverlayClick} >
      <div className="modal-content">
        <h2>Add a new section</h2>
        <p>Click on a section to add it to your resume</p>

        <div className="grid">
          {sections.map((title) => (
            <div key={title} className="card">
              <h3>{title}</h3>
              <div className="placeholder-text">[Preview content]</div>
            </div>
          ))}
        </div>
    
        <MdClose 
        className="close"
        onClick={() => setAddElement(false)}
        />
      </div>        
    </div>
  );
};




export const ResumeLayout = () => {
  const [addElement, setAddElement] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="page-container">
      {addElement && <AddSection setAddElement={setAddElement} />}
      <Sidebar setAddElement={setAddElement} />
      {/* <Template/> */}
      <div className={`resume ${isHovered ? "hovered" : ""}`}>
        <div className={`name ${isHovered ? "hovered" : ""}`}
        onClick={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}> 
        <input type="text" value="Resume" className="username" name="username"/><br/>
        <input type="text" value="Resume content goes here..|hereherehereherehere|hereherehereherehere." className="role" name="role" /><br/>
        <input type="text" name="phone" className="phone" value="+917312345698" />
        <input type="text" className="email" name="email" value="murugan001ab@gmail.com"/>
        <input type="text" className="link" name="link"value="murugan001ab@gmail.com" />
        <input type="text" className="location" name="location" value="chennai" />
        <div className="profilepic">.</div>
        </div>
       
      </div>
    </div>
  );
};

export default ResumeLayout;
