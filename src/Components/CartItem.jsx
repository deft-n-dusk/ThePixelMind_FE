function CartItem({ item, onRemove }) {
  return (
    <div className="flex items-center justify-between border-b py-2">
      <div>
        <h4 className="font-semibold">{item.title}</h4>
        <p className="text-sm text-gray-600">
          ₹{item.price} x {item.quantity}
        </p>
      </div>
      <button
        className="bg-red-500 text-white px-2 py-1 rounded"
        onClick={() => onRemove(item._id)}
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;
