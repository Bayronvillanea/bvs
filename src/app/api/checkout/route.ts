import { NextRequest, NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";

const clientId = process.env.PAYPAL_CLIENT_ID || "";
const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "";

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { price, plan } = await req.json();

    const purchaseUnits = [
      {
        amount: {
          currency_code: "USD",
          value: Number(price)?.toFixed(2),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: Number(price)?.toFixed(2),
            },
          },
        },
        items: [
          {
            name: plan,
            quantity: 1,
            unit_amount: {
              currency_code: "USD",
              value: Number(price)?.toFixed(2),
            },
          },
        ],
      },
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
    console.log("Order Status:", response.result.status);
    console.log("Order ID:", response.result.id);
    console.log("Links:");
    response.result.links.forEach((link: any) => {
      console.log(link.rel + ": " + link.href);
    });

    // Respond with order status
    return Response.json({ status: response.result.status });
  } catch (error) {
    console.error("Error creating order:", error);
    return Response.json({
      error: "Failed to create order. Please try again later.",
    });
  }
}
