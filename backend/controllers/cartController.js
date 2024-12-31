import userModel from '../models/userModel.js'

// add items to user cart 
const addToCart = async (req, res) => {
    try {
        // get user data by checking the id sent in middleware 

        let userData = await userModel.findById(req.body.id)
        let cartData = await userData.cartData // getting cartData object from the user
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        }
        else {
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.id, { cartData })
        res.json({ success: true, message: "Add to Cart" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
};


//remove from the cart 
const removeFromCart = async (req, res) => {
    try {
        // get user data by checking the id sent in middleware 
        let userData = await userModel.findById(req.body.id)
        let cartData = await userData.cartData // getting cartData object from the user
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1
        }
        await userModel.findByIdAndUpdate(req.body.id, { cartData })
        res.json({ success: true, message: "Removed from Cart" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}


// fetch user cart data 
const getCart = async (req, res) => {
    try {
        // get user data by checking the id sent in middleware 
        let userData = await userModel.findById(req.body.id)
        let cartData = await userData.cartData // getting cartData object from the user
        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}


export { addToCart, removeFromCart, getCart }