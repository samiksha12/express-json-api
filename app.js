const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./src/modules/user/userRoutes");
const dataRoutes = require("./src/modules/data/dataRoutes");

// Define the origin of your React app (replace with your actual URL)
const allowedOrigins = ["https://weather-app-using-react-express.vercel.app"];

// Set up CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // Some legacy browsers (IE11) may require 200 status
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://weather-app-using-react-express.vercel.app'); // Replace with your React app's URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200); // Respond to preflight requests
  } else {
    next();
  }
});

app.use("/users", userRoutes);
app.use("/data", dataRoutes);

const port = process.env.PORT || 3100;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
