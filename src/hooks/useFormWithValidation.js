import React, { useCallback } from "react";

export function useFormWithValidation(defaultValues = {}) {
  const [values, setValues] = React.useState(defaultValues);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    let value = target.value;
    if (event.target.type === "checkbox") {
      value = !values[name];
    }
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, handleInputChange, errors, isValid, resetForm };
}