import AtivoModel from "../model/AtivoModel.js";

const addToken = async (params, syncQuery) => {
  let ativoModel = new AtivoModel(params);

  const { arr, quantParams } = ativoModel.getPutParams();

  return syncQuery(`insert into user_cripto values ${quantParams}`, arr);
};

const getTokenList = async (id, syncQuery) => {
  return syncQuery(
    `select * from user_cripto where user_fk = ${id} ORDER BY cmc_id ASC`
  );
};

const countAporte = async (params, syncQuery) => {
  let { userID, user_cripto } = params;

  if (!user_cripto) {
    return syncQuery(
      `select SUM(aporte) as totalAporte from orders where fk_user = ${userID}`
    );
  }

  return syncQuery(
    `select SUM(aporte) as totalAporte from orders where fk_user = ${userID} and fk_user_cripto = ${user_cripto}`
  );
};

const countMedia = async (params, syncQuery) => {
  let { userID, user_cripto } = params;

  return syncQuery(
    `select AVG(cotacao_na_compra) as media from orders where fk_user = ${userID}  and fk_user_cripto = ${user_cripto}`
  );
};

const countSaldo = async (params, syncQuery) => {
  let { userID, user_cripto } = params;

  if (!user_cripto) {
    return syncQuery(
      `select SUM(saldo) as saldo from orders where fk_user = ${userID}`
    );
  }

  return syncQuery(
    `select SUM(saldo) as saldo from orders where fk_user = ${userID}  and fk_user_cripto = ${user_cripto}`
  );
};

export { addToken, getTokenList, countAporte, countMedia, countSaldo };
