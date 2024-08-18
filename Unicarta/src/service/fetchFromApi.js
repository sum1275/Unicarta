let baseUrl = "https://fakestoreapi.com";

async function fetchFromApi(path) {
  const res = await fetch(`${baseUrl}/${path}`);

  const data = await res.json();
  return data;
}

async function validateCoupon(couponCode) {
  const coupons = [{ code: "10%Off", percent: 0.1, message: "10% APPLIED" }];
  const result = coupons.find((coupon) => coupon.code === couponCode) || {
    code: couponCode,
    percent: 0.0,
    message: "Coupon not found",
  };
  return result;
}

export { fetchFromApi, validateCoupon };
