import express from "express";
import * as controller from "../controllers";
import { isAdmin } from "../middlewares/verify_role";
import verifyToken from "../middlewares/verify_token";
const router = express.Router();

router.post("/", [verifyToken, isAdmin], controller.createAddress);
router.get("/", [verifyToken, isAdmin], controller.getAllAddress);
router.get("/:id", [verifyToken], controller.getOneAddress);
router.put("/:id", [verifyToken], controller.updateAddress);
router.delete("/:id", [verifyToken], controller.deleteAddress);
module.exports = router;
