'use client'
import React from 'react'
import Link from 'next/link'
import { Headset, Phone, Mail, MapPin, Clock, Send, HelpCircle, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    desc: "Mon-Fri from 8am to 6pm",
    action: "+1 (800) 123-4567",
    isLink: true,
    linkPrefix: "tel:",
  },
  {
    icon: Mail,
    title: "Email",
    desc: "We'll respond within 24 hours",
    action: "support@freshcart.com",
    isLink: true,
    linkPrefix: "mailto:",
  },
  {
    icon: MapPin,
    title: "Office",
    desc: "123 Commerce Street\nNew York, NY 10001\nUnited States",
    action: "",
    isLink: false,
  },
  {
    icon: Clock,
    title: "Business Hours",
    desc: "Monday - Friday: 8am - 6pm\nSaturday: 9am - 4pm\nSunday: Closed",
    action: "",
    isLink: false,
  },
];

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Linkedin, href: "#" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans">
      
      <div className="bg-gradient-to-r from-[#22c55e] to-[#4ade80] py-14">
        <div className="container mx-auto px-4 md:px-10 max-w-[1400px]">

          <nav className="flex items-center gap-2 text-white/80 text-sm mb-6 font-medium italic">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact Us</span>
          </nav>
          
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-lg border border-white/30">
              <Headset className="text-white" size={40} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-5xl font-extrabold text-white tracking-tight italic">Contact Us</h1>
              <p className="text-green-50 mt-2 font-medium italic opacity-90 text-lg">
                We'd love to hear from you. Get in touch with our team.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-10 py-16 max-w-[1400px] flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-1 space-y-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-6">
                <div className="w-14 h-14 bg-[#f0fdf4] rounded-2xl flex items-center justify-center flex-shrink-0 border border-green-50">
                  <info.icon className="text-[#198754]" size={26} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a2c3d] mb-1.5">{info.title}</h3>
                  <p className="text-[15px] text-gray-500 font-medium leading-relaxed whitespace-pre-line mb-2">
                    {info.desc}
                  </p>
                  {info.isLink ? (
                    <a href={`${info.linkPrefix}${info.action}`} className="text-[#198754] text-lg font-semibold hover:underline transition-all">
                      {info.action}
                    </a>
                  ) : (
                    <span className="text-gray-500 font-medium"></span>
                  )}
                </div>
              </div>
            ))}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#1a2c3d] mb-6">Follow Us</h3>
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <a key={index} href={social.href} className="w-12 h-12 bg-[#f8f9fa] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#198754] hover:text-white transition-all shadow-inner border border-gray-100">
                    <social.icon size={20} strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm relative">
              
              <div className="flex items-center gap-5 mb-10 pb-8 border-b border-gray-100">
                <div className="w-14 h-14 bg-[#f0fdf4] rounded-2xl flex items-center justify-center flex-shrink-0 border border-green-50">
                  <Headset className="text-[#198754]" size={26} strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1a2c3d]">Send us a Message</h2>
                  <p className="text-gray-500 mt-1 font-medium">Fill out the form and we'll get back to you</p>
                </div>
              </div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-[#2b3445] mb-2">Full Name</label>
                    <input type="text" id="fullName" placeholder="John Doe" className="w-full h-14 px-6 rounded-xl border border-gray-200 bg-[#f8f9fa] focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all text-[15px] text-gray-700 font-mediumPlaceholder" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#2b3445] mb-2">Email Address</label>
                    <input type="email" id="email" placeholder="john@example.com" className="w-full h-14 px-6 rounded-xl border border-gray-200 bg-[#f8f9fa] focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all text-[15px] text-gray-700 font-mediumPlaceholder" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-[#2b3445] mb-2">Subject</label>
                  <div className="relative">
                    <select id="subject" className="w-full h-14 px-6 rounded-xl border border-green-300 bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all text-[15px] text-gray-700 font-medium appearance-none cursor-pointer pr-14">
                      <option value="" disabled selected>Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="shipping">Shipping Question</option>
                      <option value="returns">Returns & Refunds</option>
                      <option value="product">Product Information</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <Clock size={16} /> 
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#2b3445] mb-2">Message</label>
                  <textarea id="message" rows={6} placeholder="How can we help you?" className="w-full p-6 rounded-xl border border-gray-200 bg-[#f8f9fa] focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all text-[15px] text-gray-700 font-mediumPlaceholder resize-none"></textarea>
                </div>

                <div>
                  <button type="submit" className="bg-[#198754] text-white px-10 py-4 rounded-xl flex items-center gap-3 hover:bg-green-700 transition-all shadow-md text-base font-bold">
                    <Send size={18} strokeWidth={2.5} />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
            <div className="bg-[#f0fdf4] p-8 rounded-3xl border border-green-100 shadow-inner flex items-center gap-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-green-50">
                <HelpCircle className="text-[#198754]" size={26} strokeWidth={2.5} />
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-bold text-[#1a2c3d]">Looking for quick answers?</h4>
                <p className="text-[15px] text-gray-600 font-medium mt-1 leading-relaxed">
                  Check out our Help Center for frequently asked questions about orders, shipping, returns, and more.
                </p>
                <Link href="#" className="text-[#198754] text-sm font-bold mt-2 inline-flex items-center gap-1.5 hover:underline">
                  Visit Help Center <span className="text-lg">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}