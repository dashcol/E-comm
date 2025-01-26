import { useSelector } from "react-redux";

export default function Order() {
  const orders = useSelector((state) => state.products.orders || []);
  console.log(orders);

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Order Confirmation
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Thank you for your order. Your order will be delivered to you soon.
        </p>

        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="flex justify-between items-center bg-gray-700 p-4 rounded-md shadow-md"
            >
              <div>
                <h4 className="text-lg font-semibold">{order.name}</h4>
                <h6 className="text-gray-400">${order.price}</h6>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
