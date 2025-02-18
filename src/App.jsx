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

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: [
        { index: true, element: <Home /> },
        { path: "/signin", element: <Signin /> },
        { path: "/signup", element: <Signup /> },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/order",
          element: (
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          ),
        },
        { path: "/settings", element: <Settings /> },
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
