import express from "express";
const app = express();
import bodyParser from "body-parser";
import { load } from "joblib";

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

const loadModel = () => {
  return load("./ML_model/random_forest_model.joblib");
};
let model;

loadModel()
  .then((loadedModel) => {
    model = loadedModel;
    console.log("model laoded successfully");
  })
  .catch((error) => {
    console.log("error loading model: ", error);
  });

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/predictDiabetes", (req, res) => {
  const inputData = req.body;
  try {
    if (!model) {
      throw new Error("model is not laoded yet");
    }
    console.log(inputData);
    const prediction = model.predict([inputData]);
    res.status(200).json({ prediction });
  } catch (error) {
    console.error("Error making prediction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  res.status(200).json({ message: "Form data received successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
