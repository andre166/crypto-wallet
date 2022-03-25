import util from "util";
import connection from "../config/index.js";

export default function connAndQuery(CONN) {
  const conn = CONN ? CONN : connection();
  const syncQuery = util.promisify(conn.query).bind(conn);

  return { conn, syncQuery };
}
