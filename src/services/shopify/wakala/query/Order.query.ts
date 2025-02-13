import { IGOrder, IMonetarySet } from "@/models/shopify/IOrder";
import { wakalaAdminClient } from "../Wakala";

interface IWAKCustomerOrder {
  firstDate: string;
  lastDate: string;
}

// Fonction principale pour récupérer le chiffre d'affaires total
export async function getWAKCustomerOrder({
  firstDate,
  lastDate,
}: IWAKCustomerOrder): Promise<number> {
  try {
    let hasNextPage = true;
    let endCursor: string | null = null;
    let totalSales = 0;

    while (hasNextPage) {
      const orderQuery: string = `
      query {
        orders(first: 250, after: ${endCursor ? `"${endCursor}"` : "null"}, 
        query: "(created_at:>=${firstDate} AND created_at:<=${lastDate}) AND (financial_status:paid OR financial_status:partially_paid OR financial_status:partially_refunded)") {
          edges {
            node {
              id
              name
              createdAt
              currencyCode
              totalPriceSet {
                shopMoney {
                  amount
                }
              }
                refunds(first: 250){
                totalRefundedSet{
                  shopMoney{
                    amount
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }`;

      const response = await wakalaAdminClient.request<IGOrder>(orderQuery);
      const { data, errors } = response;

      if (!data || errors) {
        throw new Error(`Aucune commande trouvée: ${errors?.message}`);
      }

      const { orders } = data;
      const { edges, pageInfo } = orders;
      totalSales += edges.reduce((sum, order) => {
        const node = order.node;
        const totalPrice = parseMoney(node.totalPriceSet);
        const refundSum =
          node.refunds?.reduce((acc: number, refund) => {
            return (
              acc +
              parseFloat(refund.totalRefundedSet?.shopMoney?.amount ?? "0")
            );
          }, 0) ?? 0;
        // Formule Shopify : Total Sales = totalPrice - refunded
        return sum + (totalPrice - refundSum);
      }, 0);
      hasNextPage = pageInfo.hasNextPage;
      endCursor = pageInfo.endCursor;
    }

    return parseFloat(totalSales.toFixed(2));
  } catch (error) {
    throw new Error(`Erreur lors de la récupération : ${error}`);
  }
}

function parseMoney(monetarySet?: IMonetarySet): number {
  return parseFloat(monetarySet?.shopMoney?.amount ?? "0");
}

export function getFirstDayOfMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-01`;
}

export function getCurrentDate(): string {
  const now = new Date();
  return `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
}
