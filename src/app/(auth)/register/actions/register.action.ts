"use server";

import { error } from "console";
import { registerSchemaType } from "../schema/register.schema";

export async function registerFn(formData: registerSchemaType) {
  const data = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/signup",
    {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    },
  );

  const payload = await data.json();
  console.log("status:", data.status);
  console.log("payload:", JSON.stringify(payload)); 

  if (!data.ok) throw new Error(data?.statusText);

  return data.ok;
}