import axios from "axios";

const getToken = async () => {
  const response = await axios.get(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=3500",
    {
      headers: {
        "X-CMC_PRO_API_KEY": "e7d06fe8-490b-455f-8908-883d7bcd2be2",
      },
    }
  );

  return response;
};

const getTokensInfo = async (tokenIDs) => {
  const response = await axios.get(
    // `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${"1"}`,
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${tokenIDs}`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": "e7d06fe8-490b-455f-8908-883d7bcd2be2",
      },
    }
  );

  return response;
};

export { getToken, getTokensInfo };
