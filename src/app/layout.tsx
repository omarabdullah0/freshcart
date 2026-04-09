import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Toaster } from "@/components/ui/sonner";
import TansTackProviders from "@/provider/TanStackProvider";
import { NavigationMenuDemo } from "./_components/Navbar/Navbar";
import Footer from "./_components/Footer/Footer";
import { Truck, ShieldCheck, RefreshCcw, Headset } from "lucide-react";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ['normal', 'italic'],
  variable: "--font-exo2",
});

export const metadata: Metadata = {
  title: "FreshCart - Your Favorite Store",
  description: "Best products at the best prices",
};

const FeaturesBanner = () => {
  const features = [
    { icon: <Truck className="w-5 h-5 text-[#198754]" />, title: "Free Shipping", desc: "On orders over 500 EGP" },
    { icon: <RefreshCcw className="w-5 h-5 text-[#198754]" />, title: "Easy Returns", desc: "14-day return policy" },
    { icon: <ShieldCheck className="w-5 h-5 text-[#198754]" />, title: "Secure Payment", desc: "100% secure checkout" },
    { icon: <Headset className="w-5 h-5 text-[#198754]" />, title: "24/7 Support", desc: "Contact us anytime" },
  ];

  return (
    <div className="w-full bg-[#f0fdf4] border-t border-b border-green-50 py-8 font-sans">
      <div className="container max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-green-100">
                {f.icon}
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-[#2b3445]">{f.title}</h4>
                <p className="text-[12px] text-gray-500 font-medium">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={exo2.variable} suppressHydrationWarning>
      <body className={`${exo2.className} antialiased bg-white text-[#2b3445]`} suppressHydrationWarning={true}>
        <TansTackProviders>
          <div className="flex flex-col min-h-screen w-full">
            <NavigationMenuDemo />
            <main className="flex-grow w-full pt-20">
              {children}
            </main>
            <FeaturesBanner />
            <Footer />
          </div>
          <Toaster />
        </TansTackProviders>
      </body>
    </html>
  );
}