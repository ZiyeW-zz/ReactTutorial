// useFormData

import { useState } from 'react';

export const useFormData = (validator = null, initialValues = {}) => {
  const [state, setState] = useState(() => ({ values: initialValues || {}, errors: {} }));

  const change = (evt) => {
    const { id, value } = evt.target;
    const error = validator ? validator(id, value) : '';
    evt.target.setCustomValidity(error);

    const values = { ...state.values, [id]: value };
    const errors = { ...state.errors, [id]: error };
    const hasError = Object.values(errors).some(x => x !== '');
    setState({ values, errors: hasError ? errors : {} });
  };

  return [state, change];
};
