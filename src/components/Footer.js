import Link from "next/link";
import {
  Gamepad2,
  Smartphone,
  Speaker,
  Headset,
  Monitor,
  Laptop,
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

export default function Footer() {
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

  const categories = [
    { name: "Gaming", icon: Gamepad2, href: "#" },
    { name: "Smartphone", icon: Smartphone, href: "#" },
    { name: "Audio", icon: Speaker, href: "#" },
    { name: "Headset", icon: Headset, href: "#" },
    { name: "Monitor", icon: Monitor, href: "#" },
    { name: "Laptop", icon: Laptop, href: "#" },
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

          {/* Categories */}
          <div>
            <h3 className="text-wxl font-[600] mb-2">Kategori</h3>
            <ul className="space-y-2">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <li key={index}>
                    <Link
                      href={category.href}
                      className="flex items-center gap-4 text-md text-[#ccc] hover:text-[#fff] transition-colors"
                    >
                      <Icon size={16} />
                      {category.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#333]">
        <div className="max-w-[144rem] mx-auto px-[1.8rem] py-[2.4rem]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-[1.6rem]">
            <div className="text-[1.4rem] text-[#ccc]">
              <p>
                © 2025 Beli.com. All rights reserved. |{" "}
                <Link href="/admin/signin" className="hover:text-[#fff]">
                  Created
                </Link>{" "}
                by Ridwandanu Maulana
              </p>
            </div>
            <div className="flex gap-[1.6rem]">
              {socialMedia.map((social, index) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={index}
                    href={social.href}
                    className="w-[4rem] h-[4rem] bg-[#333] rounded-full flex items-center justify-center hover:bg-[#555] transition-colors"
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
