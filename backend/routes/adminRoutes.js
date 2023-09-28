import { Router} from "express";
const router = Router();
import {
  adminAuth,
  logoutAdmin,
  getData,
  deleteUser,
  userDetails,
  editUser,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

router.post('/login',adminAuth);
router.post("/logout", logoutAdmin);
router.get("/getdata",getData);
router.get("/deleteuser/:id",deleteUser);
router.get("/userDetails/:id", userDetails);
router.post("/edituserDetails/:id",editUser);

export default router;
