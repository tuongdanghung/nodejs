import express from "express";
import * as controller from "../controllers";
import { isAdmin } from "../middlewares/verify_role";
import verifyToken from "../middlewares/verify_token";
const router = express.Router();

router.post("/", [verifyToken, isAdmin], controller.createOrderItem);
router.get("/", [verifyToken, isAdmin], controller.getAllOrderItem);
module.exports = router;
