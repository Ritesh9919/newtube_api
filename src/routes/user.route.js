import express from "express";
const router = express.Router();
import { upload } from "../middleware/multer.middleware.js";
import { register } from "../controllers/user.controller.js";

router.post(
  "/register",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  register
);

export default router;
