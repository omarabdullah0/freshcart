'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Loader2, Layers } from 'lucide-react'

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export default function Categories() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
      if (!res.ok) throw new Error('Failed to fetch categories');
      const result = await res.json();
      return result.data as Category[];
    }
  });

  if (isLoading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-green-600" />
    </div>
  );

  if (isError) return (
    <div className="text-center py-20 text-red-500 font-bold italic">
      Ops! Something went wrong while fetching categories.
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#22c55e] to-[#4ade80] py-12 mb-0">
        <div className="container mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-white/80 text-sm mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Categories</span>
          </nav>
          
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
              <Layers className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight italic">All Categories</h1>
              <p className="text-green-50 mt-1 font-medium italic opacity-90">Browse our wide range of product categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {data?.map((category) => (
            <Link 
              href={`/categories/${category._id}`} 
              key={category._id}
              className="group block bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
              </div>

              {/* الجزء المعدل: تفاصيل الكارت والـ Hover */}
              <div className="p-6 text-center border-t border-gray-50 bg-white relative">
                <h2 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300 tracking-wide leading-tight">
                  {category.name}
                </h2>
                
                <div className="relative mt-2 h-6 overflow-hidden">
                  <span className="text-[11px] text-green-600 font-black uppercase tracking-[0.2em] 
                    flex items-center justify-center gap-1
                    transform translate-y-10 opacity-0 
                    group-hover:translate-y-0 group-hover:opacity-100 
                    transition-all duration-500 ease-out">
                    Explore Now <span className="text-lg mb-0.5">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}