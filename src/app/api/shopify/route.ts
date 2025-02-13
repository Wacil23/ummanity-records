import { getMYSCustomerOrder } from "@/services/shopify/mysadaka/query/Order.query";
import {
  getCurrentDate,
  getFirstDayOfMonth,
  getWAKCustomerOrder,
} from "@/services/shopify/wakala/query/Order.query";

export interface ShopifyInterface {
  totalSalesWAKFormatted: string;
  totalSalesMYSFormatted: string;
  totalSales: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const firstDate = searchParams.get("firstDate") || getFirstDayOfMonth();
    const lastDate = searchParams.get("lastDate") || getCurrentDate();
    const totalSalesWAK = await getWAKCustomerOrder({
      firstDate,
      lastDate,
    });
    const totalSalesWAKFormatted = totalSalesWAK.toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR",
    });
    const totalSalesMYS = await getMYSCustomerOrder({
      firstDate,
      lastDate,
    });
    const totalSalesMYSFormatted = totalSalesMYS.toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR",
    });

    return Response.json({
      totalSalesWAKFormatted,
      totalSalesMYSFormatted,
      totalSales: totalSalesWAK + totalSalesMYS,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
  }
}
