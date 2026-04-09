'use server'

import { getTokenFn } from "@/utilities/getTokentFun" 

export async function updateCart({productId, count}:{productId:string, count:number}) {

  const token = await getTokenFn()

  if (!token) {
    throw new Error('unauthorized')
  }

  const data = await fetch(`${process.env.API}cart/${productId}`, {
    method: 'put',
    body: JSON.stringify({ count }),
    headers: {
      'content-type': 'application/json',
      'token': token 
    }
  })

  const payload = await data.json()
  console.log("payload", payload)

  if (!data.ok) throw new Error(payload?.message || "Error adding to cart")

  return payload
}