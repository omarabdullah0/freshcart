"use client"
import React, { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import { FaHeart, FaSpinner, FaTrashAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function WishlistPage() {
  const queryClient = useQueryClient();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { 
    setIsClient(true);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const token = localStorage.getItem('userToken');
      if (!token) return [];
      const res = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: { token }
      });
      return res.data.data;
    },
    enabled: isClient
  });

  const { mutate: removeItem } = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem('userToken');
      return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { 
        headers: { token } 
      });
    },
    onSuccess: () => {
      toast.success("Removed from wishlist");
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    }
  });

  if (!isClient || isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-green-600" size={40} />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <FaHeart size={50} className="text-gray-200 mb-4" />
        <h1 className="text-xl font-bold">Your wishlist is empty</h1>
        <Link href="/" className="mt-4 text-green-600 underline">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1536px] mx-auto py-20 px-4 md:px-10">
      <h1 className="text-2xl font-bold mb-10 border-b pb-4">My Wishlist ({data.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data.map((item: any) => (
          <div key={item._id} className="border p-4 rounded-2xl relative bg-white shadow-sm flex flex-col group hover:shadow-md transition-shadow">
            <button 
              onClick={() => removeItem(item._id)} 
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-2 transition-colors"
              title="Remove"
            >
              <FaTrashAlt size={18} />
            </button>
            <Link href={`/productdetails/${item._id}`}>
              <div className="relative h-40 mb-4">
                <Image 
                  src={item.imageCover} 
                  fill 
                  alt={item.title} 
                  className="object-contain"
                />
              </div>
            </Link>
            <h3 className="font-bold text-sm mt-3 line-clamp-1 text-[#1a2c3d]">{item.title}</h3>
            <div className="flex items-center justify-between mt-auto pt-4">
              <p className="text-green-600 font-bold">{item.price} EGP</p>
              <button className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}