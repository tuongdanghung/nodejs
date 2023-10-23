import express from "express";
import * as controller from "../../controllers";
import { isAdmin } from "../../middlewares/verify_role";
import verifyToken from "../../middlewares/verify_token";
const router = express.Router();
router.post("/", [verifyToken], controller.createProductSize);
router.get("/", [verifyToken], controller.getAllProductSize);
router.get("/:id", [verifyToken], controller.getOneProductSize);
router.put("/", [verifyToken], controller.updateProductSize);
// router.delete("/:colorId", [verifyToken, isAdmin], controller.deleteProductSize);

module.exports = router;
