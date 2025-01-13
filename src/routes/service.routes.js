import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { deleteService, getAllService, getServiceById, publishService } from "../controllers/service.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

router.use(verifyJWT);

router
    .route("/")
    .get(getAllService)
    .post(
        upload.single("image"),
        publishService
    );

router
    .route("/s/:serviceId")
    .get(getServiceById)
    .delete(deleteService)
    .patch(
        upload.single("image"),
        updateBlog
    );

export default router;