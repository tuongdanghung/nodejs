import express from "express";
import * as controller from "../../controllers";
import { isAdmin } from "../../middlewares/verify_role";
import verifyToken from "../../middlewares/verify_token";
import uploadCloud from "../../middlewares/uploader";

const router = express.Router();

router.post(
    "/",
    [verifyToken, isAdmin],
    uploadCloud.array("src", 5),
    controller.createImage
);
router.get("/", [verifyToken, isAdmin], controller.getAllImage);
router.get("/:id", [verifyToken, isAdmin], controller.getOneImage);
router.put(
    "/:id",
    uploadCloud.single("src"),
    [verifyToken, isAdmin],
    controller.updateImage
);
router.delete("/:id", [verifyToken, isAdmin], controller.deleteImage);

module.exports = router;
