const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const cors = require("cors");

const app = express();

///////

app.use(express.json());
dotenv.config();

app.use(cors());

/////  routes
app.get("/getData/:uniquekey", (req, res) => {
  try {
    let uniquekey = req.params.uniquekey;
    let UNIQUE_KEY = process.env.UNIQUE_KEY;
    if (uniquekey) {
      if (uniquekey === UNIQUE_KEY) {
        let filePath = "public/userData.json";
        const data = fs.readFileSync(filePath, "utf8");
        res.send(data);
      } else {
        res.send("Wrong Unique key");
      }
    } else {
      res.send("No uniqueKey is provided");
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/putData", async (req, res) => {
  let name = req.body.name;
  let number = req.body.number;
  let filePath = "public/userData.json"; // Make sure the file extension is .json

  // Read existing data from the file
  let existingData = [];
  try {
    const data = fs.readFileSync(filePath, "utf8");
    existingData = JSON.parse(data);
    const dataArray = Object.values(existingData);

    // Check if the phone number already exists
    let phoneNumberExists = false;
    dataArray.forEach((element) => {
      if (element.number === number) {
        phoneNumberExists = true;
        return;
      }
    });

    // If the phone number already exists, send an error response
    if (phoneNumberExists) {
      res.json({
        code: 409,
        message: "Phone number already exists",
      });
      return;
    }
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
    return;
  }

  // Add new data to existing data
  let putData = {
    name: name,
    number: number,
  };
  existingData.push(putData);

  // Write the updated data back to the file
  fs.writeFile(
    filePath,
    JSON.stringify(existingData, null, 2),
    "utf-8",
    (error) => {
      if (error) {
        console.error("Error writing to file:", error);
        res.status(500).json({
          code: 500,
          message: "Internal server error",
        });
        return;
      }
      res.json({
        code: 200,
        message: "Data is successfully added",
      });
    }
  );
});



app.listen(8090, () => {
  console.log("Server is running on the port number 8090");
});
