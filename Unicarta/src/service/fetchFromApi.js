let baseUrl = "https://fakestoreapi.com";

async function fetchFromApi(path) {
  const res = await fetch(`${baseUrl}/${path}`);

  const data = await res.json();
  console.log('data---')
  console.log(data);
  return data;
}
async function  checkout(userData)  {
  try {
    const response = await fetch('http://localhost:8084/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log('Checkout Response:', data);
    return data;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};

async function  validateCoupon(couponCode)  {
  try {
    const response = await fetch('http://localhost:8084/validateCoupon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ couponCode }),
    });

    const data = await response.json();
    console.log('validateCoupon Response:', data);
    return data;
  } catch (error) {
    console.error('Error during validateCoupon:', error);
    throw error;
  }
};
export { fetchFromApi, checkout,validateCoupon };

