import express from "express";
import * as controller from "../controllers";
import { isAdmin } from "../middlewares/verify_role";
import verifyToken from "../middlewares/verify_token";
import uploadCloud from "../middlewares/uploader";
const router = express.Router();

router.get("/", [verifyToken, isAdmin], controller.getAllUser);
router.get("/me", [verifyToken], controller.getOneUser);
router.put(
    "/:update",
    uploadCloud.single("avatar"),
    [verifyToken],
    controller.updateUser
);

router.put(
    "/:updateByAdmin/:id",
    [verifyToken, isAdmin],
    controller.updateByAdmin
);

module.exports = router;
