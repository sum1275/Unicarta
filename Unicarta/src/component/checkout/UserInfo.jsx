import React, { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import "./UserInfo.css";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { checkout, validateCoupon } from "../../service/fetchFromApi";

function UserInfo() {
  return (
    <div className="user-info_container">
      <ShippingAddress />
    </div>
  );
}

function ShippingAddress() {
  const { emptyCart, cart,setPriceT, priceT } =
    useContext(CartContext);
  const [couponValue, setCouponValue] = useState("");
  // const [couponValid, setCouponValid] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    address: "",
    city: "",
    email: "",
    coupan: couponValue,
    cartdata: cart,
    totalPrice:priceT
  });

  let navigate = useNavigate();

  async function checkoutHandler() {
    if (cart.length < 1) {
      toast.error("Your shopping list is Emtpy");
      return;
    }

    if (priceT < 1) {
      toast.error("Cannot process order value of zero(0).");
      return;
    }

    // code test
    try {
      // Call the checkout function with userData
      const userData = formData;
      const data = await checkout(userData);

      // Handle the response as needed
      console.log("Checkout Response:", data);

      emptyCart();
      toast.success("Checked out");
      navigate("/");
    } catch (error) {
      console.error("Error during checkout:", error);
      // Handle error, show error message, etc.
    }
    // code test

    navigate("/");
  }

  const handleUserInput = (event) => {
    const { name, value } = event.target;
    if (name === "coupan") {
      setCouponValue(value); // Update couponValue state
      setFormData((prev) => ({ ...prev, coupan: value })); // Update coupan in formData state
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  

  console.log({ formData });
  async function handleApplyCoupan() {
    if (couponValue !== "") {
      try {
        // Assuming validateCoupon is the function that validates the coupon
        let couponResult = await validateCoupon(couponValue);
     
        if (couponResult.valid) {
          let discountedPrice = priceT - 0.1 * priceT;
          setPriceT(discountedPrice);
         toast.success(couponResult.message)
        }else{
          toast.error(couponResult.message)
        }
        
      } catch (error) {
        console.error("Error validating coupon:", error);
        // Handle error, show error message, etc.
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
        <div className="coupan">
          <input
            type="text"
            placeholder="APPLY Coupon"
            name="coupan"
            value={couponValue} // Control the input with React state
            onChange={handleUserInput}
          />
          <button onClick={handleApplyCoupan} className="coupan-btn">
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
