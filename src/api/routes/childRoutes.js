import express from "express";
import * as controller from "./../controllers/childController.js";
const router = express.Router();
router.get("/", controller.getChildren);
router.get("/:id", controller.getChild);
router.delete("/:id", controller.deleteChild);
router.post("/", controller.createChild);
export default router;
