import axios from "axios";
import { localHost } from "../../utils/localHostUtils";

export const jsonToExcel = async () => {
  const response = await axios
    .post(`${localHost}/rest/json2xls`)
    .catch((error) => error);

  return response.data;
};
