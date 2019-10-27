const {validate,Child} = require('../models/child');
const express = require('express');
const router = express.Router();

//new child registration route
router.post('/', async (req,res) =>{
    const {error} = validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    child = new Child (req.body); 
    await child.save();
     res.send(child);
});

module.exports = router;