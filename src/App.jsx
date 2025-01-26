import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./features/nav/nav";
import Signin from "./features/Users/signin/signin";
import Signup from "./features/Users/signup/signup";
import { Provider } from "react-redux";
import store from "./store/store";
import Products from "./features/prodcuts/products";
import ProtectedRoute from "./features/protect/protect";
import Cart from "./features/cart/cart";
import Order from "./features/order/order";
import Home from "./features/home/home";

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
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
