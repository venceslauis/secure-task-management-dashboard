import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import { protect } from "./middleware/authMiddleware";
import taskRoutes from "./routes/taskRoutes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

import { errorHandler } from "./middleware/errorMiddleware";
app.use(errorHandler);

app.get("/", protect, (req, res) => {
  res.json({ message: "Protected route working" });
});

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
