const verifyNullValue = (obj) => {
  let hasNull = false;
  if (typeof obj !== "object") {
    return obj;
  }

  let erroMsg = "Parametros inválidos: ";

  Object.entries(obj).forEach(([key, value]) => {
    if (value == null || value == undefined) {
      hasNull = true;
      erroMsg += `${key}: ${value}, `;
    }
  });

  erroMsg = erroMsg.slice(0, erroMsg.length - 2);

  return { isInvalid: hasNull, erroMsg };
};

export default verifyNullValue;
