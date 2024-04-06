// Payment.tsx
"use client"
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Breadcrumb from "@/components/Common/Breadcrumb";


const Payment = () => {
  
  return (
    <div>
      <Breadcrumb
        pageName="Page Payment"
        description="This is the Payment page of BVSoftware. Make your payment with ease"
      />

      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md dark:bg-gray-900">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">Complete Your Payment</h2>
        
        <div className="flex justify-center">
          <PayPalScriptProvider options={{
            "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
          }}>
            <PayPalButtons
              style={{ layout: "vertical", color: "silver" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: '1.00',
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                console.log('Transaction was approved, but not captured yet.');
                return actions.order.capture().then(function(details) {
                  console.log('Transaction completed by ' + details.payer.name.given_name);
                  // Call your server to save the transaction
                  return fetch('/api/checkout', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      orderID: data.orderID,
                    }),
                  });
                });
              }}
              onCancel={(data) => {
                console.log('Payment was cancelled by the user:', data);
              }}
            />
          </PayPalScriptProvider>
        </div>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
          By completing your payment, you agree to our <a href="#" className="text-primary hover:underline">Terms and Conditions</a>.
        </p>
      </div>
    </div>
  );
};

export default Payment;
