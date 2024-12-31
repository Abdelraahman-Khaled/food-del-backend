import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();


// Routes
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/status",updateStatus);
orderRouter.get("/list",listOrders);
// middleware
orderRouter.use(authMiddleware);
// Routes need middleware
orderRouter.post("/place", placeOrder);
orderRouter.post("/userorders", userOrders);

export default orderRouter;
