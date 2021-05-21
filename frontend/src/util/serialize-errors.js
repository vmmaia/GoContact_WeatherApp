const serializeErrors = (error) => {
  let errors = undefined;

  if (error.response && error.response.data && error.response.data.errors) {
    const response = error.response.data.errors;
    errors = response
      .reduce((acc, val) => (acc += `, ${val.message}`), '')
      .substring(2);
  } else {
    errors = 'Something went wrong';
  }

  return errors;
};

export default serializeErrors;
