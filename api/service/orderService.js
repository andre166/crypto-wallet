import generateQueryArray from "../utils/generateQueryArray.js";

// id_order int AI PK
// data_compra date
// aporte float
// cotacao_na_compra float
// saldo float
// fk_user_cripto_ativos int
// fk_user int

const addOrder = async (params, syncQuery) => {
  const { arr, quantParams } = generateQueryArray(params);

  return syncQuery(`insert into orders values ${quantParams}`, arr);
};

const getOrders = async (params, syncQuery) => {
  const { fk_user, fk_user_cripto } = params;

  return syncQuery(
    `select * from orders where fk_user = ${fk_user} and fk_user_cripto = ${fk_user_cripto}`
  );
};

const deleteOrders = async (id, syncQuery) => {
  return syncQuery(`delete from orders where id_order = ${id}`);
};

const patchOrders = async (order, syncQuery) => {
  const { arr, quantParams, ID, sql } = generateQueryArray(order, true);

  return syncQuery(`update orders set ${sql} WHERE id_order = ${ID}`);
};

export { addOrder, getOrders, deleteOrders, patchOrders };
