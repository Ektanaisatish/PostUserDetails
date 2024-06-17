import React, { useState } from "react";
import './EditModal.css'
import {toast} from 'react-hot-toast'
const EditModal = ({ isOpen, user, onSave, onCancel }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [website, setWebsite] = useState(user.website);

  const handleSave = () => {
    toast.success("Update successfully")
    onSave({
      id: user.id,
      name,
      email,
      phone,
      website,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal" style={{ display: isOpen ? "block" : "none" }}>
      
      <div className="modal-content">
      <h2>Basic Modal</h2>
        <span className="close" onClick={onCancel}>
          &times;
        </span>
       <div >
          <div className="input-row " style={{marginLeft:"10%"}}>
        <div className="input-group mt-4">
          <label className="m-2">Name:</label>
          <span className="w-50"><input
          type="text"
          value={name}
          style={{margin:"5px"}}
          onChange={(e) => setName(e.target.value)}
        /></span>
        </div>
        <div className="input-group mt-4">
        <label className="m-2">Email:</label>
        <span className="w-50"><input
          type="text"
          value={email}
          style={{margin:"5px"}}
          onChange={(e) => setEmail(e.target.value)}
        /> </span>
        </div>
        <div className="input-group mt-4">
        <label className="m-2">Phone:</label>
        <span className="w-50"><input
          type="text"
          value={phone}
          style={{margin:"5px"}}
          onChange={(e) => setPhone(e.target.value)}
        /></span>
        </div>
        <div className="input-group mt-4">
        <label className="m-2">Website:</label>
        <span className="w-50"><input
          type="text"
          value={website}
          style={{margin:"5px"}}
          onChange={(e) => setWebsite(e.target.value)}
        /></span>
        </div>
        </div>
        <div className="button-container">
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
          <button className="save-button" onClick={handleSave}>Save</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default EditModal;
