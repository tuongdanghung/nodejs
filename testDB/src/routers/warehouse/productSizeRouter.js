import express from "express";
import * as controller from "../../controllers";
import { isAdmin } from "../../middlewares/verify_role";
import verifyToken from "../../middlewares/verify_token";
const router = express.Router();
router.post("/", [verifyToken, isAdmin], controller.createProductSize);
router.get("/", [verifyToken, isAdmin], controller.getAllProductSize);
router.get("/:id", [verifyToken, isAdmin], controller.getOneProductSize);
router.put("/", [verifyToken, isAdmin], controller.updateProductSize);
// router.delete("/:colorId", [verifyToken, isAdmin], controller.deleteProductSize);

module.exports = router;
