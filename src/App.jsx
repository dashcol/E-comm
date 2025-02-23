import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./features/nav/nav";
import Signin from "./features/Users/signin/signin";
import Signup from "./features/Users/signup/signup";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import Products from "./features/prodcuts/products";
import ProtectedRoute from "./features/protect/protect";
import Cart from "./features/cart/cart";
import Order from "./features/order/order";
import Home from "./features/home/home";
import { PersistGate } from "redux-persist/lib/integration/react";
import Settings from "./features/settings/settings";
import ThemeManager from "./features/theme/themeManger/themeManager";
import PaymentsForm from "./features/payment-form/PaymentsForm";
import StripeProvider from "./features/payment-form/stripe-wrapper";
import ForgotPass from "./features/Users/forgot-pass/ForgotPass";
import Profile from "./features/Profile/Profile";
import AboutUs from "./features/aboutus/Aboutus";
import ContactUs from "./features/contact/contact";
import PrivacyPolicy from "./features/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./features/TermsOfService/TermsOfService";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "signin",
          children: [
            { index: true, element: <Signin /> },
            { path: "forgot-password", element: <ForgotPass /> },
          ],
        },
        { path: "signup", element: <Signup /> },
        { path: "products", element: <Products /> },
        {
          path: "cart",
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              ),
            },
            {
              path: "payments",
              element: (
                <ProtectedRoute>
                  <StripeProvider>
                    <PaymentsForm />
                  </StripeProvider>
                </ProtectedRoute>
              ),
            },
            {
              path: "orders",
              element: (
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              ),
            },
          ],
        },
        { path: "settings", element: <Settings /> },
        { path: "about", element: <AboutUs /> },
        { path: "contact", element: <ContactUs /> },
        { path: "privacy", element: <PrivacyPolicy /> },
        { path: "terms", element: <TermsOfService /> },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <ThemeManager />
      <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}
