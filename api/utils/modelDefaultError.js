const modelDefaultError = (value) => {
  let o = { Error: { Error: value } };

  console.log(o.Error);

  return o;
};

export default modelDefaultError;
