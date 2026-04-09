"use server";

import { error } from "console";
import { loginSchemaType } from "../schema/login.schema";
import { cookies } from "next/headers";

export async function handelLoginFn(formData: loginSchemaType) {
  const data = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/signin",
    {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    },
  );

  if (!data.ok) throw new Error(data?.statusText);

  const payload = await data.json();
  console.log("status:", data.status);
  console.log("payload:", JSON.stringify(payload)); 
  console.log(payload); 

// cookies
const cookie = await cookies()
cookie.set('token',payload?.token,{
    expires: 60 * 60 * 24 * 7,
    httpOnly:true
});


  return data.ok;
}