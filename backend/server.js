const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./config/db");


const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,POST,PUT,PATCH,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("E-Learning API Running 🚀");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/enroll", require("./routes/enrollmentRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
