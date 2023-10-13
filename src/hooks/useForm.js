import { useEffect, useMemo } from "react";
import { useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormSate] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormSate(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormSate({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormSate(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      // Desestructuramos
      const [fn, errorMessage = "Este campo es requerido"] =
        formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;

      setFormValidation(formCheckedValues);
    }
  };

  return {
    formState,
    ...formState, // Desestructuramos el formState
    onInputChange,
    onResetForm,

    ...formValidation, // Desestructuramos el formValidation del useState
    isFormValid,
  };
};
