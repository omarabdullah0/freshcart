import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";


import { Toaster } from "@/components/ui/sonner";
import TansTackProviders from "@/provider/TanStackProvider";
import { NavigationMenuDemo } from "./_components/Navbar/Navbar";
import Footer from "./_components/Footer/Footer";
import FeaturesBanner from "@/components/ui/FeaturesBanner";


const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-exo2",
});

export const metadata: Metadata = {
  title: "FreshCart - Your Favorite Store",
  description: "Best products at the best prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={exo2.variable} suppressHydrationWarning>
      <body
        className={`${exo2.className} antialiased bg-white text-[#2b3445]`}
        suppressHydrationWarning={true}
      >
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