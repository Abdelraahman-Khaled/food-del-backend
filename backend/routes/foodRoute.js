import express from 'express'
import { addFood, listFood, removeFood } from '../controllers/foodController.js'
import multer from 'multer' //image store 

const foodRouter = express.Router()

// Image Storage Engine MiddleWare
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
// upload
const upload = multer({ storage })

foodRouter.post('/add', upload.single("image"), addFood)
foodRouter.get('/list', listFood)
foodRouter.post('/remove', removeFood)

export default foodRouter
