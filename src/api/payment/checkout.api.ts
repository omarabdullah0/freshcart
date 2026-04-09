'use server'
import { getTokenFn } from "@/utilities/getTokentFun"

interface shippingAddressInterface {
  details: string;
  phone: string;
  city: string;
}

export async function onlinePayemnt(cartId: string, shippingAddress: shippingAddressInterface): Promise<string> {

  const token = await getTokenFn();

  if (!token) {
    throw new Error('unauthorized');
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
    },
    body: JSON.stringify({ shippingAddress }),
  });

  const res = await response.json();

  if (!response.ok) {
    console.log("API Error Response:", res);
    throw new Error(res.message || 'Payment failed');
  }

  return res;
}