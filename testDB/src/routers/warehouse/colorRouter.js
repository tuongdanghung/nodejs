import express from "express";
import * as controller from "../../controllers";
import { isAdmin } from "../../middlewares/verify_role";
import verifyToken from "../../middlewares/verify_token";
const router = express.Router();

router.post("/", [verifyToken, isAdmin], controller.createColor);
router.get("/", [verifyToken, isAdmin], controller.getAllColor);
router.get("/:colorId", [verifyToken, isAdmin], controller.getOneColor);
router.put("/:colorId", [verifyToken, isAdmin], controller.updateColor);
router.delete("/:colorId", [verifyToken, isAdmin], controller.deleteColor);

module.exports = router;
