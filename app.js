const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./src/modules/user/userRoutes");
const dataRoutes = require("./src/modules/data/dataRoutes");

const corsOptions = {
  origin: "http://localhost:3000", // Replace with the actual URL of your React app
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/data", dataRoutes);

const port = process.env.PORT || 3100;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
