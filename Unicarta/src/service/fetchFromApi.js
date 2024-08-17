let baseUrl = "https://fakestoreapi.com";

async function fetchFromApi(path) {
  const res = await fetch(`${baseUrl}/${path}`);

  const data = await res.json();
  return data;
}

async function checkout(userData)  {
  try {
    const response = await fetch('http://localhost:8084/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
}

async function validateCoupon(couponCode)  {
  const coupons = [
    { code: '10%Off', percent: 0.10 },
  ];
  const result = coupons.find((coupon) => coupon.code === couponCode)
    || { code: couponCode, percent: 0.0 };
  return result;
}

export { fetchFromApi, checkout,validateCoupon };
