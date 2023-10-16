import express from "express";
import * as controller from "../../controllers";
import { isAdmin } from "../../middlewares/verify_role";
import verifyToken from "../../middlewares/verify_token";

const router = express.Router();

router.post("/", [verifyToken, isAdmin], controller.createProduct);
router.get("/", controller.getAllProduct);
router.get("/:productId", [verifyToken, isAdmin], controller.getOneProduct);
router.put("/:productId", [verifyToken, isAdmin], controller.updateProduct);
router.delete("/:productId", [verifyToken, isAdmin], controller.deleteProduct);

module.exports = router;
