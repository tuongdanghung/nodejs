import express from "express";
import * as controller from "../controllers";
import { isAdmin } from "../middlewares/verify_role";
import verifyToken from "../middlewares/verify_token";
const router = express.Router();

router.post("/", [verifyToken, isAdmin], controller.createRole);
router.get("/", [verifyToken, isAdmin], controller.getAllRole);
router.get("/:id", [verifyToken, verifyToken], controller.getOneRole);
router.put("/:id", [verifyToken, verifyToken], controller.updateRole);
router.delete("/:id", [verifyToken, isAdmin], controller.deleteRole);
module.exports = router;
