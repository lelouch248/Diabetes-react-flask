import express from "express";
const app = express();
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET, POST, PUT,DELETE",
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api", (_, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/predictDiabetes", async (req, res) => {
  const inputData = req.body;
  console.log(inputData);
  let prediction;
  try {
    await axios.post("http://127.0.0.1:5000/predict", inputData).then((res) => {
      prediction = res.data.prediction;
    });

    res.status(200).json({
      message: "Form data received successfully!",
      prediction: prediction,
    });
  } catch (error) {
    console.error("Error making prediction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
