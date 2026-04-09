'use client'
import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { Loader2, Package, Heart, Eye, RefreshCw, Plus } from 'lucide-react'
import axios from 'axios'
import { toast } from "sonner"

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  category: { name: string };
  ratingsAverage: number;
  ratingsQuantity: number;
}

export default function ShopPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['allProducts'],
    queryFn: async () => {
      const res = await fetch('https://ecommerce.routemisr.com/api/v1/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const result = await res.json();
      return result.data as Product[];
    }
  });
  const { mutate: addToCart, isPending: isAdding } = useMutation({
    mutationFn: async (productId: string) => {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId },
        { headers: { token } }
      );
      return data;
    },
    onSuccess: (res) => {
      toast.success(res.message || "Product added to cart 🛒", {
        position: "top-center",
      });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Please login first!");
    }
  });

  if (isLoading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-green-600" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <div className="bg-gradient-to-r from-[#22c55e] to-[#4ade80] py-12">
        <div className="container mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-white/80 text-sm mb-4 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">All Products</span>
          </nav>
          
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
              <Package className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight">All Products</h1>
              <p className="text-green-50 mt-1 font-medium opacity-90">Explore our complete product collection</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-10 py-10 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-500 font-medium">Showing <span className="text-gray-900">{data?.length}</span> products</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data?.map((product) => (
            <div key={product._id} className="group bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-xl transition-all duration-300 relative">

              <div className="absolute right-6 top-6 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                  <Heart size={16} />
                </button>
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-gray-400 hover:text-green-500 hover:bg-green-50 transition-all">
                  <RefreshCw size={16} />
                </button>
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all">
                  <Eye size={16} />
                </button>
              </div>
              <div className="relative h-56 w-full mb-4 overflow-hidden rounded-xl">
                <img 
                  src={product.imageCover} 
                  alt={product.title}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[12px] text-gray-400 font-medium">{product.category.name}</span>
                <h3 className="text-[15px] font-bold text-gray-800 truncate leading-tight">
                  {product.title.split(' ').slice(0, 2).join(' ')}
                </h3>
                
                <div className="flex items-center gap-1 py-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-[12px] ${i < Math.floor(product.ratingsAverage) ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                  ))}
                  <span className="text-[11px] text-gray-400 ml-1">{product.ratingsAverage}</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-black text-gray-900">{product.price} EGP</span>
                  <button 
                    onClick={() => addToCart(product._id)}
                    disabled={isAdding}
                    className="w-9 h-9 bg-[#198754] text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-all shadow-sm active:scale-90 disabled:bg-gray-400"
                  >
                    {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus size={20} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}