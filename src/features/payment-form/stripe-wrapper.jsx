import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QumSbHysKHwBCSFzJSrTGLbl9o3RwdX1PiVaTie0nYMeIOE3Zrs9XnbedFQYVZ1ni2hMOBDvA848KlIlUxYmXVL009YaUwvsg"
);

export default function StripeProvider({ children }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
