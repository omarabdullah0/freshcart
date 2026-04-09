"use client"
import { productInterface } from '@/interface/product.interface'
import { StarIcon, Heart, Eye, RefreshCw, Plus, Loader2 } from 'lucide-react'
import Image from "next/image"
import Link from 'next/link'
import React from 'react'
import ButtonCom from '../ButtonCom'
import { cn } from '@/lib/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

interface ProductItemProps {
  prod: productInterface
}

export default function ProductItem({ prod }: ProductItemProps) {
  const queryClient = useQueryClient();
  const { data: wishlistData } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const token = localStorage.getItem('userToken');
      const res = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: { token }
      });
      return res.data.data;
    }
  });

  const isFav = wishlistData?.some((item: any) => item._id === prod._id);

  const { mutate: addToWishlist, isPending } = useMutation({
    mutationFn: async (productId: string) => {
      const token = localStorage.getItem('userToken');
      
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        { productId },
        {
          headers: {
            token: token
          }
        }
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Product added to wishlist!');
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: (error: any) => {
      const errorMsg = error.response?.data?.message || 'Failed to add to wishlist';
      toast.error(errorMsg);
      if (error.response?.status === 401) {
        toast.error('Please login first');
      }
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <StarIcon
        key={index}
        className={cn(
          "w-3.5 h-3.5 transition-colors",
          index < Math.floor(rating) 
            ? "text-yellow-400 fill-yellow-400" 
            : "text-gray-300" 
        )}
      />
    ));
  };

  return (
    <div className='group p-4 rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 bg-white relative flex flex-col h-full'>
      
      <div className='relative overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center h-48 mb-4'>
        <Link href={`/productdetails/${prod._id}`} className="w-full h-full flex items-center justify-center">
          <Image 
            width={200} 
            height={200} 
            src={prod.imageCover} 
            className='w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 p-4' 
            alt={prod.title} 
          />
        </Link>
        <div className='absolute right-2 top-2 flex flex-col gap-2 z-10'>
          
          <button 
            disabled={isPending}
            onClick={() => addToWishlist(prod._id)}
            className={cn(
              'w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm border border-gray-100 rounded-full transition-all active:scale-90',
              isFav ? "text-red-500 shadow-sm" : "text-gray-600 hover:text-red-500",
              isPending && "opacity-50 cursor-not-allowed"
            )} 
            title="Add to Wishlist"
          >
            {isPending ? (
              <Loader2 size={15} className="animate-spin text-green-600" />
            ) : (
              <Heart size={15} className={cn(isFav && "fill-current")} />
            )}
          </button>

          <button className='w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm border border-gray-100 rounded-full text-gray-600 hover:bg-white hover:text-blue-500 hover:shadow-md transition-all' title="Compare">
            <RefreshCw size={15} />
          </button>
          <button className='w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm border border-gray-100 rounded-full text-gray-600 hover:bg-white hover:text-green-600 hover:shadow-md transition-all' title="Quick View">
            <Eye size={15} />
          </button>
        </div>
      </div>

      <div className='flex flex-col flex-grow'>
        <h5 className='text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1'>
          {prod.category?.name}
        </h5>
        
        <Link href={`/productdetails/${prod._id}`}>
          <p className='font-semibold text-gray-800 text-sm line-clamp-1 hover:text-green-600 transition-colors mb-2'>
            {prod.title}
          </p>
        </Link>

        <div className='flex items-center gap-1 mb-3'>
          <div className='flex items-center'>
            {renderStars(prod.ratingsAverage)}
          </div>
          <span className='text-[11px] font-bold text-gray-400 ml-1'>
            {prod.ratingsAverage} ({prod.ratingsQuantity || 0})
          </span>
        </div>

        <div className='mt-auto flex justify-between items-center pt-2 border-t border-gray-50'>
          <div className='flex flex-col'>
            {prod.priceAfterDiscount ? (
              <div className='space-y-0'>
                <p className='text-green-600 font-extrabold text-base leading-tight'>{prod.priceAfterDiscount} EGP</p>
                <p className='text-gray-400 text-[10px] line-through font-medium'>{prod.price} EGP</p>
              </div>
            ) : (
              <p className='text-gray-900 font-extrabold text-base'>{prod.price} EGP</p>
            )}
          </div>

          <ButtonCom 
            id={prod._id} 
            cls='w-9 h-9 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 shadow-sm active:scale-95 transition-all duration-200'
          >
            <Plus size={18} />
          </ButtonCom>
        </div>
      </div>
    </div>
  )
}