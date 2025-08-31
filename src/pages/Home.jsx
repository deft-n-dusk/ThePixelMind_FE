import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6 pt-10">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
        Welcome to Our Store 🛒
      </h1>

      {/* Home Image */}
      <img
        src="https://img.freepik.com/free-vector/store-grocery-shop-building-isolated-white-background_1284-14054.jpg?semt=ais_hybrid&w=740"
        alt="Shop Illustration"
        className="w-full max-w-sm mb-6 rounded-lg shadow-lg object-cover"
      />

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <Link
          to="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          View Products
        </Link>

        <Link
          to="/categories"
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
        >
          View Categories
        </Link>
      </div>
    </div>
  );
}

export default Home;
