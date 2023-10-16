import express from "express";
import * as controller from "../controllers";
import { isAdmin } from "../middlewares/verify_role";
import verifyToken from "../middlewares/verify_token";
const router = express.Router();

router.post("/", [verifyToken], controller.createCart);
router.get("/", [verifyToken], controller.getAllCart);
router.get("/getAllCartByUser", [verifyToken], controller.getAllCartByUser);
router.get("/:id", [verifyToken], controller.getOneCart);
router.put("/:id", [verifyToken], controller.updateCart);
router.delete("/:id", [verifyToken], controller.deleteCart);
module.exports = router;
