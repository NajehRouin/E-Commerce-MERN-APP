const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const nodemailer = require('nodemailer');

const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())




 // Email sending endpoint.
 app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;
  
    // Configurer le transporteur (SMTP)
    let transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user:process.env.mail , 
        pass: process.env.password,  
      },
    });

  
    // Options de l'email
    let mailOptions = {
      from: process.env.mail, 
      to,                            
      subject,                       
      text,                           
    };
  
    try {
      // Envoyer l'email
      let info = await transporter.sendMail(mailOptions);
      console.log('Email envoyé: ' + info.response);
      res.status(200).send('Email envoyé');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email: ', error);
      res.status(500).send('Erreur lors de l\'envoi de l\'email');
    }
  });


app.use("/api",router)

const PORT = 8080 || process.env.PORT


connectDB().then(()=>{
    app.listen(PORT,()=>{
        
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})
