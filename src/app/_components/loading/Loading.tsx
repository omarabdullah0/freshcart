import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function LoadingSpinner() {
  return (
    <div className='flex justify-center'>
        <AiOutlineLoading3Quarters className='text-3xl animate-spin text-black' />
    </div>
  )
}
