'use client'

import { onlinePayemnt } from '@/api/payment/checkout.api';
import { Button } from '@/components/ui/button'
import React from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  city: string;
  details: string;
  phone: string;
}

interface ApiResponse {
  status: string;
  session?: {
    url: string;
  };
}

export default function CheckOut({ cartId }: { cartId: string }) {

  const { register, handleSubmit } = useForm<FormData>()

  async function handleCheckOut(data: FormData) {
    // ✅ أهم تعديل هنا: تأكيد type
    const res = await onlinePayemnt(cartId, data) as ApiResponse

    console.log(res)

    if (res?.status === "success" && res.session?.url) {
      window.location.href = res.session.url
    }
  }

  return (
    <div>
      <form 
        className='w-1/2 mx-auto my-7' 
        onSubmit={handleSubmit(handleCheckOut)}
      >
        <input 
          {...register('details')} 
          className="w-full my-2 border border-gray-500 p-3 rounded-2xl" 
          placeholder='details'
        />

        <input 
          {...register('phone')} 
          className="w-full my-2 border border-gray-500 p-3 rounded-2xl" 
          placeholder='phone' 
          type='tel'
        />

        <input 
          {...register('city')} 
          className="w-full my-2 border border-gray-500 p-3 rounded-2xl" 
          placeholder='city' 
        />

        <Button className="w-full mt-4">Send</Button>
      </form>
    </div>
  )
}