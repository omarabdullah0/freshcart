"use client"

import dynamic from "next/dynamic"

const NavigationMenuDemo = dynamic(
  () => import("./Navbar").then((mod) => mod.NavigationMenuDemo),
  { ssr: false }
)

export default function NavbarWrapper() {
  return <NavigationMenuDemo />
}