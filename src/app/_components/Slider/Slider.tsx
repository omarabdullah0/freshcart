// "use client";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import Image from "next/image";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// type MySliderProps = {
//   slidesPerView: number;
//   pageList: string[];
// };

// export default function MySlider({ slidesPerView, pageList }: MySliderProps) {
//   return (
//     <div className="relative w-full overflow-hidden min-h-[200px] rounded-2xl shadow-lg">
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         spaceBetween={0}
//         slidesPerView={slidesPerView}
//         navigation={true}
//         pagination={{
//           clickable: true,
//           renderBullet: (index, className) => {
//             return `<span class="${className} custom-bullet"></span>`;
//           },
//         }}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         loop={true}
//         observer={true}
//         observeParents={true}
//         className="mySwiper w-full h-full"
//       >
//         {pageList && pageList.length > 0 ? (
//           pageList.map((img, index) => (
//             <SwiperSlide key={index}>
//               <div className="relative w-full h-[200px] md:h-[350px]">
//                 <Image
//                   src={img}
//                   alt={`Slide ${index}`}
//                   fill
//                   className="object-cover"
//                   priority={index === 0}
//                 />
//               </div>
//             </SwiperSlide>
//           ))
//         ) : (
//           <div className="h-[200px] bg-gray-200 animate-pulse flex items-center justify-center">
//             Loading...
//           </div>
//         )}
//       </Swiper>

//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
//           .swiper-button-next, .swiper-button-prev {
//             color: #3660e2 !important;
//             z-index: 50 !important;
//           }

//           .custom-bullet {
//             width: 10px;
//             height: 10px;
//             background: white;
//             border-radius: 50%;
//             display: inline-block;
//             margin: 0 5px;
//             opacity: 0.7;
//             cursor: pointer;
//             transition: all 0.3s ease;
//           }

//           .swiper-pagination-bullet-active {
//             background: #0aad0a !important;
//             width: 30px !important;
//             border-radius: 20px !important;
//             opacity: 1 !important;
//           }
//         `,
//         }}
//       />
//     </div>
//   );
// }


// "use client";

// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// export default function MySlider({ pageList, slidesPerView }: any) {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) {
//     return (
//       <div className="mb-10 relative w-full overflow-hidden min-h-[200px] md:min-h-[350px] rounded-2xl bg-gray-100 animate-pulse">
//       </div>
//     );
//   }

//   return (
//     <div className="mb-10 relative w-full overflow-hidden min-h-[200px] rounded-2xl shadow-lg">
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         spaceBetween={0}
//         slidesPerView={slidesPerView}
//         navigation={true}
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3000 }}
//         className="mySwiper w-full h-full"
//       >
//         {pageList.map((slide: any, index: number) => (
//           <SwiperSlide key={index}>
//              <div className="relative w-full h-[200px] md:h-[350px]">
//                 <img 
//                    src={slide.src || slide} 
//                    alt={`Slide ${index}`} 
//                    className="object-cover w-full h-full"
//                 />
//              </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }




"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function MySlider({ pageList }: { pageList: any[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="mb-10 w-full h-[400px] bg-gray-100 animate-pulse rounded-3xl" />;

  return (
    <div className="mb-10 relative w-full group overflow-hidden rounded-3xl shadow-sm">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 4000 }}
        navigation={true}
        pagination={{ clickable: true }}
        className="h-[300px] md:h-[450px] w-full"
      >
        {pageList.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex items-center">
              <img 
                src={slide.image || slide} 
                className="absolute inset-0 w-full h-full object-cover" 
                alt="banner" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
              <div className="relative z-10 px-8 md:px-16 text-white max-w-xl space-y-4">
                <span className="text-green-500 font-bold tracking-widest text-sm uppercase">
                  Big Sale
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                  {slide.title || "Modern E-commerce Collection"}
                </h2>
                <p className="text-gray-200 text-sm md:text-base line-clamp-2">
                  Explore our latest high-quality products with special discounts. 
                  Don't miss the chance!
                </p>
                <Link href="/products" className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all active:scale-95 shadow-lg">
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(4px);
          width: 45px !important;
          height: 45px !important;
          border-radius: 50%;
          opacity: 0;
          transition: 0.3s;
        }
        .group:hover .swiper-button-next, .group:hover .swiper-button-prev {
          opacity: 1;
        }
        .swiper-button-next:after, .swiper-button-prev:after { font-size: 18px !important; font-weight: bold; }
        .swiper-pagination-bullet-active { background: #22c55e !important; }
      `}</style>
    </div>
  );
}