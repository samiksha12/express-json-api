const fs = require("fs");

exports.readJsonData = (jsonFile) => {
  try {
    const data = fs.readFileSync(jsonFile, "utf8");
    return JSON.parse(data) || [];
  } catch (error) {
    console.log("Error reading JSON file");
    return [];
  }
};

exports.writeJsonData = (jsonFile, data) => {
  try {
    if(this.isJson(data)){
    fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2), "utf8");
    }else{
        throw new Error('Invalid data');
    }
  } catch (error) {
    console.error("Error writing JSON data:", error);
  }
};


exports.isJson=(item)=> {
    let value = typeof item !== "string" ? JSON.stringify(item) : item;
    try {
      value = JSON.parse(value);
    } catch (e) {
      return false;
    }  
    return typeof value === "object" && value !== null;
  }