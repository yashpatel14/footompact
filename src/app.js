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

//routes declaration

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/service",serviceRouter)

export { app };
