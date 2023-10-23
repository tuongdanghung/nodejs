import express from "express";
import * as controller from "../../controllers";
import { isAdmin } from "../../middlewares/verify_role";
import verifyToken from "../../middlewares/verify_token";
const router = express.Router();

router.post("/", [verifyToken, isAdmin], controller.createBrand);
router.get("/", [verifyToken], controller.getAllBrand);
router.get("/:brandId", [verifyToken], controller.getOneBrand);
router.put("/:brandId", [verifyToken, isAdmin], controller.updateBrand);
router.delete("/:brandId", [verifyToken, isAdmin], controller.deleteBrand);

module.exports = router;
