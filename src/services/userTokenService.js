import axios from "axios";
import { localHost } from "../utils/localHostUtils";

const addTokenOnUser = async (token) => {
  const response = await axios
    .post(`${localHost}/user-token/add`, token)
    .catch((error) => error);

  return response.data;
};

const getUserTokenList = async (id) => {
  const response = await axios
    .get(`${localHost}/user-token/get-user-token-list/${id}`)
    .catch((error) => error);

  return response.data;
};

const countUserAportesInfo = async (params) => {
  const response = await axios
    .post(`${localHost}/user-token/users-aporte-info`, params)
    .catch((error) => error);

  return response.data;
};

export { addTokenOnUser, getUserTokenList, countUserAportesInfo };
