import Products from "./_components/products/Products";
import MySlider from "./_components/Slider/Slider";
import slider1 from '../assets/slider1.jpg';
import slider2 from '../assets/slider2.jpg';
import slider3 from '../assets/slider3.jpg';
import { Suspense } from 'react';
import dynamic from 'next/dynamic'; 
import { getServerSession } from "next-auth";
import Loading from "./Loading";
import { Truck, ShieldCheck, RefreshCcw, Headset } from "lucide-react";

const Categories = dynamic(() => import('./_components/Categories/Categories'));

export default async function Home() {
  const session = await getServerSession({});
  
  const sliderData = [
    {
      image: slider1.src,
      title: "Elevate Your Style with Our New Collection",
      subtitle: "Exclusive Offer"
    },
    {
      image: slider2.src,
      title: "Experience the Best Technology Trends",
      subtitle: "Tech Savings"
    },
    {
      image: slider3.src,
      title: "Discover Premium Quality Essentials",
      subtitle: "Limited Edition"
    }
  ];

  const features = [
    {
      icon: <Truck className="w-6 h-6 text-blue-600" />,
      title: "Free Shipping",
      desc: "On orders over 500 EGP",
      bgColor: "bg-blue-50"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
      title: "Secure Payment",
      desc: "100% secure transactions",
      bgColor: "bg-green-50"
    },
    {
      icon: <RefreshCcw className="w-6 h-6 text-orange-600" />,
      title: "Easy Returns",
      desc: "14-day return policy",
      bgColor: "bg-orange-50"
    },
    {
      icon: <Headset className="w-6 h-6 text-purple-600" />,
      title: "24/7 Support",
      desc: "Dedicated support team",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">

      <section className="container mx-auto pt-6 px-4">
        <MySlider pageList={sliderData} />
      </section>

      <div className="container mx-auto px-4 space-y-12">
        {session?.user?.name && (
          <div className="pt-8">
             <h1 className="text-xl font-medium text-gray-600">
               Welcome back, <span className="text-green-600 font-bold">{session.user.name.split(' ')[0]}!</span>
             </h1>
          </div>
        )}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                {item.icon}
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-gray-900 text-sm md:text-base leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </section>
        <section>
          <Suspense fallback={<Loading />}>
            <Categories />
          </Suspense>
        </section>
        <section>
          <Products />
        </section>
      </div>
    </main>
  );
}