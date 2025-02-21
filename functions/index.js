import * as functions from "firebase-functions";
import Stripe from "stripe";
import * as admin from "firebase-admin";

admin.initializeApp();

const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: "2023-10-16",
});

export const createPaymentIntent = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "Authentication required"
      );
    }

    const userCartRef = admin
      .firestore()
      .collection("users")
      .doc(context.auth.uid)
      .collection("cart");

    const snapshot = await userCartRef.get();
    const serverItems = snapshot.docs.map((doc) => doc.data());

    const total = serverItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total * 100,
        currency: "usd",
        metadata: { userId: context.auth.uid },
      });

      return { clientSecret: paymentIntent.client_secret };
    } catch (err) {
      throw new functions.https.HttpsError("internal", err.message);
    }
  }
);
