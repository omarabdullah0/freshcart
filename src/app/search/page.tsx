"use client"

import { useState, Suspense } from "react" // أضفنا Suspense
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { FaSearch, FaThLarge, FaList, FaStar } from "react-icons/fa"
import { RiRefreshLine } from "react-icons/ri"
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai"
import Image from "next/image"
import ButtonCom from "../_components/ButtonCom"

// 1. المكون الفعلي الذي يحتوي على كل المنطق
function SearchContent() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "")
  const [selectedCats, setSelectedCats] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ['products', searchTerm, selectedCats, selectedBrands, minPrice, maxPrice],
    queryFn: async () => {
      let url = `https://ecommerce.routemisr.com/api/v1/products?`
      if (searchTerm) url += `keyword=${searchTerm}&`
      if (minPrice) url += `price[gte]=${minPrice}&`
      if (maxPrice) url += `price[lte]=${maxPrice}&`
      
      const res = await fetch(url);
      const json = await res.json();
      
      let filteredData = json.data;

      if (selectedCats.length > 0) {
        filteredData = filteredData.filter((p: any) => selectedCats.includes(p.category.name));
      }
      if (selectedBrands.length > 0) {
        filteredData = filteredData.filter((p: any) => selectedBrands.includes(p.brand?.name));
      }

      return filteredData;
    }
  })

  const toggleFilter = (item: string, state: string[], setState: Function) => {
    setState(state.includes(item) ? state.filter(i => i !== item) : [...state, item])
  }

  const categories = ["Music", "Men's Fashion", "Women's Fashion", "SuperMarket", "Baby & Toys", "Home", "Books", "Beauty & Health"];
  const brands = ["Canon", "Dell", "Lenovo", "SONY", "Infinix", "Realme", "HONOR", "Nokia", "Samsung", "Apple"];

  return (
    <div className="max-w-[1536px] mx-auto px-4 md:px-10 py-6 mt-16 bg-[#fcfcfc]">
      <nav className="flex text-sm text-gray-400 mb-6 gap-2">
        <span>Home</span> / <span className="text-gray-600 font-medium">Search Results</span>
      </nav>

      <div className="relative max-w-2xl mb-12">
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-14 pl-12 pr-4 rounded-2xl border border-gray-100 bg-white outline-none focus:border-green-500 transition-all shadow-sm text-gray-600"
          placeholder="Search for products..."
        />
        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-12 lg:col-span-3 space-y-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            
            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-bold text-[#1a2c3d] mb-5">Categories</h3>
              <div className="space-y-4 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                {categories.map((item) => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedCats.includes(item)}
                      onChange={() => toggleFilter(item, selectedCats, setSelectedCats)}
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-0" 
                    />
                    <span className={`text-sm transition-colors ${selectedCats.includes(item) ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-8 pt-6 border-t border-gray-50">
              <h3 className="font-bold text-[#1a2c3d] mb-5">Price Range</h3>
              <div className="flex gap-3 mb-6">
                <div className="flex flex-col gap-1 w-1/2">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Min</span>
                  <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="0" className="w-full p-2 bg-[#f8f9fa] border border-gray-100 rounded-xl text-sm outline-none" />
                </div>
                <div className="flex flex-col gap-1 w-1/2">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Max</span>
                  <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="No limit" className="w-full p-2 bg-[#f8f9fa] border border-gray-100 rounded-xl text-sm outline-none" />
                </div>
              </div>
            </div>

            {/* Brands */}
            <div className="mb-8 pt-6 border-t border-gray-50">
              <h3 className="font-bold text-[#1a2c3d] mb-5">Brands</h3>
              <div className="space-y-4 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)}
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-0" 
                    />
                    <span className={`text-sm transition-colors ${selectedBrands.includes(brand) ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button 
              onClick={() => {setSearchTerm(""); setSelectedCats([]); setSelectedBrands([]); setMinPrice(""); setMaxPrice("");}}
              className="w-full py-3 border border-gray-100 text-gray-500 rounded-xl text-sm font-bold hover:bg-gray-50"
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        <main className="col-span-12 lg:col-span-9">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <button className="p-2.5 bg-green-600 text-white rounded-lg shadow-md"><FaThLarge size={18} /></button>
              <button className="p-2.5 bg-white text-gray-400 border border-gray-100 rounded-lg"><FaList size={18} /></button>
            </div>
            <div className="text-sm text-gray-400 font-medium">Found {data?.length || 0} Products</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {isLoading ? (
               [...Array(8)].map((_, i) => <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-2xl"></div>)
            ) : data?.map((product: any) => (
              <div key={product._id} className="bg-white border border-gray-50 rounded-2xl p-4 relative group hover:shadow-xl transition-all duration-500 flex flex-col h-full">
                <div className="relative aspect-square mb-4 bg-[#f8f9fa] rounded-xl overflow-hidden flex items-center justify-center">
                  <Image src={product.imageCover} alt={product.title} width={200} height={200} className="object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute right-3 top-3 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                    <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-red-500"><AiOutlineHeart size={18} /></button>
                    <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-green-500"><RiRefreshLine size={16} /></button>
                    <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-blue-500"><AiOutlineEye size={18} /></button>
                  </div>
                </div>
                <div className="flex-grow">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{product.category.name}</span>
                  <h3 className="text-sm font-bold text-[#1a2c3d] mt-1 mb-2 line-clamp-1">{product.title}</h3>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={`text-[12px] ${i < Math.floor(product.ratingsAverage) ? 'text-yellow-400' : 'text-gray-200'}`} />
                    ))}
                    <span className="text-[11px] text-gray-400 font-bold ml-1">{product.ratingsAverage}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-extrabold text-[#1a2c3d]">{product.price} EGP</span>
                  <ButtonCom 
                    id={product._id} 
                    cls="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-all font-bold text-xl active:scale-95"
                  >
                    +
                  </ButtonCom>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #adb5bd; border-radius: 10px; }
      `}</style>
    </div>
  )
}
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mt-32 text-center text-green-600 font-bold">Loading Search...</div>}>
      <SearchContent />
    </Suspense>
  )
}