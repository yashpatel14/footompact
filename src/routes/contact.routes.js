import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    deleteContact,
    getAllContact,
} from "../controllers/contact.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getAllContact);

router.route("/c/:ContactId").delete(deleteContact);

export default router;
