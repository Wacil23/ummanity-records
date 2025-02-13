export interface Currencies {
  data: {
    [key: string]: number;
  };
}

export const Currencies = async (
  baseCurrency: string,
  currencies: string[]
): Promise<Currencies> => {
  const apiKey = process.env.CURRENCY_API_KEY;
  const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=${baseCurrency}&currencies=${currencies.join(
    ","
  )}`;

  const response = await fetch(url);
  const data = (await response.json()) as Currencies;
  return data;
};
