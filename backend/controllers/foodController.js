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
        // Validate that the id exists in the request body
        if (!req.body.id) {
            return res.status(400).json({ success: false, message: 'Food ID is required' });
        }

        // Find the food item by ID
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: 'Food not found' });
        }

        // Delete the associated image file
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.log('Error deleting image:', err);
                // Continue with deletion even if image deletion fails
            }
        });

        // Remove the food item from the database
        await foodModel.findOneAndDelete({ _id: req.body.id });

        // Return success response
        res.status(200).json({ success: true, message: 'Food removed' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Failed to remove food', error: error.message });
    }
};


export { addFood, listFood, removeFood }