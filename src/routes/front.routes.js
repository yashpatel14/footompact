import { Router } from "express";
import { frontGetAllBlog, frontGetBlogById, frontgetAllServices, insertAppointment, insertContact, insertLanding } from "../controllers/front.controller.js";

const router = Router();

router.route("/insertAppointment").post(insertAppointment);
router.route("/insertContact").post(insertContact);
router.route("/insertLanding").post(insertLanding);
router.route("/frontGetAllBlog").get(frontGetAllBlog);
router.route("/frontGetBlogById/b/:blogId").get(frontGetBlogById);
router.route("/frontgetAllServices").get(frontgetAllServices);

export default router