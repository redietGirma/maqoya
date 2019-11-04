const Joi = require('joi');
const mongoose = require('mongoose');
const populate = require('node-populate');
const Schema = mongoose.Schema;
const Parent = require('./parents');
const Daycare = require('./daycare');


const childSchema = mongoose.Schema({
    name: {type:String, required: true},
    date_of_birth: {type: String, required: true},
    gender: {type:String},
    medical_detail:[String],
    emergency_contact: {type:String, required:true},
    image: { type: String},
    parent : [{type: mongoose.Schema.Types.ObjectId, ref : 'Parent'}],
    daycares : [{type: mongoose.Schema.Types.ObjectId, ref : 'Daycare'}]
    
});

  function validateChild(child){
      const schema = Joi.object({
        name: Joi.string().max(15).required(),
        date_of_birth: Joi.string().required(),
         gender:Joi.string(),
         medical_detail: Joi.string(),
         emergency_contact: Joi.string().min(5).max(50).required(),
        //  img: Joi.Buffer()
      })
      return Joi.validate(child, schema);
  }

const Child = mongoose.model('Child', childSchema);

exports.Child = Child;
exports.validate = validateChild;

