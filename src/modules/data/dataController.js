const { readJsonData, writeJsonData } = require("../common/editJson");
const authController = require("../auth/authController");
const {
  updateUserData,
  getUserById,
  getUserDataById,
  deleteDataById,
} = require("../user/helper");
exports.get = (req, res) => {
  try {
    if (req.body && req.body.loginCredentials) {
      const loginValue = authController.login(req.body.loginCredentials);
      if (typeof loginValue !== "object") {
        const jsonData = readJsonData("data.json");
        res.json({ message: "running in get data", jsonData });
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
        const userId = req.params.user_id;
        const jsonData = readJsonData("data.json");
        let updatedData = Array.isArray(jsonData) ? jsonData : [];
        updatedData = updateUserData(userId, req.body.data, updatedData);
        writeJsonData("data.json", updatedData);
        res.json({ message: "Data updated successfully",data:updatedData });
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

exports.getSpecificId = (req, res) => {
  try {
    if (req.body && req.body.loginCredentials) {
      const loginValue = authController.login(req.body.loginCredentials);
      if (typeof loginValue !== "object") {
        const user_Id = req.params.user_id;
        const userExist = getUserById(user_Id);
        if (!userExist) {
          return res.status(404).json({ message: "User not found" });
        }
        const userData = getUserDataById(user_Id);
        res.json({ data: userData });
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

exports.delete=(req,res)=>{
  try {
    if (req.body && req.body.loginCredentials) {
      const loginValue = authController.login(req.body.loginCredentials);
      if (typeof loginValue !== "object") {
        const user_Id = req.params.user_id;
        const userExist = getUserById(user_Id);
        if (!userExist) {
          return res.status(404).json({ message: "User not found" });
        }
        const userData = deleteDataById(user_Id,req.body.data);
        writeJsonData('data.json',userData);
        res.json({ data: userData });
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
}