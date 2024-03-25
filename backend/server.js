require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.CORS_FRONTEND_ORIGIN,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors());

const userRoutes = require("./routes/usersRoute");

app.use("/users", userRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on PORT ${process.env.PORT} `);
});
