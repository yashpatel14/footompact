import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    deleteLanding,
    getAllLanding,
} from "../controllers/landing.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/").get(getAllLanding);

router.route("/l/:landingId").delete(deleteLanding);

export default router;
