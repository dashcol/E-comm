import { useDispatch, useSelector } from "react-redux";
import {
  categoryAsyncThunk,
  filterAsyncThunk,
  productActions,
  productAsyncThunk,
  productSelector,
  serachAsyncThunk,
} from "./redux/product.redux";
import { useEffect, useState } from "react";

export default function Products() {
  const data = useSelector(productSelector);
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(3000);
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(productAsyncThunk({}));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(serachAsyncThunk(search));
  };

  const handlePriceChange = (e) => {
    const selectedPrice = e.target.value;
    setPrice(selectedPrice);
    dispatch(filterAsyncThunk(selectedPrice));
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    dispatch(categoryAsyncThunk(selectedCategory));
  };

  const addToCart = (product) => {
    dispatch(productActions.addTocart(product));
  };

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Search Box */}
      <div className="flex justify-center mb-6">
        <div
          className={`flex items-center rounded-lg px-4 py-2 w-full max-w-md ${
            isDark ? "bg-gray-800" : "bg-white border border-gray-300"
          }`}
        >
          <input
            className="bg-transparent flex-1 outline-none placeholder-gray-400"
            placeholder="Search here..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <img
            onClick={handleSearch}
            className="w-6 h-6 ml-2 cursor-pointer"
            alt="search"
            src="https://cdn-icons-png.flaticon.com/128/18574/18574282.png"
          />
        </div>
      </div>

      <div className="flex gap-6">
        <div
          className={`w-1/4 p-4 rounded-lg shadow-md ${
            isDark ? "bg-gray-800" : "bg-white border border-gray-300"
          }`}
        >
          <h1 className="text-xl font-bold mb-4">Filters</h1>

          <div className="mb-6">
            <h5 className="font-semibold">Filter By Price</h5>
            <span className="block text-gray-400">Max: ${price}</span>
            <input
              type="range"
              min="0"
              max="3000"
              step="100"
              value={price}
              onChange={handlePriceChange}
              className="w-full mt-2"
            />
          </div>

          <div>
            <h5 className="font-semibold">Category</h5>
            <ul className="space-y-2 mt-2">
              {["Electronics", "Home Appliances", "Clothing", "Others"].map(
                (cat, index) => (
                  <li key={index} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      onChange={handleCategoryChange}
                      id={cat.toLowerCase()}
                      className="mr-2"
                    />
                    <label htmlFor={cat.toLowerCase()}>{cat}</label>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Products Display */}
        <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((product, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-lg hover:scale-105 transition-transform ${
                isDark ? "bg-gray-800" : "bg-white border border-gray-300"
              }`}
            >
              <div
                className={`h-40 flex justify-center items-center rounded-lg ${
                  isDark ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <img
                  className="h-32 w-auto"
                  alt={product.name}
                  src={product.img}
                />
              </div>
              <h4 className="text-lg font-semibold mt-2">{product.name}</h4>
              <h6 className="text-gray-400">${product.price}</h6>

              <button
                onClick={() => addToCart(product)}
                className={`w-full mt-4 py-2 rounded-md transition ${
                  isDark
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-blue-500 hover:bg-blue-400"
                }`}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
