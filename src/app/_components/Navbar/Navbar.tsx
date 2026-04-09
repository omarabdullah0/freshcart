"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import logo from '../../../assets/cart.jpg' 
import { FaHeart, FaShoppingCart, FaSearch, FaBars, FaRegUser } from "react-icons/fa"
import { ChevronDown, Headset } from "lucide-react" 
import { signOut, useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"

export function NavigationMenuDemo() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [mounted, setMounted] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  
  // حالة لتخزين نص البحث
  const [searchQuery, setSearchQuery] = React.useState("")

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // دالة التعامل مع البحث عند الضغط على Enter أو زر البحث
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // التوجه لصفحة البحث مع تمرير الكلمة في الرابط
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`)
    }
  }

  const { data: cartData } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await fetch(`/api/cart`);
      return res.ok ? res.json() : null;
    },
    enabled: status === 'authenticated' 
  })

  const categories = [
    { title: "All Categories", href: "/categories" },
    { title: "Electronics", href: "/categories/electronics" },
    { title: "Women's Fashion", href: "/categories/womens-fashion" },
    { title: "Men's Fashion", href: "/categories/mens-fashion" },
    { title: "Beauty & Health", href: "/categories/beauty-health" },
  ]

  if (!mounted) return <div className="h-20" />;

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="w-full h-20 flex items-center justify-between px-4 md:px-10 max-w-[1536px] mx-auto">
        
        {/* 1. Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-2 mr-4">
          <Image src={logo} alt="Logo" width={32} height={32} priority className="object-contain" />
          <span className="text-[24px] font-bold text-[#1a2c3d] tracking-tight">FreshCart</span>
        </Link>

        {/* 2. Search Bar (Updated to work with API/Redirect) */}
        <div className="hidden lg:flex flex-1 max-w-[500px] mx-6">
          <form onSubmit={handleSearch} className="relative w-full">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands and more..." 
              className="w-full h-12 pl-6 pr-14 rounded-full border border-gray-200 bg-[#f8f9fa] focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all text-[15px] text-gray-600" 
            />
            <button 
              type="submit"
              className="absolute right-1 top-1 h-10 w-10 flex items-center justify-center rounded-full bg-[#198754] text-white hover:bg-green-700 transition-colors"
            >
              <FaSearch size={14} />
            </button>
          </form>
        </div>

        {/* 3. Navigation Links */}
        <div className="flex items-center gap-6">
          <nav className="hidden xl:flex items-center gap-7">
            <Link href="/" className="text-[15px] font-semibold text-[#2b3445] hover:text-green-600 transition-colors">Home</Link>
            <Link href="/shop" className="text-[15px] font-semibold text-[#2b3445] hover:text-green-600 transition-colors">Shop</Link>

            {/* Categories Dropdown */}
            <NavigationMenu.Root 
              delayDuration={0}
              value={isOpen ? "categories-item" : ""} 
              onValueChange={(val) => setIsOpen(!!val)}
            >
              <NavigationMenu.List>
                <NavigationMenu.Item value="categories-item">
                  <NavigationMenu.Trigger 
                    className="group flex items-center gap-1 text-[15px] font-semibold data-[state=open]:text-green-600 text-[#2b3445] hover:text-green-600 outline-none transition-colors cursor-pointer"
                  >
                    Categories
                    <ChevronDown className="w-4 h-4 text-gray-400 group-data-[state=open]:rotate-180 transition-transform" />
                  </NavigationMenu.Trigger>

                  <NavigationMenu.Content className="absolute top-full left-0 mt-3 w-[240px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-3 animate-in fade-in zoom-in duration-200">
                    <ul className="flex flex-col gap-1">
                      {categories.map((cat) => (
                        <li key={cat.title}>
                          <NavigationMenu.Link asChild>
                            <Link 
                              href={cat.href} 
                              onClick={() => setIsOpen(false)} 
                              className="block px-4 py-3 text-[16px] text-[#4b566b] font-medium rounded-xl hover:bg-green-50 hover:text-green-700 transition-all duration-200"
                            >
                              {cat.title}
                            </Link>
                          </NavigationMenu.Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Root>

            <Link href="/brands" className="text-[15px] font-semibold text-[#2b3445] hover:text-green-600 transition-colors">Brands</Link>
          </nav>

          {/* 4. Support Section (Clickable to /contact, No Hover effects) */}
          <Link 
            href="/contact" 
            className="hidden lg:flex items-center gap-3 border-l border-gray-200 pl-6 mr-2 cursor-pointer"
          >
              <div className="w-10 h-10 rounded-full bg-[#f0fdf4] flex items-center justify-center transition-all duration-300">
                <Headset className="w-5 h-5 text-[#198754]" />
              </div>

              <div className="flex flex-col">
                <span className="text-[12px] text-gray-400 leading-none mb-1 font-medium">
                  Support
                </span>
                <span className="text-[14px] font-bold text-[#2b3445] leading-none">
                  24/7 Help
                </span>
              </div>
          </Link>

          {/* 5. Icons & Actions */}
          <div className="flex items-center gap-3">
            <Link href='/wishlist' className="p-2 text-[#2b3445] hover:text-red-500 transition-colors">
              <FaHeart size={20} />
            </Link>
            <Link href='/cart' className="p-2 text-[#2b3445] hover:text-green-600 relative transition-colors">
              <FaShoppingCart size={22} />
              <span className="absolute top-0 right-0 bg-[#198754] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartData?.numOfCartItems || 0}
              </span>
            </Link>

            <div className="ml-2">
              {status === 'authenticated' ? (
                <button 
                  onClick={() => signOut()} 
                  className="px-6 py-2.5 text-sm font-bold text-red-600 border border-red-100 bg-red-50 rounded-full hover:bg-red-100 transition-all"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  href="/login" 
                  className="bg-[#198754] text-white px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-green-700 transition-all shadow-sm"
                >
                  <FaRegUser size={14} />
                  <span className="text-sm font-bold">Sign In</span>
                </Link>
              )}
            </div>
          </div>

          <button className="xl:hidden p-2 text-gray-600">
            <FaBars size={24} />
          </button>
        </div>
      </div>
    </header>
  )
}