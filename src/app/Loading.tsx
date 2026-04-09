import React from 'react'
import LoadingSpinner from './_components/loading/Loading'
export default function Loading() {
  return (
    <div className='min-h-screen flex justify-center items-center bg-border-color '>
        <LoadingSpinner></LoadingSpinner>
    </div>
  )
}
