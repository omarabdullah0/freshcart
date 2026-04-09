import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaYoutube, 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
  FaCcVisa, FaCcMastercard, FaCcPaypal
} from 'react-icons/fa';
import logo from '../../../assets/cart.jpg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'All Products', href: '/products' },
      { name: 'Categories', href: '/categories' },
      { name: 'Brands', href: '/brands' },
      { name: 'Electronics', href: '/electronics' },
      { name: 'Men\'s Fashion', href: '/mens-fashion' },
      { name: 'Women\'s Fashion', href: '/womens-fashion' },
    ],
    account: [
      { name: 'My Account', href: '/profile' },
      { name: 'Order History', href: '/orders' },
      { name: 'Wishlist', href: '/wishlist' },
      { name: 'Shopping Cart', href: '/cart' },
      { name: 'Sign In', href: '/login' },
      { name: 'Create Account', href: '/register' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Help Center', href: '/help' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns & Refunds', href: '/returns' },
      { name: 'Track Order', href: '/track' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ]
  };

  return (
    <footer className="bg-[#0b1622] text-gray-400 py-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-white inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-6">
               <Image src={logo} alt="FreshCart" width={30} height={30} />
               <span className="text-xl font-bold text-[#1a2c3d]">FreshCart</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-green-500" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-green-500" />
                <span>support@freshcart.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-green-500" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, idx) => (
                <Link key={idx} href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-600 hover:text-white transition-all">
                  <Icon size={14} />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Shop</h4>
            <ul className="space-y-4 text-sm">
              {footerLinks.shop.map(link => (
                <li key={link.name}><Link href={link.href} className="hover:text-green-500 transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Account</h4>
            <ul className="space-y-4 text-sm">
              {footerLinks.account.map(link => (
                <li key={link.name}><Link href={link.href} className="hover:text-green-500 transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              {footerLinks.support.map(link => (
                <li key={link.name}><Link href={link.href} className="hover:text-green-500 transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">
            © {currentYear} FreshCart. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 opacity-70">
             <div className="flex items-center gap-2 text-sm"><FaCcVisa size={20} /> Visa</div>
             <div className="flex items-center gap-2 text-sm"><FaCcMastercard size={20} /> Mastercard</div>
             <div className="flex items-center gap-2 text-sm"><FaCcPaypal size={20} /> PayPal</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;