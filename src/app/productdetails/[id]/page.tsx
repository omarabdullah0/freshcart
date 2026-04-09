"use client";

import { useState, useEffect } from "react";
import { getSingleProduct } from "@/api/singleproduct.api";
import { Button } from "@/components/ui/button";
import { 
  StarIcon, 
  ShoppingCart, 
  Zap, 
  Loader2, 
  Minus, 
  Plus, 
  Heart, 
  Share2, 
  ShieldCheck, 
  RotateCcw, 
  Truck 
} from "lucide-react";
import Image from "next/image";
import ButtonCom from "@/app/_components/ButtonCom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ProductPage({ params }: { params: any }) {
  const [data, setData] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    params.then((res: any) => {
      getSingleProduct(res.id).then((product) => {
        setData(product);
        setMainImage(product.imageCover);
        setIsLoading(false);
      });
    });
  }, [params]);

  const handleQuantity = (type: 'inc' | 'dec') => {
    if (type === 'inc') setQuantity(prev => prev + 1);
    else if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard! 🔗");
    }
  };

  if (isLoading) return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <Loader2 className="w-10 h-10 animate-spin text-[#0aad0a]" />
    </div>
  );

  if (!data) return <h1 className="text-red-500 text-center p-10 font-bold">Product Not Found</h1>;

  const totalPrice = (quantity * (data.priceAfterDiscount || data.price)).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10 bg-white font-sans text-[#1a1c22]">
      <div className="flex flex-col lg:flex-row gap-12">
        
        <div className="lg:w-[45%] w-full">
          <div className="sticky top-24">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-100 bg-[#f8f9fa] group">
              <Image 
                src={mainImage} 
                fill 
                alt={data.title}
                className="object-contain p-8 transition-transform duration-700 "
                priority
              />
            </div>

            <div className='flex gap-3 mt-4 overflow-x-auto pb-2 no-scrollbar'>
              {[data.imageCover, ...data.images].map((img: string, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={cn(
                    "relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all",
                    mainImage === img ? "border-[#0aad0a] shadow-sm scale-95" : "border-transparent bg-gray-50 hover:border-gray-200"
                  )}
                >
                  <Image src={img} fill alt='thumbnail' className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-[55%] w-full flex flex-col">
          
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#eef9ee] text-[#0aad0a] text-[11px] font-extrabold px-3 py-1 rounded-md uppercase">
              {data.category?.name}
            </span>
            <span className="bg-gray-100 text-gray-500 text-[11px] font-extrabold px-3 py-1 rounded-md uppercase">
              {data.brand?.name || "Brand"}
            </span>
          </div>

          <h1 className="text-[32px] md:text-[38px] font-bold leading-tight mb-3 tracking-tight">
            {data.title}
          </h1>

          <div className='flex gap-3 items-center mb-6'>
            <div className="flex items-center bg-yellow-50 px-2 py-0.5 rounded-lg">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} size={14} className={cn(i < Math.floor(data.ratingsAverage) ? "fill-yellow-400 text-yellow-400" : "text-gray-200")} />
              ))}
              <span className="ml-1.5 text-sm font-bold text-yellow-700">{data.ratingsAverage}</span>
            </div>
            <span className="text-sm text-gray-400 font-medium border-l pl-3">
              ({data.ratingsQuantity || 0} reviews)
            </span>
          </div>

          <div className="mb-6">
             <div className="flex items-baseline gap-3">
                <span className='text-[32px] font-black text-[#1a1c22]'>
                  {data.priceAfterDiscount || data.price} <small className="text-sm font-bold uppercase ml-1">EGP</small>
                </span>
                {data.priceAfterDiscount && (
                  <span className='text-gray-400 line-through text-lg font-medium'>{data.price} EGP</span>
                )}
             </div>
             <div className="flex items-center gap-2 mt-1 text-[#0aad0a] font-bold text-sm">
                <div className="w-2 h-2 bg-[#0aad0a] rounded-full animate-pulse" /> In Stock
             </div>
          </div>

          <p className="text-[#666] text-[15px] leading-relaxed mb-8">
            {data.description}
          </p>

          <div className="mb-6 flex items-center gap-6">
            <div className="flex flex-col">
              <p className="text-[12px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Quantity</p>
              <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-white shadow-sm w-fit">
                <button onClick={() => handleQuantity('dec')} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-500 rounded transition-colors">
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-bold text-md">{quantity}</span>
                <button onClick={() => handleQuantity('inc')} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-500 rounded transition-colors">
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="mt-6">
               <p className="text-sm text-gray-400 font-medium">{data.quantity} available</p>
            </div>
          </div>

          <div className="mb-8 flex items-center justify-between p-3 rounded-xl bg-[#f8f9fa] border border-gray-100 shadow-sm">
            <span className="text-gray-500 font-bold text-sm uppercase tracking-wide">Total Price:</span>
            <span className="text-[24px] font-black text-[#0aad0a]">
              {totalPrice} <small className="text-xs">EGP</small>
            </span>
          </div>

          <div className="flex flex-col gap-3 mb-8">
            <div className="flex gap-4">
              <ButtonCom 
                id={data._id} 
                cls="bg-[#0aad0a] hover:bg-[#089108] h-[58px] flex-[1.6] text-[16px] font-bold rounded-xl shadow-lg shadow-green-50 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={19} /> Add to Cart
              </ButtonCom>
              
              <Button className="h-[58px] flex-1 bg-[#1a1c22] hover:bg-black text-white font-bold rounded-xl transition-all active:scale-95 gap-2">
                <Zap size={18} className="fill-yellow-400 text-yellow-400" /> Buy Now
              </Button>
            </div>
            
            <div className="flex gap-2">
               <button className="flex-grow h-12 border border-gray-200 rounded-xl flex items-center justify-center gap-2 font-bold text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all bg-white shadow-sm">
                  <Heart size={18} className="text-gray-400" /> Add to Wishlist
               </button>
               <button onClick={handleShare} className="w-14 h-12 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all bg-white shadow-sm">
                  <Share2 size={18} />
               </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-gray-100">
             <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#0aad0a] group-hover:bg-[#0aad0a] group-hover:text-white transition-colors">
                   <Truck size={18} />
                </div>
                <div>
                   <p className="text-[12px] font-bold">Free Delivery</p>
                   <p className="text-[10px] text-gray-400 font-medium">Orders over 500 EGP</p>
                </div>
             </div>
             <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                   <RotateCcw size={18} />
                </div>
                <div>
                   <p className="text-[12px] font-bold">30 Days Return</p>
                   <p className="text-[10px] text-gray-400 font-medium">No questions asked</p>
                </div>
             </div>
             <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                   <ShieldCheck size={18} />
                </div>
                <div>
                   <p className="text-[12px] font-bold">Secure Payment</p>
                   <p className="text-[10px] text-gray-400 font-medium">100% Protected</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}