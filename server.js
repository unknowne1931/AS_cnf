const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv')
const nodemailer = require('nodemailer');
const authMiddleware = require('./module/midel1');
const AdminAuth = require('./module/adminauth');
const { error } = require('console');
const fs = require('fs')
const https = require('https')
// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(express.static('public'))
app.use(express.json());
app.use(bodyParser.json());
const ap = express();



app.use(cors({
    origin: ["https://durgansathleticsacademy.in"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));


const Time = new Date().toLocaleString();
// MongoDB connection
// const mongoURI = "mongodb+srv://instasecur24:KicK@as.ajw4rzj.mongodb.net/?retryWrites=true&w=majority&appName=AS"
const mongoURI = "mongodb+srv://durgansathleticsacademy:ysKUdccnJ5Q94ihU@as.tlrlypo.mongodb.net/?retryWrites=true&w=majority&appName=AS";
mongoose.connect(mongoURI,)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));



//https

const key = fs.readFileSync('private.key')
const cert = fs.readFileSync('certificate.crt')
const cred = {
  key,
  cert
}

const httpsServer = https.createServer(cred, app)
httpsServer.listen(443);
//https end



// Basic route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

ap.get('/', (req, res) => {
    res.send('Hello, world!');
  });

let transporter2 = nodemailer.createTransport({
    service: 'gmail', // You can use any email service
    auth: {
        user: 'krishnakick1931@gmail.com',
        pass: 'lkdq afqf rsby laww' // Be careful with your email password
    }
  });

const SendEr = (error) =>{
    let mailOptions = {
        from: 'krishnakick1931@gmail.com', // Sender address
        to: "unknowne1931@gmail.com", // List of recipients
        subject: `Error Found`, // Subject line
        text: '', // Plain text body
        html: `
          
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="refresh" content="3" />
            <title>Document</title>
            <style>
    
                @import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400;700&display=swap');
    
    
                .email-main-cnt-01{
                    width: 95%;
                    justify-content: center;
                    margin: auto;
                }
    
                .email-cnt-01{
                    width: 90%;
                    height: auto;
                    display: flex;
                    margin: 10px;
                }
    
                .email-cnt-01 div{
                    width: 50px;
                    height: 50px;
                    overflow: hidden;
                    border-radius: 50%;
                    border: 1px solid;
                    
                }
    
                .email-cnt-01 div img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
    
                .email-cnt-01 strong{
                    font-family: Inknut Antiqua;
                    margin-left: 10px;
                }
    
    
    
            </style>
        </head>
        <body>
            <div class="email-main-cnt-01">
                <div class="email-cnt-01">
                    <strong>Found Error On Durgans Athletics Academy</strong>
                </div>
                <div class="email-cnt-02">
                    <span><strong>Congratulation, ${FulName}</strong> </span><br/>
                    <p>Found Error<br/>
                    <strong>${error}</strong
                    </p>
    
                    <strong>Fix It</strong>
    
                </div>
            </div>
            
        </body>
        </html>
    
        ` // HTML body
      };
      
      // Send email
      transporter2.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        return res.json({Status : "OK"})
      });
}

const ImagesSchema = new mongoose.Schema({
      
  Time : String,
  image : String,
  Username : String,
  docu : String,
  typedoc : String

});
  
const Imagemodule = mongoose.model('Images', ImagesSchema);

const UserSchema = new mongoose.Schema({
      
  Time : String,
  first_name : String,
  last_name : String,
  father_name : String,
  mother_name : String,
  date_of_birth : String,
  aadhar_no : String,
  address : String,
  t_shirt_size : String,
  mobile_no : String,
  email : String,
  Gender : String,
  Username : String,
  event1 : String,
  event2 : String,
  pass : String,
  valid : String

});
  
const Usermodule = mongoose.model('User', UserSchema);

const ProfileSchema = new mongoose.Schema({
      
  Time : String,
  image : String,
  Username : String,

});
  
const ProfileImgmodule = mongoose.model('Profile', ProfileSchema);



const storage = multer.diskStorage({
  destination : function (req, file, cb) {
    cb(null, "public/images");
  },
  filename : function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix+ file.originalname);
  },
})

const upload = multer({ storage : storage});





app.post('/upload', upload.single('image'), async (req, res) => {
  const imageName = req.file.filename;
  const {email, docu, typedoc} = req.body;
  try{
    const userrs = await Usermodule.findOne({email})
    if(userrs){
      const User = await Imagemodule.find({Username : userrs.Username})
      if(User){
        if(User.length <= 2){
          await Imagemodule.create({image : imageName, Username : userrs.Username, docu, typedoc})
          res.json({Status : "OK"})
        }else{
          return res.json({Message : "Document Posted"})
        }
      }else{
        await Imagemodule.create({image : imageName, Username : userrs.Username, docu, typedoc})
        res.json({Status : "OK"})
      }
    }
  } catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
});

// Create a transporter
let transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any email service
  auth: {
      user: 'durgansathleticsacademy@gmail.com',
      pass: 'mhtr imfr faue eznl' // Be careful with your email password
  }
});


// Set up email data


app.post("/post/users/data", async (req, res) =>{
  const {first_name,
      last_name,
      father_name,
      mother_name,
      date_of_birth,
      aadhar_no,
      address,
      t_shirt_size,
      mobile_no,
      email,
      Gender,
      event1, 
      event2,
      pass} = req.body;
      
  try{
    //DAAM24143

    //DAAF24140

    const Users = await Usermodule.findOne({email})
    const FulName = first_name +" "+ last_name
    if(!Users){
      if(Gender === "Male"){
        const Mal = await Usermodule.find({Gender})
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear()
        const yearString = currentYear.toString();
        const lastTwoDigits = yearString.slice(-2);
        const MalLen = `DAAM${lastTwoDigits}${Mal.length+143}`
        const valid = "no"
        const image = "default.png"
        const Time = new Date().toLocaleString();
        bcrypt.hash(pass, 10)
        .then(hash =>{
          Usermodule.create({Time,first_name, last_name, father_name, mother_name, date_of_birth, aadhar_no, address, t_shirt_size, mobile_no, email, Gender, Username : MalLen, event1, event2, pass : hash, valid})
          ProfileImgmodule.create({Time, image, Username : MalLen})
        })
        let mailOptions = {
          from: 'durgansathleticsacademy@gmail.com', // Sender address
          to: `${email}`, // List of recipients
          subject: `Congratulation, ${FulName}`, // Subject line
          text: '', // Plain text body
          html: `
            
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="refresh" content="3" />
              <title>Document</title>
              <style>

                  @import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400;700&display=swap');


                  .email-main-cnt-01{
                      width: 95%;
                      justify-content: center;
                      margin: auto;
                  }

                  .email-cnt-01{
                      width: 90%;
                      height: auto;
                      display: flex;
                      margin: 10px;
                  }

                  .email-cnt-01 div{
                      width: 50px;
                      height: 50px;
                      overflow: hidden;
                      border-radius: 50%;
                      border: 1px solid;
                      
                  }

                  .email-cnt-01 div img{
                      width: 100%;
                      height: 100%;
                      object-fit: cover;
                  }

                  .email-cnt-01 strong{
                      font-family: Inknut Antiqua;
                      margin-left: 10px;
                  }



              </style>
          </head>
          <body>
              <div class="email-main-cnt-01">
                  <div class="email-cnt-01">
                      <strong>Durgans Athletics Academy</strong>
                  </div>
                  <div class="email-cnt-02">
                      <span><strong>Congratulation, ${FulName}</strong> </span><br/>
                      <p>Your application has been successful submited,<br/>
                          Your DAA ID, Issued, But Document Authentication<br />
                          is Pending , in Between 24 Hours you can get<br/>
                          new Email Then You can login in to the <br />
                          Durgan's athletics academy using the following <br />
                          Username and Password</p>

                      <strong>Username : ${MalLen}</strong><br/>
                      <strong>Password : ${pass}</strong><br/><br/>

                      <strong>Thankyou</strong>

                  </div>
              </div>
              
          </body>
          </html>

          ` // HTML body
        };
        
        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          return res.json({Status : "OK"})
        });
  
      }else{
        const Mal = await Usermodule.find({Gender})
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear()
        const image = "default.png"
        const valid = "no"
        const yearString = currentYear.toString();
        const lastTwoDigits = yearString.slice(-2);
        const MalLen = `DAAM${lastTwoDigits}${Mal.length+141}`
        const Time = new Date().toLocaleString();
        bcrypt.hash(pass, 10)
        .then(hash =>{
          Usermodule.create({Time,first_name, last_name, father_name, mother_name, date_of_birth, aadhar_no, address, t_shirt_size, mobile_no, email, Gender, Username : MalLen, event1, event2, pass : hash, valid})
          ProfileImgmodule.create({Time, image, Username : MalLen})
        })
          let mailOptions = {
            from: 'durgansathleticsacademy@gmail.com', // Sender address
            to: `${email}`, // List of recipients
            subject: `Congratulation, ${FulName}`, // Subject line
            text: '', // Plain text body
            html: `
            
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="refresh" content="3" />
                <title>Document</title>
                <style>

                    @import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400;700&display=swap');


                    .email-main-cnt-01{
                        width: 95%;
                        justify-content: center;
                        margin: auto;
                    }

                    .email-cnt-01{
                        width: 90%;
                        height: auto;
                        display: flex;
                        margin: 10px;
                    }

                    .email-cnt-01 div{
                        width: 50px;
                        height: 50px;
                        overflow: hidden;
                        border-radius: 50%;
                        border: 1px solid;
                        
                    }

                    .email-cnt-01 div img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .email-cnt-01 strong{
                        font-family: Inknut Antiqua;
                        margin-left: 10px;
                    }



                </style>
            </head>
            <body>
                <div class="email-main-cnt-01">
                    <div class="email-cnt-01">
                        <strong>Durgans Athletics Academy</strong>
                    </div>
                    <div class="email-cnt-02">
                      <span><strong>Congratulation, ${FulName}</strong> </span><br/>
                      <p>Your application has been successful submited,<br/>
                          Your DAA ID, Issued, But Document Authentication<br />
                          is Pending , in Between 24 Hours you can get<br/>
                          new Email Then You can login in to the <br />
                          Durgan's athletics academy using the following <br />
                          Username and Password</p>

                      <strong>Username : ${MalLen}</strong><br/>
                      <strong>Password : ${pass}</strong><br/><br/>

                      <strong>Thankyou</strong>

                  </div>
                </div>
                
            </body>
            </html>

            ` // HTML body
          };
          
          // Send email
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            return res.json({Status : "OK"})
          });
  
      }
    }else{
      return res.json({Status : "IN"})
    }


  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }

})



const PaymentSchema = new mongoose.Schema({
      
  Time : String,
  image : String,
  Username : String,
  trn : String,


});
  
const Paymentmodule = mongoose.model('Payment', PaymentSchema);

const storage1 = multer.diskStorage({
  destination : function (req, file, cb) {
    cb(null, "public/payment");
  },
  filename : function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix+ file.originalname);
  }, 
})

const upload1 = multer({ storage : storage1});

app.post("/payment/proofs", upload1.single('image'), async (req, res) =>{
  const image = req.file.filename;
  const {email, trn} = req.body
  try{

    const users = await Usermodule.findOne({email})
    if(users){
      const User = await Paymentmodule.findOne({Username : users.Username})
      if(User){
        return res.json({Status : "IN"})
      }else{
        await Paymentmodule.create({Username : users.Username, image, trn})
        return res.json({Status : "OK"})
      }
    }else{

    }

  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})


app.post("/get/login/data",async (req, res)=>{
  const {Username, pass} = req.body;

  try{
    const User = await Usermodule.findOne({Username})
    if(User){
      if(User.valid === "yes"){
        bcrypt.compare(pass, User.pass, (err, responce) =>{
          if(responce){
            const token = jwt.sign({Username : User.Username}, "durgans_@thletics_@cademy_with_1931", {expiresIn : "1d"})
            res.json({Status : "OK", token})
          }else{
            return res.json({Status: "BAD"})
          }
        })
      }else if(User.valid === "no"){
        res.json({Status : "NOT VALID"})
      }
      else{
        res.json({"message" : "No User Found"})
      }
    }else{
      res.json({"message" : "No User Found"})
    }

  } catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
  
})


app.get("/profile/data/get/:Username", authMiddleware, async(req, res)=>{
  const Username = req.params.Username;
  
  try{
    const User = await Usermodule.findOne({Username})
    if(User){
      const data = {
        name : User.Username,
        dob : User.date_of_birth,
        f_name : User.first_name,
        l_name : User.last_name,
        father : User.father_name,
        mother : User.mother_name,
        aadhar : User.aadhar_no,
        addres : User.address,
        t_shrt : User.t_shirt_size,
        mobile : User.mobile_no,
        email : User.email,
        event1 : User.event1,
        event2 : User.event2,
        gender : User.Gender,
      }
      return res.json({data})
    }else{
      return res.json({Status : "No USER"})
    }
  } catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

app.get("/get/profile/pic/by/:Username", authMiddleware,async (req, res)=>{
  const Username = req.params.Username;
  try{
    const User = await Imagemodule.find({Username})
    if(User){  
      return res.json({User})
    }else{
      return res.json({Status : "No USER"})
    }
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

app.get("/get/profile/pic/by/admin/:Username", AdminAuth,async (req, res)=>{
  const Username = req.params.Username;
  try{
    const User = await Imagemodule.find({Username})
    if(User){  
      return res.json({User})
    }else{
      return res.json({Status : "No USER"})
    }
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})


const storage2 = multer.diskStorage({
  destination : function (req, file, cb) {
    cb(null, "public/profile");
  },
  filename : function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix+ file.originalname);
  }, 
})

const upload2 = multer({ storage: storage2 });

app.post("/post/get/profile/pic/and/save", upload2.single('image'), async (req, res) => {
  const { Username } = req.body;
  const image = req.file.filename;

  try {
    const User = await ProfileImgmodule.findOne({ Username });
    const Time = new Date().toLocaleString();

    if (User) {
      User.image = image; // Save the file path in the database
      User.Time = Time;
      await User.save();
      return res.json({ Status: "OK" });
    } else {
      return res.json({ Status: "BAD" });
    }
  } catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
});

// Make sure to include necessary middlewares to parse the body

app.get("/profile/get/by/singel/:Username", authMiddleware ,async (req, res)=>{
  const Username = req.params.Username;

  try{
    const User = await ProfileImgmodule.findOne({Username})
    if(User){
      return res.json({User})
    }else{
      return res.json({Status : "No USER"})
    }
  } catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

app.post("/pu/password/by/username", async (req, res) => {
  const { Username, pass, oldpass } = req.body;
  
  try {
    // Find user by username
    const User = await Usermodule.findOne({ Username });
    
    if (!User) {
      return res.json({ Status: "No USER" });
    }

    // Compare old password
    const isMatch = await bcrypt.compare(oldpass, User.pass);
    if (!isMatch) {
      return res.json({ Status: "BAD" });
    }

    // Hash the new password
    const hash = await bcrypt.hash(pass, 10);
    
    // Update the user's password and time
    User.pass = hash;
    User.Time = new Date().toLocaleString();
    await User.save();

    return res.json({ Status: "OK" });
  } catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
});


app.post("/get/and/find/username/to/email", async (req, res) =>{
  const {data} = req.body;
  try{
    const User = await Usermodule.findOne({
      $or: [{ Username: data.trim() }, { email: data.trim() }]
    });
    if(User){
      const token = jwt.sign({Username : User.Username}, "durgans_@thletics_@cademy_with_1931_change_password", {expiresIn : "3h"})
      // return res.json({Status : "OK" ,User})
      let mailOptions = {
        from: 'durgansathleticsacademy@gmail.com', // Sender address
        to: `${User.email}`, // List of recipients
        subject: `Change Account Password`, // Subject line
        text: '', // Plain text body
        html: `
        
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="refresh" content="30" />
                <title>Document</title>
                <style>

                    @import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400;700&display=swap');


                    .email-main-cnt-01{
                        width: 95%;
                        justify-content: center;
                        margin: auto;
                    }

                    .email-cnt-01{
                        width: 90%;
                        height: auto;
                        display: flex;
                        margin: 10px;
                    }

                    .email-cnt-01 div{
                        width: 50px;
                        height: 50px;
                        overflow: hidden;
                        border-radius: 50%;
                        border: 1px solid;
                        
                    }

                    .email-cnt-01 div img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .email-cnt-01 strong{
                        font-family: Inknut Antiqua;
                        margin-left: 10px;
                    }

                    .email-cnt-btn-01{
                        width: 120px;
                        height: 30px;
                        margin: 10px;
                        color: aliceblue;
                        background-color: rgb(5, 148, 195);
                        border: 1px solid;
                        border-radius: 5px;
                        cursor: pointer;
                    }


                </style>
            </head>
            <body>
                <div class="email-main-cnt-01">
                    <div class="email-cnt-01">
                        <strong>Durgans Athletics Academy</strong>
                    </div>
                    <div class="email-cnt-02">
                        <span><strong>Change your's, Account ${User.Username} Password</strong> </span><br/>
                        <p>Your Account need Attention to Change<br />
                            Password. You can Navigate to page, to change<br />
                            Durgan's athletics academy Account Password.<br />
                            By Clicking on Change Password</p>
                            <a href = "http://localhost:3000/password?token=${token}&username=${User.Username}&page=true" style="text-decoration: none;">Chnage Password</a>
                        <strong></strong><br/>
             
                        <strong>Thank you</strong>

                    </div>
                </div>
                
            </body>
            </html>

        ` // HTML body
      };
      
      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
      
        return res.json({Status : "OK"})
      });

    }else{
      return res.json({Status : "NO USER"})
    }
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

app.post("/verify/token/to/change/password", async (req, res)=>{
  const {token, Username, pass} = req.body;
  try{
    const decoded = jwt.verify(token, 'durgans_@thletics_@cademy_with_1931_change_password'); // Replace 'durgans_@thletics_@cademy_with_1931' with your actual secret
    if(decoded.Username == Username){
      const User = await Usermodule.findOne({Username : decoded.Username})
      const hash = await bcrypt.hash(pass, 10);
    
    // Update the user's password and time
      User.pass = hash;
      User.Time = new Date().toLocaleString();
      await User.save();
      return res.json({Status : "OK"})

    }else{
      console.log({Status : "NOT VALID"})
    }
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

const AdminUserSchema = new mongoose.Schema({
      
  Time : String,
  email : String,
  pass : String,
  role : String,

});
  
const AdminUsermodule = mongoose.model('Admin', AdminUserSchema);

const OTPSchema = new mongoose.Schema({
      
  Time : String,
  email : String,
  otp : String,

});
  
const OTPmodule = mongoose.model('OTP', OTPSchema);

app.get("/get/otp/new", async (req, res) => {
  try {
    const dat = await OTPmodule.find({});
    return res.json(dat);
  } catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
});


// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

app.post("/generate/otp/to/admin", async (req, res)=>{
  const {email} = req.body;
  try{
    const User = await OTPmodule.findOne({email})
    const otp = generateOTP();
    const Time = new Date().toLocaleString();
    if(User){
      await OTPmodule.findByIdAndDelete({_id : User._id})
      const UserSend = await OTPmodule.create({email, otp, Time})
      let mailOptions = {
        from: 'durgansathleticsacademy@gmail.com', // Sender address
        to: "nagarajrunner@gmail.com", // List of recipients
        subject: `DAA, Admin Login OTP`, // Subject line
        text: '', // Plain text body
        html: `
        
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="refresh" content="30" />
                <title>Document</title>
                <style>

                    @import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400;700&display=swap');


                    .email-main-cnt-01{
                        width: 95%;
                        justify-content: center;
                        margin: auto;
                    }

                    .email-cnt-01{
                        width: 90%;
                        height: auto;
                        display: flex;
                        margin: 10px;
                    }

                    .email-cnt-01 div{
                        width: 50px;
                        height: 50px;
                        overflow: hidden;
                        border-radius: 50%;
                        border: 1px solid;
                        
                    }

                    .email-cnt-01 div img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .email-cnt-01 strong{
                        font-family: Inknut Antiqua;
                        margin-left: 10px;
                    }

                    .email-cnt-btn-01{
                        width: 120px;
                        height: 30px;
                        margin: 10px;
                        color: aliceblue;
                        background-color: rgb(5, 148, 195);
                        border: 1px solid;
                        border-radius: 5px;
                        cursor: pointer;
                    }


                </style>
            </head>
            <body>
                <div class="email-main-cnt-01">
                    <div class="email-cnt-01">
                        <strong>Durgans Athletics Academy</strong>
                    </div>
                    <div class="email-cnt-02">
                        <span><strong>Login, Admin Account ${UserSend.email}</strong> </span><br/>
                        <p>Your Account need Attention to Login<br />
                            By Authentication to Admin Account<br />
                            This is Your's OTP to Login ${UserSend.otp}<br />
                            Don't Share OTP</p>
                            
                        <strong>OTP ${UserSend.otp}</strong><br/>
             
                        <strong>Thank you</strong>

                    </div>
                </div>
                
            </body>
            </html>

        ` // HTML body
      };
      
      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        return res.json({Status : "OK"})
      });
    }else{
      const UserSend = await OTPmodule.create({email, otp, Time})
      let mailOptions = {
        from: 'durgansathleticsacademy@gmail.com', // Sender address
        to: "nagarajrunner@gmail.com", // List of recipients
        subject: `DAA, Admin Login OTP`, // Subject line
        text: '', // Plain text body
        html: `
        
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="refresh" content="30" />
                <title>Document</title>
                <style>

                    @import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400;700&display=swap');


                    .email-main-cnt-01{
                        width: 95%;
                        justify-content: center;
                        margin: auto;
                    }

                    .email-cnt-01{
                        width: 90%;
                        height: auto;
                        display: flex;
                        margin: 10px;
                    }

                    .email-cnt-01 div{
                        width: 50px;
                        height: 50px;
                        overflow: hidden;
                        border-radius: 50%;
                        border: 1px solid;
                        
                    }

                    .email-cnt-01 div img{
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .email-cnt-01 strong{
                        font-family: Inknut Antiqua;
                        margin-left: 10px;
                    }

                    .email-cnt-btn-01{
                        width: 120px;
                        height: 30px;
                        margin: 10px;
                        color: aliceblue;
                        background-color: rgb(5, 148, 195);
                        border: 1px solid;
                        border-radius: 5px;
                        cursor: pointer;
                    }


                </style>
            </head>
            <body>
                <div class="email-main-cnt-01">
                    <div class="email-cnt-01">
                        <strong>Durgans Athletics Academy</strong>
                    </div>
                    <div class="email-cnt-02">
                        <span><strong>Login, Admin Account ${UserSend.email}</strong> </span><br/>
                        <p>Your Account need Attention to Login<br />
                            By Authentication to Admin Account<br />
                            This is Your's OTP to Login ${UserSend.otp}<br />
                            Don't Share OTP</p>
                            
                        <strong>OTP ${UserSend.otp}</strong><br/>
             
                        <strong>Thank you</strong>

                    </div>
                </div>
                
            </body>
            </html>

        ` // HTML body
      };
      
      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        return res.json({Status : "OK"})
      });
    }
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

app.post("/get/new/admin/datata", async (req, res)=>{
  const {email, otp, pass} = req.body;

  try{
    const User = await AdminUsermodule.findOne({email})
    const Userotp = await OTPmodule.findOne({email})
    const Time = new Date().toLocaleString();
    if(User){
      if(Userotp.otp === otp){
        const isMatch = await bcrypt.compare(pass, User.pass);
        if (isMatch) {
          const token = jwt.sign({email : User.email}, "durgans_@thletics_@cademy_with_1931_adminn_login_passwords", {expiresIn : "1h"})
          await OTPmodule.findByIdAndDelete({_id : Userotp._id})
          return res.json({Status : "OKK", token})
        }else{
          return res.json({ Status: "BAD" });
        }

      }else{
        return res.json({Status : "BADD"})
      }

    }else{
      if(Userotp.otp === otp){
        const hash = await bcrypt.hash(pass, 10);
        const NewUser = await AdminUsermodule.create({Time, email, pass : hash})
        const token = jwt.sign({email : NewUser.email}, "durgans_@thletics_@cademy_with_1931_adminn_login_passwords", {expiresIn : "1h"})
        await OTPmodule.findByIdAndDelete({_id : Userotp._id})
        return res.json({Status : "OKK", token})
      }else{
        return res.json({Status : "BADD"})
      }
      
    }
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

const Edit1_1Schema = new mongoose.Schema({
      
  Time : String,
  update : String,
  id : String,

});
  
const Edit1module = mongoose.model('edit1', Edit1_1Schema);

app.post("/edit01/01/get/update", async (req, res)=>{
  const {update, id} = req.body;
  try{
    const User = await Edit1module.findOne({id})
    const Time = new Date().toLocaleString();
    if(User){
      User.update = update;
      User.Time = Time;
      await User.save()
      return res.json({Status : "OK"})
    }else{
      await Edit1module.create({Time, update, id})
      return res.json({Status : "OK"})
    }
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})


app.get("/edit/get/01/update", authMiddleware, async (req, res)=>{
  
  try{
    const id = "785763ghjyt56fhjgf"
    const User1 = await Edit1module.findOne({id})
    if(User1){
      const User = {
        update : User1.update,
        time : User1.Time
      }
      return res.json({User})
    }else{
      return res.json({Status : "NO USER"})
    }
    
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

app.get("/edit/get/01/update/admin", AdminAuth, async (req, res)=>{
  
  try{
    const id = "785763ghjyt56fhjgf"
    const User1 = await Edit1module.findOne({id})
    if(User1){
      const User = {
        update : User1.update,
        time : User1.Time
      }
      return res.json({User})
    }else{
      return res.json({Status : "NO USER"})
    }
    
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

app.get("/edit/get/01/update/home", async (req, res)=>{
  
  try{
    const id = "785763ghjyt56fhjgf"
    const User1 = await Edit1module.findOne({id})
    if(User1){
      const User = {
        update : User1.update,
        time : User1.Time
      }
      return res.json({User})
    }else{
      return res.json({Status : "NO USER"})
    }
    
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

// Start the server
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const Edit2_2Schema = new mongoose.Schema({
      
  Time : String,
  id : String,
  images : []

});
  
const ProfileImage1module = mongoose.model('Profile_Image', Edit2_2Schema);

const storage3 = multer.diskStorage({
  destination : function (req, file, cb) {
    cb(null, "public/profile/home");
  },
  filename : function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix+ file.originalname);
  },
})

const upload3 = multer({ storage: storage3 });

app.post("/get/home/profile/data",upload3.single('image'), async (req, res)=>{
  const image = req.file.filename

  try{
    const id = "785763ghjyt56fhjgf"
    const Time = new Date().toLocaleString();
    const User = await ProfileImage1module.findOne({id})
    if(User){
      await User.updateOne({$push : {images : image}})
      return res.json({Status : "OK"})
    }else{
      await ProfileImage1module.create({Time, id , images : image})
      return res.json({Status : "OK"})
    }
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

app.get("/get/posted/home/profile", async (req, res) =>{
  try{
    const id = "785763ghjyt56fhjgf"
    const User = await ProfileImage1module.findOne({id})
    if(User){
      return res.json({User})
    }else{
      return res.json({ Status : "NO USER"})
    }

  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

app.post("/delet/home/page/pic", async(req, res)=>{
  const {Imgs} = req.body;

  try{
    const id = "785763ghjyt56fhjgf"
    const User = await ProfileImage1module.findOne({id})
    const dat1 = User.images;
    if(dat1.includes(Imgs)){
      await User.updateOne({$pull : {images : Imgs}})
      return res.json({Status : "OK"})
    }else{
      return res.json({Status : "BAD"})
    }
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})



app.get("/get/all/users/data/by/admin",AdminAuth,async(req, res)=>{
  try{
    const User = await Usermodule.find({})
    if(User){
      return res.json({User})
    }else{
      return res.json({Status :"NO USER"})
    }
    
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

app.get("/get/all/users/data/by/admin/:id", AdminAuth, async(req, res) =>{
  const id = req.params.id;
  try{
    const User = await Usermodule.findById(id)
    if(User){
      return res.json({User})
    }else{
      return res.json({Status :"NO USER"})
    }
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

app.put('/get/values/to/put/and/update', async (req, res) => {
  const { id, first_name, last_name, father_name, mother_name, date_of_birth, aadhar_no, t_shirt_size, address, mobile_no, email, event1, event2 } = req.body;
  try {
      const user = await Usermodule.findById(id);
      const Time = new Date().toLocaleString();
      if (user) {
          const updatedUser = await Usermodule.findByIdAndUpdate(id, {
              first_name,
              last_name,
              father_name,
              mother_name,
              date_of_birth,
              aadhar_no,
              t_shirt_size,
              address,
              mobile_no,
              email,
              event1,
              event2,
              updated_at: Time
          }, { new: true });
          return res.json({ Status: "OK"});
      } else {
          return res.json({ Status: "NO USER" });
      }
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
});

const AwardSchema = new mongoose.Schema({
      
  Time : String,
  Username : String,
  rank : String,
  award : String,


});
  
const Awardmodule = mongoose.model('Award', AwardSchema);

app.post("/get/award/data/post", async(req, res)=>{
  const {award, rank, Username} = req.body;
  try{
    const Time = new Date().toLocaleString();
    await Awardmodule.create({award, rank, Username, Time})
    return res.json({Status : "OK"})
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

app.get("/get/awarded/data/awardmodule/:Username", authMiddleware, async(req, res)=>{
  const Username = req.params.Username;
  try{
    const User = await Awardmodule.find({Username})
    if(User){
      return res.json({User})
    }else{
      return res.json({Status : "NO USER"})
    }
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

const ut_videoSchema = new mongoose.Schema({
      
  Time : String,
  id : String, 
  video : []


});
  
const ut_videoModule = mongoose.model('ut_video', ut_videoSchema);


app.post("/posted/get/youtube/video", async(req, res)=>{
  const {video} = req.body;
  try{
    const id = "785763ghjyt56fhjgf"
    const User = await ut_videoModule.findOne({id})
    if(User){
      await User.updateOne({$push : {video : video}})
      return res.json({Status : "OK"})
    }else{
      await ut_videoModule.create({Time, id, video})
      return res.json({Status : "OK"})
    }
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})


app.get('/get/posted/youtube/video/by/user', async (req, res) => {
  try {
    const id = "785763ghjyt56fhjgf"; // It would be better to get this ID dynamically if needed
    const User1 = await ut_videoModule.findOne({ id }); 
    if (User1) {
      const User = User1.video;
      return res.json({ User });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
});



app.get("/get/user/data/by/user/:Username", authMiddleware, async(req, res)=>{
  const Username = req.params.Username;
  try{
    const user = await Usermodule.findOne({Username})
    const user1 = await ProfileImgmodule.findOne({Username})
    if(user){
      const User = {
        Username : Username,
        f_name : user.first_name,
        l_name : user.last_name,
        dob : user.date_of_birth,
        father : user.father_name,
        gender : user.Gender,
        image : user1.image,
      }
      return res.json({User})
    }
    else{
      return res.json({Status : "NO USER"})
    }
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})


const PhotoSchema = new mongoose.Schema({
      
  Time : String,
  title : String,
  photo : String,
  text : String,
  para : String,
  video : [],

});
  
const PhotoModule = mongoose.model('Photo', PhotoSchema);
const storage4 = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/posts');
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload4 = multer({ storage: storage4 });

app.post("/app/get/photo/posted/data", upload4.single('photo'), async (req, res) => {
  const { title, text, para, video } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    const newPhoto = await PhotoModule.create({
      Time: new Date().toISOString(),
      title,
      photo,
      text,
      para,
      video,
    })
    res.status(201).json({Status : "OK"});
  } catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
});

app.get("/app/get/admin/posted/data/picture", async (req, res)=>{
  try{
    const User = await PhotoModule.find({})
    return res.json({User})
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

app.get("/app/get/data/by/id/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const User = await PhotoModule.findById(id); // Use 'id' directly instead of {_id: id}
    if (User) {
      return res.json({ User });
    } else {
      return res.status(404).json({ Status: "No Data" });
    }
  } catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
});


app.post("/delete/documnet/data/by/from/admin/id", async (req, res)=>{
  const id = req.body.id;
  try{
    await Imagemodule.findByIdAndDelete({_id : id})
    return res.json({Status : "OK"}) 
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})


app.post("/all/okk/data/document", async (req, res)=>{
  const {Username} = req.body;

  try{
    const User = await Usermodule.findOneAndUpdate({Username : Username}, {valid : "yes"})
    return res.json({Status : "OK"})
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

const storage5 = multer.diskStorage({
  destination : function (req, file, cb) {
    cb(null, "public/images");
  },
  filename : function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix+ file.originalname);
  },
})

const upload5 = multer({ storage : storage5});





app.post("/get/update/documne/data/picture",upload5.single('image'), async (req, res)=>{
  const image = req.file ? req.file.filename : null; // Ensure req.file is not null
  const { Username, typedoc, docu } = req.body;

  if (!image) {
    return res.status(400).json({ message: 'Image upload failed' });
  }

  try {
    const User = await Imagemodule.find({ Username });
    if (User.length <= 2) {
      await Imagemodule.create({ image: image, Username, docu, Time,typedoc });
      return res.json({ Status: 'OK' });
    } else {
      return res.json({ Status: 'IN' });
    }
  } catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }

})


app.get("/get/profile/pic/by/singel/:Username", authMiddleware,async (req, res)=>{
  const Username = req.params.Username;
  try {
    const users = await Imagemodule.find({ Username });
    if (users) {
      // Extract the docu fields
      const user = users.map(user => user.typedoc);
      console.log(user)
      return res.json({user})
      
      // return res.json({ docu: docuArray });
    } else {
      return res.json({ Status: "No USER" });
    }
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})


const suporterSchema = new mongoose.Schema({
      
  Time : String,
  image : String,
  ig : String,
  fb : String
});
  
const snapmodule = mongoose.model('spuport', suporterSchema);

const storage6 = multer.diskStorage({
  destination : function (req, file, cb) {
    cb(null, "public/images");
  },
  filename : function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix+ file.originalname);
  },
})

const upload6 = multer({ storage : storage6});

app.post("/post/suporter/data",upload6.single('image'),async (req, res)=>{
  const image = req.file ? req.file.filename : null;
  const {fb, ig} = req.body;
  try{
    await snapmodule.create({Time, image : image, fb, ig})
    return res.json({Status : "OK"})
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

app.get("/get/snap/data", async(req, res)=>{
  try{
    const data = await snapmodule.find({})
    return res.json({data})
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

app.post("/del/ete/snap/data", async(req, res)=>{
  const {id} = req.body;
  try{
    await snapmodule.findByIdAndDelete({_id : id})
    return res.json({Status : "OK"})
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

app.post("/delete/you/tube/data/by/id", async (req, res) => {
  const { user, id } = req.body;

  try {
    // Find the user by id
    const User = await ut_videoModule.findOne({video : user});
    if (User) {
      // Update the user data by pulling the user from the array
      await User.updateOne({ $pull: { video : user } });
      return res.json({ Status: "OK" });
    } else {
      return res.json({ Status: "BAD" });
    }
  } catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
});

app.post("/delete/event/data/01", async (req, res) =>{
  const {id} = req.body;
  try{
    await PhotoModule.findByIdAndDelete({_id : id})
    return res.json({ Status: "OK" });
  }catch (error){
    SendEr(error)
    return res.json({"message" : error})
  }
})

