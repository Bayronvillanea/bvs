// api/checkout.ts
import { NextApiRequest, NextApiResponse } from "next";
import paypal from "@paypal/checkout-server-sdk";

const clientId = process.env.PAYPAL_CLIENT_ID || "";
const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "";

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Extract order data from request body
      const { amount, items } = req.body;

      // Calculate the total value of items
      const itemTotal = items.reduce((total: number, item: any) => {
        return total + parseFloat(item.unit_amount.value) * parseInt(item.quantity);
      }, 0).toFixed(2);

      // Construct the purchase units for the order
      const purchaseUnits = [
        {
          amount: {
            currency_code: amount.currency_code,
            value: amount.value,
            breakdown: {
              item_total: {
                currency_code: amount.currency_code,
                value: itemTotal,
              }
            }
          },
          items: items.map((item: any) => ({
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            unit_amount: {
              currency_code: item.unit_amount.currency_code,
              value: item.unit_amount.value,
            },
          }))
        }
      ];

      // Create the order request
      const request = new paypal.orders.OrdersCreateRequest();
      request.requestBody({
        intent: "CAPTURE",
        purchase_units: purchaseUnits,
      });

      // Execute the order creation request
      const response = await client.execute(request);

      // Log order details
      console.log('Order Status:', response.result.status);
      console.log('Order ID:', response.result.id);
      console.log('Links:');
      response.result.links.forEach((link: any) => {
        console.log(link.rel + ': ' + link.href);
      });

      // Respond with order status
      return res.status(200).json({ status: response.result.status });
    } catch (error) {
      console.error('Error creating order:', error);
      return res.status(500).json({ error: 'Failed to create order. Please try again later.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
