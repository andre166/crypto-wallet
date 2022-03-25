import { getToken, getTokensInfo } from "../service/cmcService.js";
import { setRedis, getRedis, delRedis } from "../middleware/redisConfig.js";
class CmcController {
  async getToken() {
    let tokenList = {
      type: "",
      data: [],
    };

    // await delRedis("cmcTokenList");
    const tokenListRedis = await getRedis("cmcTokenList");

    if (!tokenListRedis) {
      const resp = await getToken();
      tokenList.type = "CMC";
      let lista = resp?.data ? resp.data?.data : [];

      let arr = [];

      for (let token of lista) {
        let obj = {
          id: token.id,
          cmc_rank: token.cmc_rank,
          name: token.name,
          slug: token.slug,
          symbol: token.symbol,
          quote: token.quote,
        };

        arr.push({ ...obj });
      }

      tokenList.data = arr;

      await setRedis("cmcTokenList", JSON.stringify(arr));
    } else {
      tokenList.type = "CACHE";
      tokenList.data = JSON.parse(tokenListRedis);
    }

    return tokenList;
  }

  async getTokensInfo(tokensIDS) {
    let resp = await getTokensInfo(tokensIDS);

    return resp;
  }
}

export default CmcController;
