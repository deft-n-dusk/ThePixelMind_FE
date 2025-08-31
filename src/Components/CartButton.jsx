import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import api from "../utils/axiosInstance";

function CartButton({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const inCart = cartItems.some((item) => item._id === product._id);

  const handleAdd = async () => {
    try {
      await api.post("/cart/add", { productId: product._id, quantity: 1 });
      dispatch(addToCart({ 
        _id: product._id, 
        title: product.title, 
        price: product.price, 
        quantity: 1 
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async () => {
    try {
      await api.delete(`/cart/remove/${product._id}`);
      dispatch(removeFromCart(product._id));
    } catch (err) {
      console.error(err);
    }
  };

  return inCart ? (
    <button
      className="bg-red-200 text-red-800 text-sm px-2 py-1 rounded hover:bg-red-300 transition-colors"
      onClick={(e) => {
        e.stopPropagation();
        handleRemove();
      }}
    >
      Remove
    </button>
  ) : (
    <button
      className="bg-blue-200 text-blue-800 text-sm px-2 py-1 rounded hover:bg-blue-300 transition-colors"
      onClick={(e) => {
        e.stopPropagation();
        handleAdd();
      }}
    >
      Add to Cart
    </button>
  );
}

export default CartButton;
