import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartProvider";
import "./OrderSummary.css";

function OrderSummary() {
  let { cart, totalPrice, setTotalPrice } =
    useContext(CartContext);

  useEffect(() => {
    let total = cart.reduce((acc, cur) => {
      return acc + cur.qty * cur.price;
    }, 0);
    setTotalPrice(total);
  }, [cart, setTotalPrice]);

  let allSoloProducts = cart.map((product) => {
    return <SoloBill product={product} key={product.id} />;
  });

  return (
    <div className="order-summary_container">
      <h3>Order Summary</h3>
      <div className="order-summary">{allSoloProducts}</div>
      <div className="order-total solo-bill">
        <p>Total</p>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}

function SoloBill({ product }) {
  return (
    <div className="solo-bill">
      <p>
        <b>{product.qty}</b> * <b>{product.title}</b>
      </p>
      <span>${(product.qty * product.price).toFixed(2)}</span>
    </div>
  );
}

export default OrderSummary;
