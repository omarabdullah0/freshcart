'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Loader2, Tag, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Brand {
  _id: string;
  name: string;
  image: string;
}

export default function Brands() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const res = await fetch('https://ecommerce.routemisr.com/api/v1/brands');
      if (!res.ok) throw new Error('Failed to fetch brands');
      const result = await res.json();
      return result.data as Brand[];
    }
  });

  if (isLoading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-green-600" />
    </div>
  );

  if (isError) return (
    <div className="text-center py-20 text-red-500 font-bold italic">
      Ops! Error loading brands. 
    </div>
  );

  return (
    <div className="min-h-screen bg-white w-full">
      <div className="w-full bg-gradient-to-r from-[#9c4df4] to-[#b76fff] py-10">
        <div className="container max-w-[1400px] mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-white/80 text-sm mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Brands</span>
          </nav>
          
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-lg border border-white/20">
              <Tag className="text-white" size={38} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-5xl font-extrabold text-white tracking-tighter leading-tight">Top Brands</h1>
              <p className="text-purple-100 mt-2 font-medium italic text-lg">Shop from your favorite brands</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-[1400px] mx-auto px-4 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {data?.map((brand) => (
            <Link 
              href={`/brands/${brand._id}`} 
              key={brand._id}
              className="group relative bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-purple-200 transition-all duration-500 text-center flex flex-col items-center justify-start h-[19rem] overflow-hidden"
            >
              <div className="mb-6 overflow-hidden flex items-center justify-center h-40 w-full bg-[#f8f9fa] rounded-2xl p-4">
                <img 
                  src={brand.image} 
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-all duration-700 ease-in-out"
                />
              </div>
              <div className="flex-grow flex flex-col items-center justify-center w-full relative h-16">
                <h3 className="text-base font-bold text-gray-800 group-hover:text-[#9147ff] transition-all duration-300 transform group-hover:-translate-y-4 group-hover:opacity-0">
                  {brand.name}
                </h3>
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-sm font-bold text-[#9147ff]">
                    View Products
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#9147ff]" />
                </div>
              </div>

            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}