import { getMYSCustomerOrder } from "@/services/shopify/mysadaka/query/Order.query";
import { getWAKCustomerOrder } from "@/services/shopify/wakala/query/Order.query";

export interface ShopifyInterface {
  totalSalesWAKFormatted: string;
  totalSalesMYSFormatted: string;
  totalSales: number;
}

export async function GET() {
  try {
    const totalSalesWAK = await getWAKCustomerOrder();
    const totalSalesWAKFormatted = totalSalesWAK.toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR",
    });
    const totalSalesMYS = await getMYSCustomerOrder();
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
