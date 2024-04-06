import { useRouter } from "next/router";
import { useState } from "react";

const PaymentPage = () => {
  const router = useRouter();
  const { packageName, price } = router.query;
  const [paymentStatus, setPaymentStatus] = useState("");

  const handlePayment = () => {
    // Aquí debes implementar la lógica para procesar el pago con PayPal
    // Puedes usar la API de PayPal o cualquier biblioteca de cliente de PayPal

    // Simulamos un procesamiento de pago exitoso
    setTimeout(() => {
      setPaymentStatus("success");
    }, 2000);
  };

  return (
    <div>
      <h1>Payment Details</h1>
      <p>Package Name: {packageName}</p>
      <p>Price: ${price}</p>

      {paymentStatus === "success" ? (
        <p>Payment successful!</p>
      ) : (
        <button onClick={handlePayment}>Pay with PayPal</button>
      )}
    </div>
  );
};

export default PaymentPage;
