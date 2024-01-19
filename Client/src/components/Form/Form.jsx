import InputField from "./InputField";
import Button from "@mui/material/Button";
import { useState } from "react";
import "../styling/form.css";
import axios from "axios";
const Form = () => {
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigreeFunction: "",
    age: "",
    outcome: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigreeFunction: "",
    age: "",
    outcome: "",
  });

  const [popUp, setPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const [predictedData, setPredictedData] = useState("");

  const validateField = (name, value) => {
    const integerRegex = /^\d+$/;
    const errorMessage = `Please enter ${name}, format: integer`;

    if (value.trim === "") {
      return "This field is required.";
    } else if (!integerRegex.test(value)) {
      return errorMessage;
    }
    return "";
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async () => {
    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== "",
    );

    if (hasErrors) {
      setPopUpMessage("Form contains validation errors. Please correct them.");
      setPopUp(!popUp);
    } else {
      console.log("Submitting data:", formData);
      await axios
        .post("/predictDiabetes", {
          ...formData,
        })
        .then((res) => {
          setPredictedData(res.data);
        });
    }
  };

  const handlePopUpClick = () => {
    setPopUp(false);
  };

  return (
    <>
      <div
        className={
          popUp
            ? " popup-container w-full h-lvh z-10 bg-transparent flex flex-col align-middle justify-center text-center items-center absolute rounded-s-xl p-10 backdrop-blur-lg"
            : "  hidden"
        }
      >
        <div className="pop-up w-[300px]">
          <p className="mb-5 text-white">{popUpMessage}</p>
          <Button
            className=""
            onClick={handlePopUpClick}
            variant="contained"
            color="secondary"
          >
            Close
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center m-5 justify-evenly ">
        <h2 className="mb-5 text-4xl">Customer Data </h2>
        <div className="w-full sm:w-1/4">
          {Object.keys(formData).map((fieldName) => (
            <InputField
              key={fieldName}
              label={fieldName}
              value={formData[fieldName]}
              errorMessage={validationErrors[fieldName]}
              onInputChange={(value) => handleInputChange(fieldName, value)}
            />
          ))}
          <div className="flex flex-row justify-center mt-5">
            <Button
              variant="contained"
              onClick={handleSubmit}
              className="mt-5 "
            >
              Predict the condition
            </Button>
          </div>
        </div>
      </div>
      {predictedData !== "" && <p>{predictedData}</p>}
    </>
  );
};

export default Form;
