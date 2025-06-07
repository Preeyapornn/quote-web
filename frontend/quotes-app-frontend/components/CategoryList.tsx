"use client";

import { useState, useEffect } from "react";

type Quote = {
  id: number;
  text: string;
  author: string;
  votes: number;
  category: string;
};

interface CategoryListProps {
  selected: string;
  onSelect: (category: string) => void;
  quotes: Quote[];
}

function getCategoryIcon(category: string) {
  switch (category.toLowerCase()) {
    case "food":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="45"
          viewBox="0 0 24 24"
        >
          <path
            fill="000000"
            d="M18.06 23h1.66c.84 0 1.53-.65 1.63-1.47L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26c1.44 1.42 2.43 2.89 2.43 5.29zM1 22v-1h15.03v1c0 .54-.45 1-1.03 1H2c-.55 0-1-.46-1-1m15.03-7C16.03 7 1 7 1 15zM1 17h15v2H1z"
          />
        </svg>
      );
    case "funny":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="45"
          viewBox="0 0 24 24"
        >
          <path
            fill="000000"
            d="M2.25 12.044v6.517c0 .764.308 1.57.8 2.127c.501.567 1.354 1.012 2.287.543c.696-.35 1.275-.363 1.746-.047c1.126.755 2.708.755 3.834 0c.345-.23.607-.308.825-.31c.218-.001.485.072.84.31c1.127.755 2.709.755 3.835 0c.213-.142.58-.237 1.044-.226c.454.01.898.12 1.202.273c.933.469 1.786.024 2.287-.543c.492-.557.8-1.363.8-2.126v-6.518c0-5.405-4.362-9.794-9.75-9.794s-9.75 4.389-9.75 9.794m14.516.934a.75.75 0 0 1-.017 1.06a8 8 0 0 1-.536.476l.218.445a2.25 2.25 0 0 1-4.039 1.983l-.273-.557a8.9 8.9 0 0 1-3.801-.087a.75.75 0 0 1 .364-1.455c1.13.283 2.429.287 3.746-.066s2.44-1.005 3.278-1.816a.75.75 0 0 1 1.06.017m-3.027 3.303l-.147-.299q.721-.26 1.366-.62l.127.258a.75.75 0 0 1-1.346.66M9.329 10l.103.489a.75.75 0 1 1-1.467.311l-.104-.489A.75.75 0 1 1 9.328 10m4-1.618a.75.75 0 0 1 .89.578l.104.489a.75.75 0 1 1-1.467.312l-.104-.49a.75.75 0 0 1 .578-.889"
          />
        </svg>
      );
    case "love":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="45"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
            <path
              fill="black"
              d="M9.498 5.793c1.42-1.904 3.555-2.46 5.519-1.925c2.12.577 3.984 2.398 4.603 4.934q.048.195.083.39a4.45 4.45 0 0 0-2.774-.07c-1.287-.952-2.881-1.112-4.298-.59c-1.775.655-3.161 2.316-3.482 4.406c-.41 2.676 1.22 5.08 3.525 7.124l.388.336c-.313.022-.631-.027-.935-.092a10 10 0 0 1-.466-.112l-.537-.15C6.35 18.701 3.154 16.6 2.237 13.46c-.732-2.506-.028-5.015 1.52-6.575c1.434-1.445 3.56-2.031 5.741-1.092m1.628 7.448c.428-2.792 3.657-4.168 5.315-1.772a.104.104 0 0 0 .144.025c2.377-1.684 4.94.713 4.387 3.483q-.48 2.41-4.47 4l-.435.17l-.263.108c-.227.089-.467.16-.684.122c-.216-.038-.417-.188-.6-.348l-.31-.28q-3.47-2.986-3.084-5.508"
            />
          </g>
        </svg>
      );
    case "life":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28.13"
          height="45"
          viewBox="0 0 480 512"
        >
          <path
            fill="000000"
            d="M471.99 334.43L336.06 256l135.93-78.43c7.66-4.42 10.28-14.2 5.86-21.86l-32.02-55.43c-4.42-7.65-14.21-10.28-21.87-5.86l-135.93 78.43V16c0-8.84-7.17-16-16.01-16h-64.04c-8.84 0-16.01 7.16-16.01 16v156.86L56.04 94.43c-7.66-4.42-17.45-1.79-21.87 5.86L2.15 155.71c-4.42 7.65-1.8 17.44 5.86 21.86L143.94 256L8.01 334.43c-7.66 4.42-10.28 14.21-5.86 21.86l32.02 55.43c4.42 7.65 14.21 10.27 21.87 5.86l135.93-78.43V496c0 8.84 7.17 16 16.01 16h64.04c8.84 0 16.01-7.16 16.01-16V339.14l135.93 78.43c7.66 4.42 17.45 1.8 21.87-5.86l32.02-55.43c4.42-7.65 1.8-17.43-5.86-21.85"
          />
        </svg>
      );
    case "motivation":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="45"
          viewBox="0 0 24 24"
        >
          <path
            fill="000000"
            d="M18 2a1 1 0 0 1 1 1v1a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3V3a1 1 0 1 1 2 0v1h10V3a1 1 0 0 1 1-1m-2 7.5a1 1 0 0 0-1 1v.5h-.5a1 1 0 0 0 0 2h.5v.5a1 1 0 0 0 2 0V13h.5a1 1 0 0 0 0-2H17v-.5a1 1 0 0 0-1-1M9.5 11h-3a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function CategoryList({
  selected,
  onSelect,
}: CategoryListProps) {
  const [categories, setCategories] = useState<string[]>([]);

  // Define your API URL here
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  useEffect(() => {
    fetch(`${apiUrl}/quotes`)
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = Array.from(
          new Set(
            data.map((q: unknown) =>
              q && typeof q === "object" && "category" in q
                ? (q as { category: string }).category
                : ""
            )
          )
        ).filter((cat) => cat) as string[];
        setCategories(uniqueCategories);
      });
  }, []);

  const getCategoryBgColor = (category: string): string => {
    switch (category.toLowerCase()) {
      case "funny":
        return "#8CF2FF";
      case "love":
        return "#F6ABFD";
      case "food":
        return "#696DFE";
      case "life":
        return "#4F009A";
      case "motivation":
        return "#DBD5C9";
      default:
        return "#E0E0E0";
    }
  };

  return (
    <div className="flex flex-wrap gap-3 py-4 justify-center">
      {categories.map((category) => {
        const isSelected = selected === category;
        const bgColor = isSelected ? getCategoryBgColor(category) : "white";

        return (
          <div
            key={category}
            onClick={() => {
              if (isSelected) {
                // onSelect?.("");
              } else {
                onSelect?.(category);
              }
            }}
            style={{ backgroundColor: bgColor }}
            className={`cursor-pointer flex flex-col items-center p-10 rounded-xl transition hover:bg-violet-100 ${
              isSelected ? "scale-105" : ""
            } 
        w-full sm:w-[48%] md:w-[18%]`}
          >
            {getCategoryIcon(category)}
            <span className="mt-2 text-sm text-center">{category}</span>
          </div>
        );
      })}
    </div>
  );
}
