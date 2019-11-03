const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const populate = require('node-populate');
const child = require('./child');
const parent = require('./parents');

const daycareSchema = mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String},
    description: {type:String, required: true},
    phoneNumber:{type:String, required:true},
    // rating:{type:String},
    location:[String],
    // imageUrl:{type:String},
    // date: {type: Date, default: Date.now},
    // img: { data: Buffer, contentType: String },
    password: {type: String},
    child: [{ type: Schema.Types.ObjectId, ref: 'Child'}],
    parent : [{type: mongoose.Schema.Types.ObjectId, ref : 'Parent'}]
  
  
  
  });
  function validateDaycare(daycare){
    const schema = Joi.object({ 
        name: Joi.string().min(4).max(15).required(),
         email: Joi.string().min(3).required().email(),
         description: Joi.string().min(4).max(15).required(),
          location:Joi.string().min(7).max(20).required(),
          phoneNumber: Joi.string().min(5).max(50).required(),
          password: Joi.string().min(5).max(1024).required()
          });
    return Joi.validate(daycare, schema);
  
     
  }
    
  const Daycare = mongoose.model('Daycare', daycareSchema);

  exports.Daycare = Daycare;
  exports.validate = validateDaycare;
