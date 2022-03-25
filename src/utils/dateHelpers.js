const yyyyMMDD_to_string = (date) => {
  const data = date.split("-");

  return new Date(data[0], data[1] - 1, data[2], 0, 0, 0);
};

const ddMMyyyy_to_string = (date) => {
  if (!date) {
    return null;
  }
  let data = [...date.split("/")];

  return new Date(data[2], data[1] - 1, data[0], 0, 0, 0);
};

export { yyyyMMDD_to_string, ddMMyyyy_to_string };
