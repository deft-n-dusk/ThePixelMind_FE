import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/cartSlice";
import api from "../utils/axiosInstance";
import CartButton from "../Components/CartButton";

function CartPage() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Fetch cart from backend on load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart");
        const cartItems = res.data.cart.items.map((i) => ({
          _id: i.product._id,
          title: i.product.title,
          price: i.product.price,
          quantity: i.quantity,
          imageURL: i.product.imageURL, // include image
        }));
        dispatch(setCart(cartItems));
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, [dispatch]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item._id} className="border rounded shadow p-3 flex flex-col justify-between">
              <img
                src={item.imageURL}
                alt={item.title}
                className="h-40 w-full object-cover rounded mb-2"
              />
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-gray-600">Rs.{item.price}</p>
              <p className="text-gray-700">Quantity: {item.quantity}</p>
              <div className="mt-2">
                <CartButton product={item} />
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="mt-6 font-bold text-xl">Total: ₹{total}</h2>
    </div>
  );
}

export default CartPage;
