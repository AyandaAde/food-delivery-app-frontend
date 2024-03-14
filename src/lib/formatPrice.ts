export function formatPriceUSD(price: number) {
  const usdPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return usdPrice;
  // return price.toLocaleString("en-US", {
  //   style: "currency",
  //   currency: "USD",
  // });
}

//* Euro
export function formatPriceEUR(price: number) {
  const convertedPrice = price * 1.09;
  const newPrice = convertedPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "EUR",
  });

  return newPrice;
}
//* Yen
export function formatPriceJPY(price: number) {
  const convertedPrice = price * 147.95;
  const newPrice = convertedPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "JPY",
  });

  return newPrice;
}

//* Pound
export function formatPriceGBP(price: number) {
  const convertedPrice = price * 1.27;
  const newPrice = convertedPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "GBP",
  });

  return newPrice;
}

//* Chinese Renminbi (CNY)
export function formatPriceCNY(price: number) {
  const convertedPrice = price * 0.14;
  const newPrice = convertedPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "CNY",
  });

  return newPrice;
}

//* AUD
export function formatPriceAUD(price: number) {
  const convertedPrice = price * 0.65;
  const newPrice = convertedPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "AUD",
  });

  return newPrice;
}

//* CAD
export function formatPriceCAD(price: number) {
  const convertedPrice = price * 0.74;
  const newPrice = convertedPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "CAD",
  });

  return newPrice;
}

//* CHF
export function formatPriceCHF(price: number) {
  const convertedPrice = price * 1.13;
  const newPrice = convertedPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "CHF",
  });

  return newPrice;
}

//* HKD
export function formatPriceHKD(price: number) {
  const convertedPrice = price * 0.13;
  const newPrice = convertedPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "HKD",
  });

  return newPrice;
}

//* NZD
export function formatPriceNZD(price: number) {
  const convertedPrice = price * 0.61;
  const newPrice = convertedPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "NZD",
  });

  return newPrice;
}
