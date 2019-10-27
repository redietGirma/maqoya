const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const populate = require('node-populate');

const daycareSchema = mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String},
    description: {type:String, required: true},
    phoneNumber:{type:String, required:true},
    rating:{type:String},
    location:[String],
    imageUrl:{type:String},
    date: {type: Date, default: Date.now},
    img: { data: Buffer, contentType: String },
    child: [{ type: Schema.Types.ObjectId, ref: 'Child'}],
    parent : [{type: mongoose.Schema.Types.ObjectId, ref : 'Parent'}]
  
  
  
  });
    
  const Daycare = mongoose.model('Daycare', daycareSchema);

  exports.Daycare = Daycare;
