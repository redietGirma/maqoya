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
const multer = require('multer');

const storage = multer.diskStorage({
 destination: function(req, file, cb){
  cb(null,'./uploads/');
 },
 filename: function(req,file,cb){
  cb(null, file.originalname);
 }

});
const upload = multer({storage: storage, limits: {
    fileSize: 1024 *1024 * 2
}});

//new child registration route after checking authorization
router.post('/register',checkAuth, upload.single('image'), async (req,res) =>{
    console.log(req.file);
       const {error} = validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);
        req.body.parent = req.parent;
        
        const child = new Child({
            name: req.body.name,
            date_of_birth: req.body.date_of_birth,
            gender : req.body.gender,
            emergency_contact : req.body.emergency_contact,
            image: req.file.path
        })
        await child.save();
        const parent = await Parent.findOne({ _id: req.parent })
        parent.children.push(child._id);
        parent.save();
        res.send(child);
     
});

// get child 
router.get('/:id', async (req,res)=>{
    try{
        const child = await Child.findOne({ _id: req.params.id }).populate('daycares').select('-password');
        res.json(child);
    } catch(error){
        res.status(400).json('cant get child');
    }
});
module.exports = router;
