import { Router } from "express";
import { insertAppointment, insertContact, insertLanding } from "../controllers/front.controller.js";

const router = Router();

router.route("/insertAppointment").post(insertAppointment);
router.route("/insertContact").post(insertContact);
router.route("/insertLanding").post(insertLanding);

export default router