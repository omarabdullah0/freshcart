"use client"

import * as React from "react"
import Link from "next/link"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { ChevronDown } from "lucide-react"

const categories = [
  { title: "All Categories", href: "/categories" },
  { title: "Electronics", href: "/categories/electronics" },
  { title: "Women's Fashion", href: "/categories/womens-fashion" },
  { title: "Men's Fashion", href: "/categories/mens-fashion" },
  { title: "Beauty & Health", href: "/categories/beauty-health" },
]

export function CategoriesDropdown() {
  return (
    <NavigationMenu.Root delayDuration={0}>
      <NavigationMenu.List className="flex list-none">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="group flex items-center gap-1 text-sm font-bold text-gray-600 hover:text-green-600 transition-colors outline-none select-none">
            Categories
            <ChevronDown 
              className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180 text-green-600" 
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="absolute top-0 left-0 w-full md:w-[220px] bg-white rounded-xl shadow-xl border border-gray-100 p-2 animate-in fade-in zoom-in duration-200 z-[110]">
            <ul className="flex flex-col gap-1">
              {categories.map((cat) => (
                <li key={cat.title}>
                  <NavigationMenu.Link asChild>
                    <Link
                      href={cat.href}
                      className="block px-4 py-2.5 text-[15px] text-slate-700 font-medium rounded-lg hover:bg-green-50 hover:text-green-700 transition-all"
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

      <div className="absolute left-0 top-full flex justify-center w-full perspective-[2000px]">
        <NavigationMenu.Viewport className="relative mt-2 overflow-hidden bg-white rounded-md shadow-lg" />
      </div>
    </NavigationMenu.Root>
  )
}