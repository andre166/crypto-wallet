import {
  addOrder,
  getOrders,
  deleteOrders,
  patchOrders,
} from "../service/orderService.js";
import connAndQuery from "../utils/connAndQuery.js";

class OrderController {
  async addOrder(params) {
    const { conn, syncQuery } = connAndQuery();

    const resp = await addOrder(params, syncQuery);
    conn.destroy();

    return resp;
  }

  async getOrders(params) {
    const { conn, syncQuery } = connAndQuery();

    const resp = await getOrders(params, syncQuery);
    conn.destroy();

    return resp;
  }
  async deleteOrders(id) {
    const { conn, syncQuery } = connAndQuery();

    const resp = await deleteOrders(id, syncQuery);
    conn.destroy();

    return resp;
  }

  async patchOrders(order) {
    const { conn, syncQuery } = connAndQuery();

    const resp = await patchOrders(order, syncQuery);
    conn.destroy();

    return resp;
  }
}

export default OrderController;
