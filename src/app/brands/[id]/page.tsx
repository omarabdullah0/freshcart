'use client'
import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Loader2, Plus } from 'lucide-react'
import { toast } from 'sonner'

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  brand: { name: string };
  ratingsAverage: number;
}

export default function BrandProducts() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['brand-products', id],
    queryFn: async () => {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const result = await res.json();
      return result.data as Product[];
    },
    enabled: !!id
  });
  const addToCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('userToken') || '' 
        },
        body: JSON.stringify({ productId })
      });
      if (!res.ok) throw new Error('Failed to add to cart');
      return res.json();
    },
    onSuccess: () => {
      toast.success("Added to cart! 🛒");
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  if (isLoading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-green-600" />
    </div>
  );

  if (isError || products?.length === 0) return (
    <div className="text-center py-20 text-gray-500">
      <h2 className="text-2xl font-bold">No products found for this brand!</h2>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-10 bg-gray-50/30">
      <h1 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-green-500 pl-4 uppercase">
        {products![0]?.brand.name} Collection
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products?.map((product) => (
          <div key={product._id} className="group bg-white rounded-lg border border-gray-100 p-3 hover:shadow-md transition-all duration-300 relative flex flex-col justify-between">
            <div>
              <div className="relative overflow-hidden h-48 mb-3">
                <img src={product.imageCover} alt={product.title} className="w-full h-full object-contain" />
              </div>
              <p className="text-[11px] text-gray-400 font-medium mb-1 uppercase">{product.brand.name}</p>
              <h3 className="text-sm font-semibold text-gray-700 line-clamp-1 mb-1">{product.title}</h3>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-xs text-gray-600 font-medium">{product.ratingsAverage}</span>
                <span className="text-yellow-400 text-xs">★</span>
              </div>
            </div>

            <div className="flex justify-between items-end mt-auto">
              <div className="text-sm font-bold text-green-600">{product.price} EGP</div>
              <button 
                disabled={addToCartMutation.isPending}
                onClick={() => addToCartMutation.mutate(product._id)}
                className="bg-[#19d34b] hover:bg-green-600 text-white p-1.5 rounded-full shadow-sm transition-all active:scale-90"
              >
                {addToCartMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Plus size={18} strokeWidth={3} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}