"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import './EditProfile.css';

const EditProfile: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [last, setLast] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleLastChange = (e: ChangeEvent<HTMLInputElement>) => setLast(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value);
  const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value);
  const handleConfirmNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setConfirmNewPassword(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add logic to save the data here
    console.log('Form submitted with data:', {
      name,
      last,
      email,
      address,
      currentPassword,
      newPassword,
      confirmNewPassword
    });
    // Additional logic for validation, API calls, etc.
  };

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <a href="/" className="logo-text">Home / My Account</a>
        </div>
        <h3>Manage My Account</h3>
        <nav className="nav">
          <ul style={{ marginTop: "25px" }}>
            <li className="active"><a href="#">My Profile</a></li>
            <li style={{ marginLeft: "20px" }}><a href="#">Address Book</a></li>
            <li style={{ marginLeft: "20px" }}><a href="#">My Payment Options</a></li>
            <h3 style={{ marginTop: "20px",color:"black"}}>My Orders</h3>
            <li style={{ marginTop: "20px", marginLeft: "20px" }}><a href="#">My Returns</a></li>
            <li style={{ marginLeft: "20px" }}><a href="#">My Cancellations</a></li>
            <h3><a href="#">My Wishlist</a></h3>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="welcome">
          <span>Welcome! <a href="#" className="user-name">Md Rimel</a></span>
        </div>

        <h4 className="title">Edit Your Profile</h4>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-control">
              <label>First Name</label>
              <input   style={{color:"black"}} type="text" value={name} onChange={handleNameChange} />
            </div>
            <div className="form-control">
              <label>Last Name</label>
              <input style={{color:"black"}}  type="text" value={last} onChange={handleLastChange} />
            </div>
          </div>

          <div className="form-group2">
            <div className="form-control">
              <label>Email</label>
              <input   style={{color:"black"}} type="email" value={email} onChange={handleEmailChange} />
            </div>
            <div className="form-control">
              <label>Address</label>
              <input   style={{color:"black"}} type="text" value={address} onChange={handleAddressChange} />
            </div>
          </div>

          <div>
            <h3 style={{color:"black"}}>Password Changes</h3>
          </div>

          <div className="password-section">
            <div className="form-group3">
              <div className="form-control">
                <input style={{color:"black"}} className="input-field" type="password" placeholder='Current Password' value={currentPassword} onChange={handleCurrentPasswordChange} />
              </div>
              <div className="form-control">
                <input style={{color:"black"}} className="input-field" type="password" placeholder='New Password' value={newPassword} onChange={handleNewPasswordChange} />
              </div>
              <div className="form-control">
                <input  style={{color:"black"}} className="input-field" type="password" placeholder='Confirm New Password' value={confirmNewPassword} onChange={handleConfirmNewPasswordChange} />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button">Cancel</button>
            <button type="submit" className="save-button">Save Changes</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProfile;

