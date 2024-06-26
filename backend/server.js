const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const journalRoutes = require("./routes/journalRoutes");
const groupRoutes = require("./routes/groupRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use("/api/users", userRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/group", groupRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
