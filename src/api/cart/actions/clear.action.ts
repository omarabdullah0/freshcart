"use server";
import { getTokenFn } from "@/utilities/getTokentFun" 

export async function clearCart() {
  const token = await getTokenFn();

  if (!token) {
    throw new Error("unauthorized!");
  }

  try {
    if (token) {
      const data = await fetch(`${process.env.API}cart`, {
        method: "delete",
        headers: {
          token,
          "Content-type": "application/json",
        },
      });

      const payload = await data.json();
      return payload;
    }
  } catch (error) {
    throw new Error("unauthorized!");
  }
}