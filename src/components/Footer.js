"use client";

import Link from "next/link";
import {
  Shield,
  Truck,
  Headphones,
  RotateCcw,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useData } from "@/app/providers";

export default function Footer() {
  const { category } = useData();

  const mainMenus = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Beli", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Sponsor", href: "#" },
  ];

  const accountMenus = [
    { name: "Sign In", href: "/signin" },
    { name: "Sign Up", href: "/signup" },
    { name: "My Profile", href: "/dashboard/profile" },
    { name: "Wishlist", href: "/dashboard/wishlist" },
  ];

  const features = [
    {
      name: "Secure Payment",
      icon: Shield,
      description: "100% secure payment process",
    },
    {
      name: "Free Delivery",
      icon: Truck,
      description: "Free shipping for orders over Rp 500,000",
    },
    {
      name: "24/7 Support",
      icon: Headphones,
      description: "Customer support available anytime",
    },
    {
      name: "Easy Returns",
      icon: RotateCcw,
      description: "30-day return policy",
    },
  ];

  const socialMedia = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "YouTube", icon: Youtube, href: "#" },
  ];

  // Function to create URL-friendly slug
  const createSlug = (name) => {
    return encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'));
  };

  return (
    <footer className="bg-[#111] text-[#fff] mt-[9.6rem]">
      {/* Features Section */}
      <div className="border-b border-[#333]">
        <div className="px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center justify-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#333] rounded-full flex items-center justify-center">
                      <Icon className="text-[#fff]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-[600] mb-2">
                        {feature.name}
                      </h3>
                      <p className="text-md text-[#ccc]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1440px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[3.2rem]">
          {/* Company Info */}
          <div>
            <Link href="/" className="text-2xl font-[700] mb-2 block">
              Beli.com
            </Link>
            <p className="text-md text-[#ccc] mb-2 leading-relaxed">
              Platform e-commerce terpercaya untuk kebutuhan teknologi dan
              elektronik Anda. Belanja mudah, aman, dan terpercaya.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <Mail size={16} className="text-[#ccc]" />
                <span className="text-md text-[#ccc]">
                  danumaulana425@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={16} className="text-[#ccc]" />
                <span className="text-md text-[#ccc]">+62 813-1850-7103</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin size={16} className="text-[#ccc]" />
                <span className="text-md text-[#ccc]">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Main Menu */}
          <div>
            <h3 className="text-2xl font-[600] mb-2">Menu Utama</h3>
            <ul className="space-y-2">
              {mainMenus.map((menu, index) => (
                <li key={index}>
                  <Link
                    href={menu.href}
                    className="text-md text-[#ccc] hover:text-[#fff] transition-colors"
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-2xl font-[600] mb-2">Akun</h3>
            <ul className="space-y-2">
              {accountMenus.map((menu, index) => (
                <li key={index}>
                  <Link
                    href={menu.href}
                    className="text-md text-[#ccc] hover:text-[#fff] transition-colors"
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories - DINAMIS TANPA ICON */}
          <div>
            <h3 className="text-2xl font-[600] mb-2">Kategori</h3>
            <ul className="space-y-2">
              {category && category.length > 0 ? (
                category.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/category/${createSlug(cat.name)}`}
                      className="text-md text-[#ccc] hover:text-[#fff] transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <span className="text-md text-[#666]">
                    No categories yet
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#333]">
        <div className="px-6 py-2">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-md text-[#ccc]">
              <p>
                © 2025 Beli.com. All rights reserved. |{" "}
                <Link href="/admin/signin" className="hover:text-[#fff]">
                  Created
                </Link>{" "}
                by Ridwandanu Maulana
              </p>
            </div>
            <div className="flex gap-2">
              {socialMedia.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-[#333] rounded-full flex items-center justify-center hover:bg-[#555] transition-colors"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}