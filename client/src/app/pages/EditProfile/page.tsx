"use client";
import React, { useState, useEffect,FormEvent, ChangeEvent } from 'react';
import './EditProfile.css';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';

const EditProfile: React.FC = () => { 
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [user, setUser] = useState<any>(null)

   
  


  

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value);
  const handleLastChange = (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value);
  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value);
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value);
  const handleConfirmNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);

  useEffect(()=>{
    const token:any =localStorage.getItem("token") 
      const decodedToken:any = jwtDecode(token)
      console.log("decodedtoken", decodedToken)
      
      const userid = decodedToken.userId 
     
      console.log("userId", userId)
      setUser(decodedToken)
      console.log("user", user)
   }, [])
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/user/update/${jwtDecode(localStorage.getItem('token'))}`, {
        firstName,
        lastName,
        email,
        address,
      });
      console.log('Profile updated:', response.data);
     
    } catch (error) {
      console.error('Error updating profile:', error);
      
    }
  };

  

  return (
    <div>
      <Navbar/>
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
          <span>Welcome! <a href="#" className="user-name">{jwtDecode(localStorage.getItem('token')).firstName}</a></span>
        </div>

        <h4 className="title">Edit Your Profile</h4>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-control">
              <label>First Name</label>
              <input style={{color:"black"}} type="text" placeholder={jwtDecode(localStorage.getItem('token')).firstName} value={firstName} onChange={handleNameChange} />
            </div>
            <div className="form-control">
              <label>Last Name</label>
              <input style={{color:"black"}} type="text" placeholder={jwtDecode(localStorage.getItem('token')).lastname} value={lastName} onChange={handleLastChange} />
            </div>
          </div>

          <div className="form-group2">
            <div className="form-control">
              <label>Email</label>
              <input style={{color:"black"}} placeholder={jwtDecode(localStorage.getItem('token')).email} type="email" value={email} onChange={handleEmailChange} />
            </div>
            <div className="form-control">
              <label>Address</label>
              <input style={{color:"black"}} placeholder={jwtDecode(localStorage.getItem('token')).address} type="text" value={address} onChange={handleAddressChange} />
            </div>
          </div>

          <div>
            <h3 style={{color:"black"}}>Password Changes</h3>
          </div>

          <div className="password-section">
            <div className="form-group3">
              <div className="form-control">
                <input style={{color:"black"}} className="input-field" type="password" placeholder='Current Password'   />
              </div>
              <div className="form-control">
                <input style={{color:"black"}} className="input-field" type="password" placeholder='New Password'   />
              </div>
              <div className="form-control">
                <input style={{color:"black"}} className="input-field" type="password" placeholder='Confirm New Password'   />
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
    <Footer/>
    </div>
    
  );
};

export default EditProfile;
