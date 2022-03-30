import axios from "axios";
import { localHost } from "../utils/localHostUtils";

const PATH = "/order/";

const addOrder = async (order) => {
  const response = await axios
    .post(`${localHost}${PATH}/add`, order)
    .catch((error) => error);

  return response.data;
};

const getOrderList = async (userID, ativoID) => {
  const response = await axios
    .get(`${localHost}${PATH}getOrders/${userID}/${ativoID}`)
    .catch((error) => error);

  return response.data;
};

const deleteOrder = async (orderID) => {
  const response = await axios
    .delete(`${localHost}${PATH}delete/${orderID}`)
    .catch((error) => error);

  return response.data;
};

const patchOrder = async (order) => {
  const response = await axios
    .patch(`${localHost}${PATH}patch`, order)
    .catch((error) => {
      console.log(error);
      return error;
    });

  return response.data;
};

export { addOrder, getOrderList, deleteOrder, patchOrder };
