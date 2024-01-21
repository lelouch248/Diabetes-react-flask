import express from "express";
const app = express();
import bodyParser from "body-parser";
import axios from "axios";
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/predictDiabetes", (req, res) => {
  const inputData = req.body;
  try {
    console.log(inputData);
    axios.post("/predict", inputData).then(
      (response) => {
        console.log(response.status);
      },
      (error) => {
        console.error(error);
      }
    );
  } catch (error) {
    console.error("Error making prediction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  res.status(200).json({ message: "Form data received successfully!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
