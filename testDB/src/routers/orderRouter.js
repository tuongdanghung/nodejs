import express from "express";
import * as controller from "../controllers";
import { isAdmin } from "../middlewares/verify_role";
import verifyToken from "../middlewares/verify_token";
const router = express.Router();

router.post("/", [verifyToken], controller.createOrder);
router.get("/", [verifyToken], controller.getAllOrder);
router.get("/history", [verifyToken], controller.getAllOrderByUser);
router.put("/:id", [verifyToken], controller.updateOrder);
module.exports = router;
