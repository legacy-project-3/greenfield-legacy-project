'use client'

import React from "react";
import Navbar from "../../components/navbar/page";
import Footer from "../../components/footer/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from 'axios'
import "./Contact.css";

const Contact = () => {

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [subject, setSubject] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    const sendMessage = ()=>{
        axios.post("http://localhost:5000/sendmail", {
            name:name,
            email: email,
            subject:subject,
            message: message

        }).then(()=>{
            console.log("email send successfully ")
        }).catch((err)=>{
            console.log(err)
        })

    }
  return (
    <div>
      <Navbar />

      <div className="content-container">
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "90px",
            marginLeft: "135px",
            marginBottom: "60px",
          }}
        >
          <div>Home</div>
          <div>/ Contact</div>
        </div>
        <div style={{ display: "flex", gap: "16px", marginLeft: "135px" }}>
          <div
            className="sidelist"
            style={{
              width: "340px",
              height: "457px",
              borderRadius: "4px",
              boxShadow: "0px 1px 13px 0px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              className="divinsidediv"
              style={{
                width: "270px",
                height: "366px",
                marginTop: "40px",
                marginLeft: "35px",
                gap: "32px",
              }}
            >
              <div className="callus">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="phoneicon">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div style={{ marginLeft: "8px" }}>Call To us</div>
                </div>
                <p>We are available 24/7, 7 days a week</p>
                <p>Phone: +88016111122222</p>
              </div>
              <div className="writetous">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="lettericon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div style={{ marginLeft: "8px" }}>Write To Us</div>
                </div>
                <p>Fill out our form and we will contact you within 24 hours.</p>
                <p>Emails: customer@exclusive.com</p>
                <p>Emails: support@exclusive.com</p>
              </div>
            </div>
          </div>
          <div
            className="maincontaxt"
            style={{
              width: "800px",
              height: "457px",
              borderRadius: "4px",
              boxShadow: "0px 1px 13px 0px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              className="inputs&button"
              style={{
                width: "737px",
                height: "377px",
                borderRadius: "4px",
                marginTop: "40px",
                marginLeft: "31px",
                gap: "16px",
              }}
            >
              <div
                className="firstinputs"
                style={{
                  display: "flex",
                  width: "737px",
                  height: "50px",
                  gap: "16px",
                }}
              >
                <div className="input-container">
                  <input
                    className="inputmail"
                    placeholder="Your Name *"
                    required
                    type="text"
                    onChange={(e)=>{setName(e.target.value)}}
                  />
                </div>
                <div className="input-container">
                  <input
                    className="inputmail"
                    placeholder="Your Email *"
                    required
                    type="text"
                    onChange={(e)=>{setEmail(e.target.value)}}
                  />
                </div>
                <div className="input-container">
                  <input
                    className="inputmail"
                    placeholder="subject *"
                    required
                    type="text"
                    onChange={(e)=>{setSubject(e.target.value)}}
                  />
                </div>
              </div>
              <input
                className="mainmessage"
                placeholder="Your message"
                type="text"
                onChange={(e)=>{setMessage(e.target.value)}}
                style={{
                  width: "737px",
                  height: "207px",
                  backgroundColor: "#F5F5F5",
                  marginTop: "16px",
                  textAlign: "center"
                  
                  
                }}
              ></input>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "16px",
                }}
              >
                <button
                  style={{
                    width: "215px",
                    height: "56px",
                    borderRadius: "4px",
                    backgroundColor: "#DB4444",
                    color: "white",
                  }}
                  onClick={()=>{sendMessage()}}
                >
                  Send message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
