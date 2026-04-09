'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import Image from 'next/image'
import { Loader2, Package, Heart, Eye, RefreshCw, Plus } from 'lucide-react'
import ButtonCom from '../_components/ButtonCom'

export default function ShopPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['allProducts'],
    queryFn: async () => {
      const res = await fetch('https://ecommerce.routemisr.com/api/v1/products');
      const result = await res.json();
      return result.data;
    }
  });

  if (isLoading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-green-600" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="container mx-auto px-4 md:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data?.map((product: any) => (
            <div key={product._id} className="group bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
              <div className="relative h-56 w-full mb-4 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
                <img 
                  src={product.imageCover} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                  alt={product.title} 
                />
              </div>
              <div className="flex-grow">
                <span className="text-[12px] text-gray-400 font-medium">{product.category.name}</span>
                <h3 className="text-[15px] font-bold text-gray-800 truncate mb-2">{product.title}</h3>
                
                <div className="flex items-center gap-1 mb-4">
                   <span className="text-yellow-400">★</span>
                   <span className="text-[11px] text-gray-400">{product.ratingsAverage}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <span className="text-lg font-black text-gray-900">{product.price} EGP</span>
                
                {/* استخدام المكون اللي عملناه */}
                <ButtonCom 
                  id={product._id} 
                  cls="w-9 h-9 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 shadow-sm active:scale-95 transition-all"
                >
                  <Plus size={20} />
                </ButtonCom>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}