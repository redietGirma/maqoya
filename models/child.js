const Joi = require('joi');
const mongoose = require('mongoose');
const populate = require('node-populate');
const Schema = mongoose.Schema;

const childSchema = mongoose.Schema({
    first_name: {type:String, required: true},
    last_name: {type:String, required: true},
    date_of_birth: {type: String, required: true},
    gender: {type:String, required: true},
    medical_detail:[String],
    emergency_contact: {type:String, required:true},
    // img: { data: Buffer, contentType: String },
    // parent : [{type: mongoose.Schema.Types.ObjectId, ref : 'Parent'}]
    
});

  function validateChild(child){
      const schema = Joi.object({
        first_name: Joi.string().max(15).required(),
        last_name: Joi.string().max(15).required(),
        date_of_birth: Joi.string().required(),
         gender:Joi.string().required(),
         medical_detail: Joi.string().required(),
         emergency_contact: Joi.string().min(5).max(50).required(),
        //  img: Joi.Buffer()
      })
      return Joi.validate(child, schema);
  }

const Child = mongoose.model('Child', childSchema);

exports.Child = Child;
exports.validate = validateChild;

