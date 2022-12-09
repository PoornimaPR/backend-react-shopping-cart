const fs = require("fs");
const router = require("express").Router();
const dataPath = "./src/json/products.json";

router.get("/", (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    let databases = JSON.parse(data);
    res.status(200).json(databases);
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
  }
});

router.put("/updateProducts", (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    let databases = JSON.parse(data);
    databases.map((original) => {
      req.body.products.map((data) => {
        if (original.id === data.id) {
          original.available = original.available - data.quantity;
        }
      });
    });
    fs.writeFile(dataPath, JSON.stringify(databases, null, 2), (error) => {
      if (error) {
        return;
      }
    });
    res.status(200).json(databases);
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
  }
});

module.exports = router;
