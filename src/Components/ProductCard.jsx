import CartButton from "./CartButton";
import { Link } from "react-router-dom";

function ProductCard({ product, onClick }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg flex flex-col justify-between">
      {/* Product Image */}
      <img
        src={product.imageURL}
        alt={product.title}
        className="w-full h-40 object-cover rounded cursor-pointer mb-2"
        onClick={onClick}
      />

      {/* Product Info */}
      <div className="flex flex-col flex-grow">
        <h2 className="font-bold mt-2">{product.title}</h2>
        <p className="text-gray-600 mb-2">Rs.{product.price}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-2">
        <CartButton product={product} />
        <div className="flex space-x-4">
          <Link
            to={`/edit-product/${product._id}`}
            className="text-blue-600 hover:underline text-sm"
          >
            Edit
          </Link>
          <button
            onClick={() => product.onDelete && product.onDelete(product._id)}
            className="text-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
