import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { CartContext } from "../../context/CartProvider";
import { checkout, validateCoupon } from "../../service/fetchFromApi";
import "./UserInfo.css";

function UserInfo() {
  return (
    <div className="user-info_container">
      <ShippingAddress />
    </div>
  );
}

function ShippingAddress() {
  const { emptyCart, cart,setTotalPrice, totalPrice } =
    useContext(CartContext);
  const [couponValue, setCouponValue] = useState("");

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    address: "",
    city: "",
    email: "",
    coupon: couponValue,
    cartdata: cart,
    totalPrice:totalPrice
  });

  let navigate = useNavigate();

  async function checkoutHandler() {
    if (cart.length < 1) {
      toast.error("Your shopping list is Emtpy");
      return;
    }

    if (totalPrice < 1) {
      toast.error("Cannot process order value of zero(0).");
      return;
    }

    try {
      const userData = formData;
      const data = await checkout(userData);

      console.log("Checkout Response:", data);

      emptyCart();
      toast.success("Checked out");
      navigate("/");
    } catch (error) {
      console.error("Error during checkout:", error);
    }

    navigate("/");
  }

  const handleUserInput = (event) => {
    const { name, value } = event.target;
    if (name === "coupon") {
      setCouponValue(value);
      setFormData((prev) => ({ ...prev, coupon: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  console.log({ formData });
  async function handleApplyCoupan() {
    if (couponValue !== "") {
      try {
        let couponResult = await validateCoupon(couponValue);
     
        if (couponResult.valid) {
          let discountedPrice = totalPrice - 0.1 * totalPrice;
          setTotalPrice(discountedPrice);
         toast.success(couponResult.message)
        }else{
          toast.error(couponResult.message)
        }
        
      } catch (error) {
        console.error("Error validating coupon:", error);
      }
    } else {
      console.log("No coupon code entered");
    }
  }

  return (
    <div className="shipping-address_container">
      <h3>Shipping Address</h3>
      <div className="shipping-address_wrapper">
        <input
          type="name"
          placeholder="First name"
          id="firstname"
          name="fname"
          onChange={handleUserInput}
        />
        <input
          type="name"
          placeholder="Last name"
          id="lastname"
          name="lname"
          onChange={handleUserInput}
        />
        <input
          type="name"
          placeholder="Address"
          id="address"
          name="address"
          onChange={handleUserInput}
        />
        <input
          type="name"
          placeholder="City"
          id="city"
          name="city"
          onChange={handleUserInput}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleUserInput}
        />
        <div className="coupon">
          <input
            type="text"
            placeholder="APPLY Coupon"
            name="coupon"
            value={couponValue}
            onChange={handleUserInput}
          />
          <button onClick={handleApplyCoupan} className="coupon-btn">
            Apply
          </button>
        </div>

        <button className="checkout-btn" onClick={checkoutHandler}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
