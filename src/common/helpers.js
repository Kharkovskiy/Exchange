const getCurrencyRate = (currencies, currency) => {
  return currencies.find((item) => item.cc === currency)?.rate || 0;
};

export { getCurrencyRate };
