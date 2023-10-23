import express from "express";
import * as controller from "../controllers";
import { isAdmin } from "../middlewares/verify_role";
import verifyToken from "../middlewares/verify_token";
const router = express.Router();

router.post("/", [verifyToken], controller.createPayment);
router.get("/", [verifyToken], controller.getAllPayment);
router.get("/:id", [verifyToken], controller.getOnePayment);
router.put("/:id", [verifyToken, isAdmin], controller.updatePayment);
router.delete("/:id", [verifyToken, isAdmin], controller.deletePayment);
module.exports = router;
