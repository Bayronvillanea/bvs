"use client";

// React
import React from "react";

// Next
import { useSearchParams } from "next/navigation";

// React Hot Toast
import toast, { Toaster } from "react-hot-toast";

// axios
import axios from "axios";

// React PayPal
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Components
import Breadcrumb from "@/components/Common/Breadcrumb";

const Payment = () => {
  const searchParams = useSearchParams();
  return (
    <div>
      <Breadcrumb
        pageName="Page Payment"
        description="This is the Payment page of BVSoftware. Make your payment with ease"
      />

      <div className="mx-auto max-w-lg rounded-lg bg-white p-8 shadow-md dark:bg-gray-900">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Complete Your Payment
        </h2>
        <Toaster />

        <div className="flex justify-center">
          <PayPalScriptProvider
            options={{
              clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical", color: "silver" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: (
                          Number(searchParams.get("price")) || 0
                        )?.toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                console.log(
                  "Transaction was approved, but not captured yet.",
                  data,
                  actions,
                );
                return actions.order.capture().then(async function (details) {
                  console.log(
                    "Transaction completed by " + details.payer.name.given_name,
                  );

                  try {
                    // Call your server to save the transaction
                    await axios.post("/api/checkout", {
                      plan: searchParams.get("plan"),
                      price: searchParams.get("price"),
                    });

                    toast.success("Transaction completed successfully!!");
                  } catch (err) {
                    toast.error("Something went wrong!");
                  }
                });
              }}
              onCancel={(data) => {
                console.log("Payment was cancelled by the user:", data);
                toast.error("Payment was cancelled!");
              }}
            />
          </PayPalScriptProvider>
        </div>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
          By completing your payment, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">
            Terms and Conditions
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Payment;
