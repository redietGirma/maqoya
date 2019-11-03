const {validate,Daycare} = require('../models/daycare');
const express = require('express');
const router = express.Router();
const Jwt = require('jsonwebtoken');
const {Parent} = require('../models/parents');
const parent = require('./parents');
const auth = require('./auth');
const dotenv = require('dotenv').config();
const config = require('config');


//new child registration route
router.post('/', async (req,res) =>{
    const {error} = validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    
    let daycare = await Daycare.findOne({phoneNumber:req.body.phoneNumber});
    if (daycare)  return res.status(400).json('daycare already exisits!');

    //register a new daycare
     daycare = new Daycare (req.body)
    await daycare.save();
  
});

module.exports = router;

