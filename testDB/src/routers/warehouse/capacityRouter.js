import express from "express";
import * as controller from "../../controllers";
import { isAdmin } from "../../middlewares/verify_role";
import verifyToken from "../../middlewares/verify_token";
const router = express.Router();

router.post("/", [verifyToken, isAdmin], controller.createCapacity);
router.get("/", controller.getAllCapacity);
router.get("/:capacityId", [verifyToken, isAdmin], controller.getOneCapacity);
router.put("/:capacityId", [verifyToken, isAdmin], controller.updateCapacity);
router.delete(
    "/:capacityId",
    [verifyToken, isAdmin],
    controller.deleteCapacity
);

module.exports = router;
