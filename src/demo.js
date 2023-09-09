// const express = require("express");
// const bodyParser = require("body-parser");
// const fs = require("fs");
// const cors = require('cors'); 

// const app = express();
// const corsOptions = {
//   origin: 'http://localhost:3000', // Replace with the actual URL of your React app
//   optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));

// const port = process.env.PORT || 3100;

// app.use(bodyParser.json());


// //Read JSON files

// function readJsonData(jsonFile) {
//   try {
//     const data = fs.readFileSync(jsonFile, "utf8");
//     return JSON.parse(data) || [];
//   } catch (error) {
//     console.error("Error reading JSON data:", error);
//     return []; // Return an empty array in case of an error
//   }
// }

// function writeJsonData(jsonFile, data) {
//   try {
//     fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2), "utf8");
//   } catch (error) {
//     console.error("Error writing JSON data:", error);
//   }
// }
// //--------------------------------------------------------------------
// function getUserById(userId){
//     const allUserData = readJsonData('user.json');
//     const userData = allUserData.filter((data)=>{
//         return (data.user_id === userId );
//     })
//     return userData;
// }

// function updateUserById(userId, updateData){
//     const allUserData = readJsonData('user.json');
//     allUserData.some((data)=>{
//         if(data.user_id === userId && data.user_id === updateData.user_id){
//             data.login_date = updateData.login_date;
//             return true;
//         }
//     });
//     return allUserData;
// }
// function getUserDataById(user_Id){
//   const allData = readJsonData('data.json');
//   const dataPresent = allData.filter((data)=>{
//     return (data.hasOwnProperty(user_Id))
//   });
//   return dataPresent;
// }
// // function updateUserDataById(user_Id,updatedata){
// //   const allData = readJsonData('data.json');
// //   allData.some((data)=>{
// //     if(data.hasOwnProperty(user_Id)){
// //       data[user_Id] = {...data[user_Id],updatedata};
// //     }
// //   });
// //   return allData;
// // }

// function updateUserData(user_Id,newData,jsonData){
//   const index= jsonData.findIndex(item =>item.hasOwnProperty(user_Id));
//   if(index!== -1){
//     const existingData = jsonData[index][user_Id];
//     for (const newObj of newData[user_Id]) {
//       const isDuplicate = existingData.some(obj => JSON.stringify(obj) === JSON.stringify(newObj));
//       if (!isDuplicate) {
//         existingData.push(newObj);
//       }
//     }console.log(`Data for user ${user_Id} has been updated.`);
//     jsonData[index][user_Id]=existingData;
//   }else {
//     // If the user ID doesn't exist, create a new entry
//     jsonData.push(newData);
//     console.log(`New data entry created for user ${user_Id}.`);
//   }
//   return jsonData
// }
// //---------------------------------------------Data----------------------------

// // Define routes for data.json
// //Get data
// app.get("/api/data", (req, res) => {
//   const jsonData = readJsonData('data.json');
//   res.json(jsonData);
// });

// //POST or Put data
// app.put("/api/data/:user_Id", (req, res) => {
//   const userId = req.params.user_Id;
//   const jsonData = readJsonData('data.json');
//   let updatedData = Array.isArray(jsonData) ? jsonData : [];
//   updatedData =updateUserData(userId,req.body,updatedData);
//   writeJsonData('data.json',updatedData);
//   res.json({ message: "Data updated successfully",data :updatedData });
// });

// app.get("/api/data/:user_Id",(req,res)=>{
//   const user_Id = req.params.user_Id;
//   const jsonData = readJsonData('data.json');
//   const userExist = getUserById(user_Id);
//   if(!userExist)
//   {
//     return res.status(404).json({ message: 'User not found' });
//   }
// });




// //----------------------------------------------User
// // Define routes for user.json
// //Get user
// app.get("/api/user", (req, res) => {
//   const jsonData = readJsonData('user.json');
//   res.json(jsonData);
// });

// //Post user
// app.put("/api/user", (req, res) => {
//   const jsonData = readJsonData('user.json');
//   const updatedData = Array.isArray(jsonData) ? jsonData : [];
//   updatedData.push(req.body);
//   writeJsonData('user.json', updatedData);
//   res.json({ message: "Data updated successfully" });
// });

// //Get specific user
// app.get('/api/user/:user_id',(req,res)=>{
//     const userId = req.params.user_id;
//     const existingUserData = getUserById(userId);
//     res.json(existingUserData);
// });

// //Put specific user data i.e update existing user data
// app.put('/api/user/:user_id', (req, res) => {
//     const userId = req.params.user_id;
//     const updatedUserData = req.body; // Updated user data from the request body
//     const existingUserData = getUserById(userId);
  
//     if (!existingUserData) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     const allUserData = updateUserById(userId,updatedUserData); // Apply the updates to the existing user data
  
//     writeJsonData('user.json',allUserData);
  
//     res.json({ message: 'User updated successfully', user: allUserData });
//   });


// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


// const loginValue = authController.login(req.body.loginCredentials);
    // if (typeof loginValue !== "object") {
    //   const data = editJson.readJsonData("user.json");
    //   res.json({ message: "running in get users", data });
    // }else{
    //   res.json({ message: "something went wrong in get users" });
    // }