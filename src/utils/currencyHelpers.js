const currencyFormatterValorFull = (value) => {
  let isLargeFraction = false;

  if (parseFloat(value) < 0.1 && parseFloat(value) !== 0) {
    isLargeFraction = true;
  }

  const amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: isLargeFraction ? 7 : 2,
  }).format(value);

  return `${amount}`;
};

const currencyFormatter = (value, style) => {
  let isLargeFraction = false;

  if (parseFloat(value) < 0.1 && parseFloat(value) !== 0) {
    isLargeFraction = true;
  }

  const amount = new Intl.NumberFormat("pt-BR", {
    style: style || "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: isLargeFraction ? 7 : 2,
  }).format(value / 100);

  return `${amount}`;
};

const currencyToFloat = (value, noParse) => {
  let formatedValue = value;

  if (!noParse) {
    formatedValue = value.toString().substring(3, value.length);
  }

  formatedValue = parseFloat(formatedValue.replace(/[\.\,]/g, ""));

  formatedValue /= 100;

  return formatedValue;
};

const FloatToBrlNumber = (value, parse) => {
  if (parse) {
    return value.toString().substring(3, value.length);
  }

  let isLargeFraction = false;

  if (parseFloat(value) < 0.1 && parseFloat(value) !== 0) {
    isLargeFraction = true;
  }

  let amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: isLargeFraction ? 7 : 2,
  }).format(value);

  amount = amount.toString().substring(3, amount.length);

  return amount;
};

const currencyFormatterGeral = (value, intl, currency) => {
  let isLargeFraction = false;

  if (parseFloat(value) < 0.1 && parseFloat(value) !== 0) {
    isLargeFraction = true;
  }

  const amount = new Intl.NumberFormat(intl || "pt-BR", {
    style: "currency",
    currency: currency || "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: isLargeFraction ? 8 : 2,
  }).format(value);

  return `${amount}`;
};

export {
  currencyFormatterValorFull,
  currencyToFloat,
  FloatToBrlNumber,
  currencyFormatter,
  currencyFormatterGeral,
};
