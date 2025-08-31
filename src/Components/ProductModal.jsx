function ProductModal({ product, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 text-lg font-bold"
        >
          ✕
        </button>

        {/* Product Image */}
        <img
          src={product.imageURL}
          alt={product.title}
          className="h-72 w-full object-cover rounded mb-4"
        />

        {/* Product Info */}
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-sm text-gray-500 mb-2">
          Category: {product.categoryName || "Unknown"}
        </p>
        <p className="text-xl font-semibold mt-2">Rs.{product.price}</p>
      </div>
    </div>
  );
}

export default ProductModal;
