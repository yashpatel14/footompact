import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    deleteAppointment,
    getAllAppointment,
} from "../controllers/appointment.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/").get(getAllAppointment);

router.route("/a/:appointmentId").delete(deleteAppointment);

export default router;
