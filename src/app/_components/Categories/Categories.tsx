import { CategoryInterface, grtCategories } from '@/api/categories.api'
import Link from 'next/link';
import React from 'react'

export default async function Categories() {
    const data = await grtCategories();

    return (
        <>
            <h2 className='my-5 border-l-4 border-green-500 pl-3 font-bold text-xl italic'>
                Shop By <span className='text-green-500 underline'>Categories</span>
            </h2>
            <div className='grid gap-5 my-5 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2'>
                {data.map(cat => <CatItem key={cat._id} cat={cat} />)}
            </div>
        </>
    )
}

function CatItem({ cat }: { cat: CategoryInterface }) {
    return (
        <Link 
            href={`/categories/${cat._id}`} 
            className='border border-gray-200 p-4 text-center rounded-2xl shadow-sm hover:shadow-lg hover:border-green-300 transition-all duration-300 group'
        >
            <div className="overflow-hidden rounded-full size-24 mx-auto mb-3">
                <img 
                    src={cat.image} 
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' 
                    alt={cat.name} 
                />
            </div>
            <p className='font-semibold text-gray-700 group-hover:text-green-600 transition-colors capitalize text-sm'>
                {cat.name}
            </p>
        </Link>
    )
}