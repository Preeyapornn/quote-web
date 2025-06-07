import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

type Quote = {
  id: number;
  quote: string;
  author: string;
  category: string;
  votes: number;
};

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

const TopQuotePerCategory = () => {
  const [topQuotes, setTopQuotes] = useState<{ [category: string]: Quote }>({});

  useEffect(() => {
    axios
      .get<Quote[]>(`${apiUrl}/quotes`)
      .then((res) => {
        const quotes = res.data;

        const bestQuotes: { [category: string]: Quote } = {};

        quotes.forEach((quote) => {
          const category = quote.category.toLowerCase();

          if (
            !bestQuotes[category] ||
            quote.votes > bestQuotes[category].votes
          ) {
            bestQuotes[category] = quote;
          }
        });

        setTopQuotes(bestQuotes);
      })
      .catch((err) => console.error("Error fetching quotes:", err));
  }, []);

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center pb-4">
        Top 5 Quotes by Category
      </h2>
      {Object.entries(topQuotes).map(([category, quote]) => (
        <div
          key={quote.id}
          className="p-4 rounded-md shadow-sm "
          style={{ backgroundColor: getCategoryBgColor(category) }}
        >
          <p className="font-semibold capitalize">Category: {category}</p>
          <p className="italic">&quot;{quote.quote}&quot;</p>
          <p className="text-sm">— {quote.author}</p>
          <p className="text-sm">Votes: {quote.votes}</p>
        </div>
      ))}
    </div>
  );
};

export default TopQuotePerCategory;
