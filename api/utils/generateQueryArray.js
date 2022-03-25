var isNumeric = function isNumber(value) {
  return typeof value === "number" && isFinite(value);
};

export default function generateQueryArray(obj, isPut) {
  let arr = [];
  let ID = null;
  let sql = "";
  let paramsLength = Object.keys(obj).length - 1;

  Object.entries(obj).forEach(([key, value], i) => {
    if (i === 0) {
      ID = value;
    }

    if (isPut && i == 0) {
      return;
    }
    let isNumber = isNumeric(value);

    if (!isNumber) {
      sql += `${key} = "${value}"`;
    } else {
      sql += `${key} = ${value}`;
    }

    if (i < paramsLength) {
      sql += ", ";
    }

    arr.push(value);
  });

  const interrogationArr = arr.map((e) => "?");

  let quantParams = `(${interrogationArr.join(",")})`;

  return { arr, quantParams, ID, sql };
}
