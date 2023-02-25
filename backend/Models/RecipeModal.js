const mongoose = require('mongoose')
const Joi = require('joi');


const RecipeModal = new mongoose.Schema({
  title : {
    type : String,
    required : [true , 'title is required']
  },
  author : {
    type : String,
    required : [true , 'author is required']
  },
  image : {
    type : String,
    required : [true , 'image is required']
  },
  ingredients : {
    type : String,
    required : [true , 'ingredients are required']
  },
  directions : {
    type : String,
    required : [true , 'directions are required']
  },
  postedBy :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "UserDetails" 
  }
})

const Recipe = mongoose.model('RecipeDetails', RecipeModal)

//# for validating the data entered by the user by using joi library
const validateRecipe = (data) => {
const schema = Joi.object({
    title : Joi.string().min(4).max(200).required(),
    author : Joi.string().min(4).max(50).required(),
    image : Joi.string().required(),
    ingredients : Joi.string().min(4).max(5000).required(),
    directions: Joi.string().min(4).max(5000).required()
})
return schema.validate(data)
}

module.exports = {
    validateRecipe,
    Recipe
};