import generateQueryArray from "../utils/generateQueryArray.js";

// name varchar(45)
// slug varchar(45)
// symbol varchar(45)
// token_address varchar(45)
// cmc_id int
// user_fk int
const addToken = async (params, syncQuery) => {
  const { arr, quantParams } = generateQueryArray(params);

  return syncQuery(`insert into user_cripto_ativos values ${quantParams}`, arr);
};

const getTokenList = async (id, syncQuery) => {
  return syncQuery(
    `select * from user_cripto_ativos where user_fk = ${id} ORDER BY cmc_id ASC`
  );
};

export { addToken, getTokenList };
