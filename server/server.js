// Simple Express server skeleton for Boot-Camp-KB
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
app.use(express.json());

// Serve static client files
app.use(express.static(path.join(__dirname, '..')));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bootcamp';
mongoose.connect(MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(()=>console.log('MongoDB connected'))
  .catch(e=>console.error('MongoDB connection error', e.message));

// User model
const User = mongoose.model('User',{ email: String, password: String });

// Register
app.post('/api/register', async (req,res)=>{
  try{
    const {email,password} = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({email, password:hashed});
    await user.save();
    res.json({message:'User created'});
  }catch(err){
    res.status(500).json({error:err.message});
  }
});

// Login
app.post('/api/login', async (req,res)=>{
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({error:'User not found'});
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return res.status(400).json({error:'Wrong password'});
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET || 'change_this_secret', {expiresIn:'7d'});
    res.json({token});
  }catch(err){
    res.status(500).json({error:err.message});
  }
});

// Fallback to serve index.html for client-side routing
app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname,'..','index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
