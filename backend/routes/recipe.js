const mongoose = require('mongoose');
const userAuth = require('../middlewares/userAuth');
const { validateRecipe, Recipe } = require('../Models/RecipeModal');

const router = require('express').Router();


// $ create contact
router.post('/recipe', userAuth, async (req, res) => {
    const { error } = validateRecipe(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    const { title,author,image,ingredients,directions} = req.body

    try {
        const newRecipe = new Recipe({
            title,
            author,
            image,
            ingredients,
            directions,
            postedBy: req.user._id,
        });
        const result = await newRecipe.save();

        return res.status(201)
            .json({ ...result._doc })

    } catch (error) {
        console.log(error)
    }
});

// $ fetch contact.
router.get('/myrecipe', userAuth, async (req, res) => {
    try {
        const myContacts = await Recipe.find({ postedBy: req.user._id }).populate(
            "postedBy",
            "-password"
        )

        return res.status(200)
        // # we have used reverse() to get the latest contact/element from the array in the first place
            .json({ contacts : myContacts.reverse() });

    } catch (error) {
        console.log(error);
    }
});


  



module.exports = router;