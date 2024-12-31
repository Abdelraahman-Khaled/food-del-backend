import mongoose from 'mongoose'

export const connectDB = async () => {
    await mongoose.connect(process.env.DATA_BASE)
        .then(() => { console.log('DB connected') })
        .catch((err) => { console.log(err); })
}