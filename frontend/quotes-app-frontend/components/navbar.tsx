"use client";
import React from "react";
import Image from "next/image";
import logo from "../public/logoQuote.png";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "LogIn", path: "/login" },
  ];

  return (
    <div className="bg-white shadow-md rounded-full px-4">
      <div className="flex justify-between items-center py-3">
        <div>
          <Image
            src={logo}
            alt="Quotes App Logo"
            width={129}
            height={70}
            className="h-auto w-full"
          />
        </div>
        <div className="flex items-center gap-4 font-sans font-extrabold text-[#180331]">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`hover:underline ${
                  isActive ? "text-blue-600 underline" : ""
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div>
          <button
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              })
            }
            className="bg-[#8CF2FF] font-sans font-extrabold text-[#180331] px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
          >
            GET IN TOUCH
          </button>
        </div>
      </div>
    </div>
  );
}
