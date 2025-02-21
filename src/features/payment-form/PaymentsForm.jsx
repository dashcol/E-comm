import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from "react-router-dom";

export default function PaymentsForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const functions = getFunctions();
      const createPaymentIntent = httpsCallable(
        functions,
        "createPaymentIntent"
      );

      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const {
        data: { clientSecret },
      } = await createPaymentIntent({
        items: cart.map((item) => ({
          id: item.id,
          price: item.price,
          quantity: item.quantity,
        })),
      });

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        alert(error.message);
      } else if (paymentIntent.status === "succeeded") {
        navigate("/cart/orders");
      }
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 dark:bg-gray-900">
      <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg shadow-lg w-full mt-8 max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Payment Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#ffffff",
                  "::placeholder": {
                    color: "#cccccc",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            className="p-3 border rounded-md bg-gray-200 dark:bg-gray-700"
          />

          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
