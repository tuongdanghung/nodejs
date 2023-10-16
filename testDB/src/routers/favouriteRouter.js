import express from "express";
import * as controller from "../controllers";
import verifyToken from "../middlewares/verify_token";
const router = express.Router();

router.post("/", [verifyToken], controller.createFavourite);
router.get("/", [verifyToken], controller.getAllFavourite);
router.get(
    "/getAllFavouriteByUser",
    [verifyToken],
    controller.getAllFavouriteByUser
);
router.delete("/:id", [verifyToken], controller.deleteFavourite);
module.exports = router;
