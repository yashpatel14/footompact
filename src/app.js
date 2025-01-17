import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// CORS Configuration
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "X-Requested-With",
            "device-remember-token",
            "Access-Control-Allow-Origin",
            "Origin",
            "Accept",
        ],
    })
);

//import routes

import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";
import serviceRouter from "./routes/service.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";
import landingRouter from "./routes/landing.routes.js";
import contactRouter from "./routes/contact.routes.js";
import frontRouter from "./routes/front.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"

//routes declaration

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/service", serviceRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/landing", landingRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/front", frontRouter);
app.use("/api/v1/dashboard",dashboardRouter)

export { app };
