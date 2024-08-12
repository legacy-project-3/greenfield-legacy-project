const express = require("express")

const mailrouter =express.Router()
const {sendMail} =require ("../Controllers/mail.js")

mailrouter.post("/sendmail", sendMail)
module.exports = mailrouter