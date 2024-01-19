import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { useState } from "react";

const InputField = ({ label, errorMessage, onInputChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onInputChange(newValue); // Notify parent component of input change
  };

  return (
    <>
      <TextField
        id={label}
        label={`outlined-${label.toLowerCase()}`}
        variant="outlined"
        helperText={errorMessage}
        margin="dense"
        value={inputValue}
        error={!!errorMessage}
        onChange={handleChange}
        fullWidth
        required
      />
    </>
  );
};

export default InputField;

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
