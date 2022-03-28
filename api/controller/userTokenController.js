import {
  addToken,
  getTokenList,
  countAporte,
  countMedia,
  countSaldo,
} from "../service/userTokenService.js";
import { setRedis, getRedis, delRedis } from "../middleware/redisConfig.js";
import connAndQuery from "../utils/connAndQuery.js";
import CmcController from "./cmcController.js";

class UserTokenController {
  async addTokenOnUser(params) {
    const { conn, syncQuery } = connAndQuery();

    const resp = await addToken(params, syncQuery);
    conn.destroy();

    return resp;
  }

  mockTokenInfo = async (userTokenList, resp2) => {
    let generateInfo = (token = {}) => {
      let infoObj = {
        logo: token.logo,
        name: token.name,
        slug: token.slug,
        symbol: token.symbol,
        urls: token.urls,
      };

      return { ...infoObj };
    };

    let tokenInfo = resp2?.data?.data || [];
    let arr = await userTokenList.map((e) => {
      let actualID = e.cmc_id;
      let i = tokenInfo[actualID];

      e.info = generateInfo(i);

      return e;
    });
    return arr;
  };

  async getTokenList(userID, CONN) {
    const { conn, syncQuery } = connAndQuery(CONN);
    const cmcController = new CmcController();

    let finalTokenList = [];

    const userTokenList = await getTokenList(userID, syncQuery);

    // await delRedis(`userTokenList-${userID}`);

    let redisUserTokenList = await getRedis(`userTokenList-${userID}`);

    redisUserTokenList = JSON.parse(redisUserTokenList);

    let hasDiference = false;

    if (redisUserTokenList) {
      userTokenList.map((e, i) => {
        if (redisUserTokenList[i].cmc_id !== e.cmc_id) {
          hasDiference = true;
        }
      });
    } else {
      hasDiference = true;
    }

    //Se a lista de tokens do usuário for diferente da lista do cache chama a api do cmc
    if (hasDiference) {
      let tokenIDS = await userTokenList.map((e) => e.cmc_id);
      tokenIDS = tokenIDS.join(",");

      let cmcApiResp = await cmcController.getTokensInfo(tokenIDS);

      let formatedUserTokenList = await this.mockTokenInfo(
        userTokenList,
        cmcApiResp
      );

      finalTokenList = formatedUserTokenList;
      await setRedis(
        `userTokenList-${userID}`,
        JSON.stringify(formatedUserTokenList)
      );
    } else {
      finalTokenList = redisUserTokenList;
    }

    if (!CONN) conn.destroy();

    return finalTokenList;
  }

  async countAporte(params) {
    const { conn, syncQuery } = connAndQuery();

    const resp = await countAporte(params, syncQuery);
    conn.destroy();

    return resp;
  }

  async countMedia(params) {
    const { conn, syncQuery } = connAndQuery();

    const resp = await countMedia(params, syncQuery);
    conn.destroy();

    return resp;
  }
  async countSaldo(params) {
    const { conn, syncQuery } = connAndQuery();

    const resp = await countSaldo(params, syncQuery);
    conn.destroy();

    return resp;
  }
}

export default UserTokenController;
