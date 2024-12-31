import foodModel from "../models/foodModel.js";
import fs from 'fs'


// add food item
const addFood = async (req, res) => {
    try {
        // Destructure fields from `req.body` and filename from `req.file`
        const { name, description, price, category } = req.body;
        const image = req.file?.filename;

        // Create a new food document
        const food = new foodModel({ name, description, price, category, image });

        // Save the document to the database
        const savedFood = await food.save();

        // Respond with success
        res.status(201).json({ success: true, message: "Food item added successfully", data: savedFood });
    } catch (error) {
        // Handle errors
        res.status(500).json({ success: false, message: "Error adding food item", error: error.message });
    }
};

// all foods
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.status(200).json({ success: true, message: "success", results: foods.length, data: foods })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'faild', message: error })
    }
}

// remove food 
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, () => { })
        await foodModel.findOneAndDelete(req.body.id)
        res.status(200).json({ success: true, message: "Food Removed" })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'faild', message: error })
    }
}


export { addFood, listFood, removeFood }