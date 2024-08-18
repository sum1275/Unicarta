import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import { CartContext } from "../../context/CartProvider";
import { validateCoupon } from "../../service/fetchFromApi";
import "./UserInfo.css";

function UserInfo() {
  return (
    <div className="user-info_container">
      <ShippingAddress />
    </div>
  );
}

function ShippingAddress() {
  const { emptyCart, cart, setTotalPrice, totalPrice } =
    useContext(CartContext);
  const [couponValue, setCouponValue] = useState("");

  const { register, handleSubmit } = useForm();

  let navigate = useNavigate();

  const checkoutHandler = async (data) => {
    const { ...rest } = data;

    if (cart?.length < 1) {
      toast.error("Your shopping cart is empty.");
      return;
    }

    if (totalPrice <= 0) {
      toast.error("Cannot process an order with a value of zero (0).");
      return;
    }

    try {
      const checkoutData = {
        ...rest,
        coupon: couponValue ?? "",
        cart: cart ?? [],
        totalPrice: totalPrice ?? 0,
      };

      console.log("Checkout Data:", checkoutData);

      emptyCart();
      toast.success("You have successfully checked out.");
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("An error occurred during checkout. Please try again later.");
    } finally {
      navigate("/");
    }
  };

  const handleApplyCoupon = async (event) => {
    event.preventDefault();

    if (couponValue !== "") {
      try {
        const couponResult = await validateCoupon(couponValue);
        if (couponResult && couponResult.percent) {
          const discountedPrice =
            totalPrice - couponResult.percent * totalPrice;
          setTotalPrice(discountedPrice);
          toast.success(couponResult.message);
        } else {
          toast.error(couponResult?.message || "Invalid coupon.");
        }
      } catch (error) {
        console.error("Error validating coupon:", error);
        toast.error("Failed to validate the coupon. Please try again.");
      }
    } else {
      toast.error("Please enter a coupon code.");
    }
  };

  return (
    <div className="shipping-address_container">
      <h3>Shipping Address</h3>
      <form onSubmit={handleSubmit(checkoutHandler)}>
        <div className="shipping-address_wrapper">
          <input
            type="text"
            placeholder="First name"
            id="firstName"
            {...register("firstName", { required: true })}
          />
          <input
            type="text"
            placeholder="Last name"
            id="lastName"
            {...register("lastName", { required: true })}
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            {...register("address", { required: true })}
          />
          <input
            type="text"
            placeholder="City"
            id="city"
            {...register("city", { required: true })}
          />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <div className="coupon">
            <input
              type="text"
              placeholder="APPLY Coupon"
              value={couponValue}
              onChange={(e) => setCouponValue(e.target.value)}
            />
            <button
              onClick={(event) => handleApplyCoupon(event)}
              className="coupon-btn"
            >
              Apply
            </button>
          </div>

          <button className="checkout-btn" type="submit">
            Checkout
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserInfo;
