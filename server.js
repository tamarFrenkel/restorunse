const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// חיבור למסד הנתונים
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// מודולים של ראוטים
const productRoutes = require("./routes/products.js");
const cartRoutes = require("./routes/cart.js");
const workerRouter = require("./routes/workerRouter");
const dishRouter = require("./routes/dishRouter");
const taskRouter = require("./routes/taskRouter");

// Middleware
app.use(cors());
app.use(express.json());

// שימוש בראוטים
app.use("/api/products", productRoutes); // מוצרים
app.use("/api/cart", cartRoutes); // עגלה
app.use("/api/workers", workerRouter); // עובדים
app.use("/api/dishes", dishRouter); // מנות
app.use("/api/tasks", taskRouter); // משימות

// תמונות סטטיות
app.use("/images", express.static("public/images"));

// ראוט ברירת מחדל – לבדוק שהשרת חי
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// הפעלה
app.listen(PORT, () =>
  console.log(`🌍 Server running on http://localhost:${PORT}`)
);
