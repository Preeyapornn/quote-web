"use client";

import { useState } from "react";


import QuoteList from "../../../components/QuoteList";

type Quote = {
  id: number;
  text: string;
  author: string;
  votes: number;
  category: string;
};

export default function QuotesPage() {


  const [quotes] = useState<Quote[]>([]);
  const [selectedCategory] = useState<string>("");

  const filteredQuotes = (
    selectedCategory
      ? quotes.filter(
          (q) => q.category.toLowerCase() === selectedCategory.toLowerCase()
        )
      : quotes
  ).map((q) => ({
    ...q,
    quote: q.text,
  }));

  return (
    <div className="mt-10 p-6">
      <div className="grid grid-cols-12 gap-4 items-center mb-8">
        <div className="col-span-full flex justify-center flex-col items-center">
          <h1 className="font-rowdies text-6xl mb-4">Welcome to Quotes</h1>

          <p className="text-lg text-gray-600">
            Explore quotes from various categories.
          </p>
          <QuoteList quotes={filteredQuotes} />
        </div>
      </div>
    </div>
  );
}
