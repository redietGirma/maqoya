const { validate,Child } = require('../models/child');
const express = require('express');
const router = express.Router();
const Jwt = require('jsonwebtoken');
const { Parent } = require('../models/parents');
const parent = require('./parents')
const dotenv = require('dotenv').config();
const config = require('config');
const checkAuth = require('../middleware/checkAuth.js');
const daycare = require('../models/daycare');

//new child registration route after checking authorization
router.post('/register',checkAuth, async (req,res) =>{
       const {error} = validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);
        req.body.parent = req.parent;
        child = new Child (req.body); 
        await child.save();
        const parent = await Parent.findOne({ _id: req.parent })
        parent.children.push(child._id);
        parent.save();
        res.send(child);
     
});


router.get('/:id', async (req,res)=>{
    try{
        const child = await Child.findOne({ _id: req.params.id }).populate('daycares').select('-password');
        res.json(child);
    } catch(error){
        res.status(400).json('cant get child');
    }
});
module.exports = router;
