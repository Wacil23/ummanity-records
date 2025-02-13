import { getInsights, Insights } from "@/services/facebook/Insights";

export interface InsightsInterface {
  insights: {
    name: string;
    data: Insights;
  }[];
}

export async function GET() {
  try {
    // Récupération des insights pour les deux comptes
    const mySadakaInsights = await getInsights({
      isMysadaka: true,
      parameters: {
        action_report_time: "conversion",
        level: "campaign",
        date_preset: "this_month",
        use_account_attribution_setting: true,
        summary: ["spend"],
      },
    });
    const myWakalaInsights = await getInsights({
      isMysadaka: false,
      parameters: {
        action_report_time: "conversion",
        level: "campaign",
        date_preset: "this_month",
        use_account_attribution_setting: true,
        summary: ["spend"],
      },
    });

    return Response.json({
      insights: [
        { name: "My Sadaka", data: mySadakaInsights },
        { name: "My Wakala", data: myWakalaInsights },
      ],
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
  }
}
