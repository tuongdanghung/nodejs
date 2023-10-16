import express from "express";
import * as controller from "../../controllers";
import { isAdmin } from "../../middlewares/verify_role";
import verifyToken from "../../middlewares/verify_token";
const router = express.Router();

router.post("/", [verifyToken, isAdmin], controller.createCategory);
router.get("/", [verifyToken, isAdmin], controller.getAllCategory);
router.get("/:categoryId", [verifyToken, isAdmin], controller.getOneCategories);
router.put("/:categoryId", [verifyToken, isAdmin], controller.updateCategory);
router.delete(
    "/:categoryId",
    [verifyToken, isAdmin],
    controller.deleteCategory
);

module.exports = router;
