import { env } from "process";
import { InsightsParameters } from "../../models/facebook/InsightsParameters";

interface GETInsightsParameters {
  parameters: InsightsParameters;
  isMysadaka: boolean;
}

export interface Insights {
  id: string;
  data: {
    campaign_name: string;
    impressions: number;
    clicks: number;
    spend: number;
    status: string;
  }[];
  summary: {
    spend: string;
  };
}

export const getInsights = async ({
  parameters,
  isMysadaka,
}: GETInsightsParameters): Promise<Insights> => {
  const actAccount = isMysadaka
    ? process.env.MYS_ACT_ACCOUNT
    : process.env.WAK_ACT_ACCOUNT;

  const url = new URL(
    `https://graph.facebook.com/v22.0/${actAccount}/insights`
  );
  const searchParams = new URLSearchParams();

  Object.entries(parameters).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, value.toString());
    }
  });

  searchParams.append("access_token", env.FACEBOOK_META_TOKEN!);
  url.search = searchParams.toString();

  const response = await fetch(url.toString());
  const data = (await response.json()) as Insights;

  /* Convert spend to EUR if is Wakala */
  const currencies = await fetch(
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json"
  );
  const currenciesData = await currencies.json();
  const spend = isMysadaka
    ? Number(data.summary.spend)
    : Number(data.summary.spend) * currenciesData.usd.eur || 0;

  return { ...data, summary: { spend: spend.toFixed(2) } };
};
