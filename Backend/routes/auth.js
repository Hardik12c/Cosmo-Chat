const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET;

// Create a User using POST at "/api/auth/register"
router.post('/register',[
    body('email','Enter a valid email').isEmail(),
    body('name','Enter a valid name').isLength({min: 3}),
    body('password','Password must be atleast 5 characters').isLength({min: 5})
],async (req,res)=>{
    let success=false;
    // If the parameters (email,name,password) doesn't satisfy the requirements given in the array 
    // Done with the help of express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() ,error:"Certain fields are empty or incorrect"});
    }
    // Check whether the user with this email exists already
    try{
        let user = await User.findOne({email:req.body.email});
        // If user!=NULL then give error message
        if(user){
            return res.status(400).json({success,error: "Sorry a user with this email already exists"})
        }
        // Securing the password
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hashSync(req.body.password, salt);
        // Create new user
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        })
        // Creating Token
        const data={
            user:{
                id:user.id
            }
        }
        const token = jwt.sign(data,JWT_SECRET);

        // Response the token after creating a new document
        res.json({success:true,token})
    }catch(error){
        console.log(error.message);
        res.status(500).send("Some Error occured");
    }
})

// Create a User using POST at "/api/auth/login"
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists()
],async (req,res)=>{
    let success=false;
    // If the parameters (email,name,password) doesn't satisfy the requirements given in the array 
    // Done with the help of express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try{
        const {email,password} = req.body;
        let user = await User.findOne({email});
        // If user!=NULL then give error message
        if(!user){
            return res.status(400).json({success,error: "The credentials entered are incorrect"});
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({success,error: "The credentials entered are incorrect"});
        }
        // Creating Token
        // Payload
        const data={
            user:{
                id:user.id
            }
        }
        const token = jwt.sign(data,JWT_SECRET);

        // Response the token after creating a new document
        res.json({success:true,token})
    }catch(error){
        console.log(error.message);
        res.status(500).send("Some Error occured");
    }
})

// ROUTE 3: Get logged in user's detais using POST at "/api/auth/getuser"
router.post('/getuser',fetchuser,async(req,res)=>{
    try{
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password") //All data excluding password
        res.send(user) 
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Some Error occured");
    }
})

module.exports=router;