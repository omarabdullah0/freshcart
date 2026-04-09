import { getTokenFn } from "@/utilities/getTokentFun";
import { CartRes } from "./interfaces/cart.interface";

export async function getCart(): Promise<CartRes | null> {
  const token = await getTokenFn();

  if (!token) {
    throw new Error("unauthorized!");
  }

  try {
    const data = await fetch(`${process.env.API}cart`, {
      headers: {
        token,
        "Content-type": "application/json",
      },
    });

    const payload = await data.json();
    console.log("cart", payload);
    return payload;
  } catch (error) {
    throw new Error("unauthorized!");
  }
}