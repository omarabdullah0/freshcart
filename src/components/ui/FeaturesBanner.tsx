import { Truck, ShieldCheck, RefreshCcw, Headset } from "lucide-react";

export default function FeaturesBanner() {
  const features = [
    {
      icon: <Truck className="w-5 h-5 text-[#198754]" />,
      title: "Free Shipping",
      desc: "On orders over 500 EGP",
    },
    {
      icon: <RefreshCcw className="w-5 h-5 text-[#198754]" />,
      title: "Easy Returns",
      desc: "14-day return policy",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#198754]" />,
      title: "Secure Payment",
      desc: "100% secure checkout",
    },
    {
      icon: <Headset className="w-5 h-5 text-[#198754]" />,
      title: "24/7 Support",
      desc: "Contact us anytime",
    },
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
                <h4 className="text-[15px] font-bold text-[#2b3445]">
                  {f.title}
                </h4>
                <p className="text-[12px] text-gray-500 font-medium">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}