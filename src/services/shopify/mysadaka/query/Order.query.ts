import { IGOrder, IMonetarySet } from "@/models/shopify/IOrder";
import { mySadakaAdminClient } from "../Mysadaka";

interface IMYSCustomerOrder {
  firstDate: string;
  lastDate: string;
}

export async function getMYSCustomerOrder({
  firstDate,
  lastDate,
}: IMYSCustomerOrder): Promise<number> {
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
              taxesIncluded
              currencyCode
              totalPrice 
              totalPriceSet{
                shopMoney {
                  amount
                }
              }
              currentTotalTaxSet {
                shopMoney {
                  amount
                }
              }
              subtotalPriceSet {
                shopMoney {
                  amount
                }
              }
              totalTaxSet {
                shopMoney {
                  amount
                }
              }
                refunds(first: 150){
                totalRefundedSet{
                  shopMoney{
                    amount
                  }
                }
              }
          
              totalShippingPriceSet {
                shopMoney {
                  amount
                }
              }
              currentTotalDutiesSet {
                shopMoney {
                  amount
                }
              }
              currentTotalAdditionalFeesSet {
                shopMoney {
                  amount
                }
              }
              currentTotalDiscountsSet {
                shopMoney {
                  amount
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

      const response = await mySadakaAdminClient.request<IGOrder>(orderQuery);
      const { data, errors } = response;

      if (!data || errors) {
        console.error(errors);
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
