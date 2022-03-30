const getAtivoValues = (ativo, usdPrice) => {
  let price = ativo?.info?.quote?.USD?.price;
  let valorAtual = price * usdPrice;

  return { price, valorAtual };
};

export { getAtivoValues };
