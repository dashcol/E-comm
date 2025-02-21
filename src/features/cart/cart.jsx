import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../prodcuts/redux/product.redux";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const cart = useSelector((state) => state.products.cart || []);
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(productActions.removeFromCart(id));
  };

  const handlePurchase = () => {
    dispatch(productActions.orders());
    navigate("/cart/payments");
  };

  const increaseQuantity = (id) => {
    dispatch(productActions.updateQuantity({ id, amount: 1 }));
  };

  const decreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      dispatch(productActions.updateQuantity({ id, amount: -1 }));
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  console.log(cart);

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } p-6`}
    >
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-400">
          Your cart is empty. Add items to proceed.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg shadow-lg hover:scale-105 transition-transform ${
                  isDark ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div
                  className={`h-40 flex justify-center items-center rounded-lg ${
                    isDark ? "bg-gray-700" : "bg-gray-300"
                  }`}
                >
                  <img className="h-32 w-auto" src={item.img} alt={item.name} />
                </div>
                <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
                <p className="text-gray-400">${item.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => decreaseQuantity(item.id, item.quantity)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition"
                  >
                    -
                  </button>
                  <span className="mx-4 text-lg font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition"
                  >
                    +
                  </button>
                </div>

                <p className="font-semibold mt-2">
                  Subtotal: ${item.price * item.quantity}
                </p>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="w-full mt-4 bg-red-600 text-white py-2 rounded-md hover:bg-red-500 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total and Checkout Section */}
          <div
            className={`mt-8 p-6 rounded-lg shadow-lg max-w-md mx-auto ${
              isDark ? "bg-gray-800 text-white" : "bg-gray-100"
            }`}
          >
            <h2 className="text-xl font-semibold text-center mb-4">
              Order Summary
            </h2>
            <div className="flex justify-between text-lg">
              <span>Total:</span>
              <span className="font-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handlePurchase}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition"
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
}
