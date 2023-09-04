const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require('cors'); 

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual URL of your React app
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

const port = process.env.PORT || 3100;

app.use(bodyParser.json());


//Read JSON files

function readJsonData(jsonFile) {
  try {
    const data = fs.readFileSync(jsonFile, "utf8");
    return JSON.parse(data) || [];
  } catch (error) {
    console.error("Error reading JSON data:", error);
    return []; // Return an empty array in case of an error
  }
}

function writeJsonData(jsonFile, data) {
  try {
    fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing JSON data:", error);
  }
}

function getUserById(userId){
    const allUserData = readJsonData('user.json');
    const userData = allUserData.filter((data)=>{
        return (data.user_id === userId );
    })
    return userData;
}

function updateUserById(userId, updateData){
    const allUserData = readJsonData('user.json');
    allUserData.some((data)=>{
        if(data.user_id === userId && data.user_id === updateData.user_id){
            // data.user_id = updateData.user_id;
            // data.token = updateData.token;
            data.login_date = updateData.login_date;
            return true;
        }
    })
    return allUserData;
}



// Define routes for data.json
app.get("/api/data", (req, res) => {
  const jsonData = readJsonData('data.json');
  res.json(jsonData);
});

app.put("/api/data", (req, res) => {
  const jsonData = readJsonData('data.json');

  const updatedData = Array.isArray(jsonData) ? jsonData : [];

  updatedData.push(req.body);

  writeJsonData('data.json', updatedData);

  res.json({ message: "Data updated successfully" });
});





// Define routes for user.json
app.get("/api/user", (req, res) => {
  const jsonData = readJsonData('user.json');
  res.json(jsonData);
});

app.put("/api/user", (req, res) => {

  const jsonData = readJsonData('user.json');
  const updatedData = Array.isArray(jsonData) ? jsonData : [];
  updatedData.push(req.body);
  writeJsonData('user.json', updatedData);
  res.json({ message: "Data updated successfully" });
});

app.get('/api/user/:user_id',(req,res)=>{
    const userId = req.params.user_id;
    const existingUserData = getUserById(userId);
    res.json(existingUserData);
})

app.put('/api/user/:user_id', (req, res) => {
    const userId = req.params.user_id;
    const updatedUserData = req.body; // Updated user data from the request body

    // Your logic to retrieve the user data (e.g., from a database)
    const existingUserData = getUserById(userId);
  
    if (!existingUserData) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    // Apply the updates to the existing user data
    const allUserData = updateUserById(userId,updatedUserData);
  
    // Your logic to save the updated user data (e.g., to a database)
    writeJsonData('user.json',allUserData);
  
    res.json({ message: 'User updated successfully', user: allUserData });
  });
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
