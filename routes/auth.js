const config = require('config');
const {Parent} = require('../models/parents');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const Jwt = require('jsonwebtoken');
const parent = require('./parents')
const child = require('./child');
const passportSetup = require('../config/passport-setup');
const passport = require('passport');


//parents login
router.post('/login', async (req,res) =>{
    const {error} = validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    
    let parent = await Parent.findOne({email:req.body.email});
    if (!parent)  return res.status(400).json('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, parent.password);
    if (!validPassword) return res.status(400).json('Invalid email or password');

    const token = Jwt.sign({_id: parent._id}, config.get('jwtPrivateKey'));
    res.send(token);
});


 function validate(req){
  const schema = Joi.object({ 
        email: Joi.string().min(7).max(20).required().email(),
        password: Joi.string().min(5).max(1024).required()
        });
   return Joi.validate(req, schema);
    }


    //parents login with google 
    router.get('/google', passport.authenticate('google', {
        scope: ['profile']
    }));

// router.get('/google', (req,res) => {
//     res.send('logging in with passport');
// });
module.exports = router;