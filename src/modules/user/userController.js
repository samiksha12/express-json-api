const { readJsonData, writeJsonData } = require("../common/editJson");
const authController = require("../auth/authController");
const { getUserById,updateUserById } = require("./helper");
exports.get = (req, res) => {
  try {
    if (req.body && req.body.loginCredentials) {
      const loginValue = authController.login(req.body.loginCredentials);
      if (typeof loginValue !== "object") {
        const data = readJsonData("user.json");
        res.json({ message: "running in get users", data });
      } else {
        res.json({ message: loginValue.message });
      }
    } else {
      res
        .status(400)
        .json({ message: "Invalid request: loginCredentials missing" });
    }
  } catch (error) {
    console.log("Error in getting data", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.post = (req, res) => {
  try {
    if (req.body && req.body.loginCredentials) {
      const loginValue = authController.login(req.body.loginCredentials);
      if (typeof loginValue !== "object") {
        const jsonData = readJsonData("user.json");
        const updatedData = Array.isArray(jsonData) ? jsonData : [];
        updatedData.push(req.body.data);
        writeJsonData("user.json", updatedData);
        res.json({ message: "Data updated successfully" });
      } else {
        res.json({ message: loginValue.message });
      }
    } else {
      res
        .status(400)
        .json({ message: "Invalid request: loginCredentials missing" });
    }
  } catch (error) {
    console.log("Error in getting data", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.put = (req, res) => {
  try {
    if (req.body && req.body.loginCredentials) {
      const loginValue = authController.login(req.body.loginCredentials);
      if (typeof loginValue !== "object") {
        const user_id = req.params.user_id;
        const userData = req.body.data;
        const existingUserData = getUserById(user_id);
        if (!existingUserData) {
          this.post(req, res);
        }
        const allUserData = updateUserById(user_id, userData);
        writeJsonData("user.json", allUserData);
        res.json({ message: "User updated successfully" });
      } else {
        res.json({ message: loginValue.message });
      }
    } else {
      res
        .status(400)
        .json({ message: "Invalid request: loginCredentials missing" });
    }
  } catch (error) {
    console.log("Error in getting data", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.delete=(req,res)=>{

// }