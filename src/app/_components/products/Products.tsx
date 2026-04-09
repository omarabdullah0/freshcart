import { getProduct } from '@/api/product.api'
import { log } from 'console'
import React from 'react'
import ProductItem from '../productItem/productItem';

export default async function Products() {
  const data = await getProduct()
  
  return (
    <>
    <h2 className='my-2'>Featured <span className='text-green-500 underline'>Products</span></h2>
    <div className='grid xl:grid-cols-5 gap-5 py-10 md:grid-cols-4 grid-cols-1'>
      {data?.map(prod=><ProductItem prod={prod} key={prod._id} ></ProductItem>)}
    </div>
    </>
  )
}
