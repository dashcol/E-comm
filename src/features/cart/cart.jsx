import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../prodcuts/redux/product.redux";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const cart = useSelector((state) => state.products.cart || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(productActions.removeFromCart(id));
  };
  const handlePurchase = () => {
    dispatch(productActions.orders());
    navigate("/order");
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-400">
          Your cart is empty. Add items to proceed.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <div className="h-40 flex justify-center items-center bg-gray-700 rounded-lg">
                <img className="h-32 w-auto" src={item.img} alt={item.name} />
              </div>
              <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
              <p className="text-gray-400">${item.price}</p>
              <button
                onClick={() => handleRemove(item.id)}
                className="w-full mt-4 bg-red-600 text-white py-2 rounded-md hover:bg-red-500 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePurchase()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition"
        >
          Purchase
        </button>
      </div>
    </div>
  );
}
