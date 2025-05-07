// import React from 'react'

import { useRef, useEffect, useState } from "react";
import "./SideBar.css";
import { PiDropHalfFill } from "react-icons/pi";
import { HiTemplate } from "react-icons/hi";
import { MdSwapVert, MdClose } from "react-icons/md";
import { IoChevronBackOutline } from "react-icons/io5";

import "./resume.css"

import "./resumelayout.css";
import "./Custom.css"

const Sidebar = ({ setAddElement }) => {
  return (
    <div className="sidebar">
      {/* <div className="sidebar-group">
        <button className="sidebar-btn">↶</button>
        <button className="sidebar-btn disabled">↷</button>
      </div> */}

      <div className="sidebar-group">
        <button className="sidebar-btn" onClick={() => setAddElement(true)} >✎ Add section</button>
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
const Custom = () => {
  const [sectionTitle, setSectionTitle] = useState("SECTION TITLE");
  const [fields, setFields] = useState({
    title: true,
    description: true,
    date: false,
    icon: false,
  });

  const toggleField = (field) => {
    setFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="modal" >
      <div className="modal-content custom">
        <IoChevronBackOutline className="back" size={"20px"}/>

        <h2>Custom Section</h2>
        <div className="custom-section-container">

          <div className="custom-preview">
            <h3 className="sect">SectionTitle</h3>
            <div className="element">
            {fields.title && <div><strong>Title</strong></div>}
            {fields.date && <div><em>Date</em></div>}
            {fields.description && <div className="des">Description</div>}
           
            
            </div>
          </div>

          <div className="custom-controls">
            <p>What shoud this section have ?</p>
            <label>
              <input type="checkbox" checked={fields.title} onChange={() => toggleField("title")} />
              Title
            </label>
            <label>
              <input type="checkbox" checked={fields.date} onChange={() => toggleField("date")} />
              Date
            </label>

            <label>
              <input type="checkbox" checked={fields.description} onChange={() => toggleField("description")} />
              Description
            </label>
            
           
            
          </div>



        </div>

        <button className="add-section-btn" onClick={() => onAdd({ sectionTitle, fields })}>
          Add Section
        </button>


        <MdClose
          className="close"
          onClick={() => setAddElement(false)}
        />
      </div>
    </div>
  );
};

const AddSection = ({ setAddElement, setCustom }) => {
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
    <div className="modal" onClick={handleOverlayClick} >
      <div className="modal-content">
        <h2>Add a new section</h2>
        <p>Click on a section to add it to your resume</p>

        <div className="grid">
          {sections.map((title) => (
            <div key={title} className="card" onClick={() => {

              // setAddElement(false)
              if (title == "Custom") {
                setAddElement(false)
                setCustom(true)
                // <Custom/>

              }

            }} >
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
  const [custom, setCustom] = useState(false)
  const [isHovered, setIsHovered] = useState(false);
  const [value, setValue] = useState("");
  const spanRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.style.width = spanRef.current.offsetWidth + "px";
  }, [value]);

  return (
    <div className="page-container">
      {addElement && <AddSection setAddElement={setAddElement} setCustom={setCustom} />}
      {custom && <Custom setCustom={setCustom} />}


      <Sidebar setAddElement={setAddElement} />
      {/* <Template/> */}
      <div className={`resume ${isHovered ? "hovered" : ""}`}>
        <div className={`name ${isHovered ? "hovered" : ""}`}
          onClick={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <div type="text" value="Resume" className="username" name="username">  <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ fontSize: "16px", padding: "5px", backgroundColor: 'red' }}
          />
            <span
              ref={spanRef}
              style={{ visibility: "hidden", position: "absolute", whiteSpace: "pre", fontSize: "16px", backgroundColor: 'yelo' }}
            >
              {value || " "}
            </span></div>
          <input type="text" value="Resume content goes here..|hereherehereherehere|hereherehereherehere." className="role" name="role" /><br />
          <input type="text" name="phone" className="phone" value="+917312345698" />
          <input type="text" className="email" name="email" value="murugan001ab@gmail.com" />
          <input type="text" className="link" name="link" value="murugan001ab@gmail.com" />
          <input type="text" className="location" name="location" value="chennai" />
          <div className="profilepic">.</div>
        </div>
        <div>
          .
        </div>

      </div>

    </div>
  );
};

export default ResumeLayout;
