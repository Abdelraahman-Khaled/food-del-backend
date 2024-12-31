import jwt from 'jsonwebtoken';

// getting id from the token and check if there token 
const authMiddleware = async (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
    }
    try {
        const token_decode = jwt.verify(token, process.env.SECRET)
        req.body.id = token_decode._id

        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default authMiddleware;
