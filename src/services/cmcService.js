import axios from "axios";
import { localHost } from "../utils/localHostUtils";

export const getToken = async () => {
  const response = await axios
    .get(`${localHost}/cmc/token`)
    .catch((error) => error);

  return response.data;
};
