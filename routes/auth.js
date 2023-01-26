const express = require('express');
const router = express.Router();

require('../config/database');
const User = require('../models/user');

router.get('/', (req, res) => {
    res.send(`Hello world from the server rotuer js`);
});

router.post('/register', (req, res) => {

    const {name , email , phone , work , password   , confirmPassword} = req.body
    
    // res.json({ message: req.body });
    if(!name || !email || !phone || !work || !password || confirmPassword){
        return res.status(422).json({Error: "WTF"})
    };

    User.findOne({email:email}).then((userExist) => {
        if(userExist) return res.send(422).json({Error:"User already Exist"});

        const user = new User({name , email , phone , work , password , confirmPassword});

        user.save().then(()=>{
            res.status(201).json({message:"user registered successfully"})
        }).catch((err) => res.status(500).json({Error:"fail to register"}))
    }).catch((err)=> {console.log(err);});


});

module.exports = router;