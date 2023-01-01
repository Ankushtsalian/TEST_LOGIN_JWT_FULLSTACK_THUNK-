const errorMessage = (error) => {
  const message =
    (error.response && error.response.data && error.response.data.msg) ||
    error.message ||
    error.toString();
  console.log(error.response);

  return { errorStatusCode: error.response.status, message };
};

export default errorMessage;
