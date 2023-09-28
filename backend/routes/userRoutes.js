import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  updateUserProfile,
} from "../controllers/userController.js";
const router =express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.post('/auth',authUser);
router.post('/signup',registerUser);
router.post('/logout',logoutUser);
router.post("/updateprofile", updateUserProfile);


export default router;