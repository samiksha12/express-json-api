const { readJsonData, isJson } = require("../common/editJson");

exports.getUserById = (userId) => {
  if (userId !== "" || userId !== null || userId !== undefined) {
    const allUserData = readJsonData("user.json");
    const userData = allUserData.filter((data) => {
      return data.user_id === userId;
    });
    return userData;
  }
  return [];
};

exports.updateUserById = (userId, updateData) => {
  if (
    (userId !== "" || userId !== null || userId !== undefined) &&
    isJson(updateData)
  ) {
    const allUserData = readJsonData("user.json");
    allUserData.some((data) => {
      if (data.user_id === userId && data.user_id === updateData.user_id) {
        data.login_date = updateData.login_date;
        return true;
      }
    });
    return allUserData;
  }
  return [];
};

exports.updateUserData = (user_Id, newData, jsonData) => {
  if (
    (user_Id !== "" || user_Id !== null || user_Id !== undefined) &&
    isJson(newData)
  ) {
    const index = jsonData.findIndex((item) => item.hasOwnProperty(user_Id));
    if (index !== -1) {
      const existingData = jsonData[index][user_Id];
      for (const newObj of newData[user_Id]) {
        const isDuplicate = existingData.some((obj) => {
          if (obj.title === newObj.title) {
            obj.active = newObj.active;
            return true;
          }
        });
        if (!isDuplicate) {
          existingData.push(newObj);
        }
      }
      // console.log(`Data for user ${user_Id} has been updated.`);
      jsonData[index][user_Id] = existingData;
    } else {
      // If the user ID doesn't exist, create a new entry
      jsonData.push(newData);
      // console.log(`New data entry created for user ${user_Id}.`);
    }
  }
  return jsonData;
};

exports.getUserDataById = (userId) => {
  if (userId !== "" && userId !== null && userId !== undefined) {
    const userData = this.getUserById(userId);
    if (userData) {
      const jsonData = readJsonData("data.json");
      const index = jsonData.findIndex((item) => item.hasOwnProperty(userId));
      if (index !== -1) {
        const existingData = jsonData[index][userId];
        return existingData;
      }
      return [];
    }
  }
};

exports.deleteDataById = (userId,data)=>{
  if (userId !== "" && userId !== null && userId !== undefined) {
    const userData = this.getUserById(userId);
    if (userData) {
      const jsonData = readJsonData("data.json");
      const index = jsonData.findIndex((item) => item.hasOwnProperty(userId));
      if (index !== -1) {
        const existingData = jsonData[index][userId];
        const filteredData = existingData.filter((item)=> item.title !== data.title);
        return filteredData;
      }
      return [];
    }
  }
};