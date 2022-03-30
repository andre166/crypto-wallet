import generateQueryArray from "../utils/generateQueryArray.js";
import OrderModel from "../model/OrderModel.js";

const addOrder = async (params, syncQuery) => {
  let m = new OrderModel(params);

  const { Error, arr, quantParams } = m.getPutParams();

  if (Error) {
    return Error;
  }

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
