"use client";
import React, { useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import AOS from "aos";
import "aos/dist/aos.css";

export interface Quote {
  id: number;
  quote: string;
  author: string;
  category: string;
  text: string;
  votes: number;
}

interface QuoteListProps {
  quotes: Quote[];
}

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

const getCategoryTextColor = (bgColor: string): string => {
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#333333" : "#FFFFFF";
};

const apiUrl = "http://localhost:3001"; // Set your API base URL here

const QuoteList = ({ quotes }: QuoteListProps) => {
  const [fetchedQuotes, setFetchedQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [committedSearchTerm, setCommittedSearchTerm] = useState<string>("");

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch(`${apiUrl}/quotes`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: Quote[] = await res.json();
        setFetchedQuotes(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          if (e instanceof Error) {
            setError(e.message);
          } else {
            setError("An unknown error occurred.");
          }
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const handleVote = async (id: number) => {
    try {
      const quoteToUpdate = fetchedQuotes.find((quote) => quote.id === id);
      if (!quoteToUpdate) return;

      const updatedQuote = { ...quoteToUpdate, votes: quoteToUpdate.votes + 1 };

      const res = await fetch(`${apiUrl}/quotes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuote),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: Quote = await res.json();
      setFetchedQuotes((prevQuotes) =>
        prevQuotes.map((quote) =>
          quote.id === id ? { ...quote, votes: data.votes } : quote
        )
      );
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const filteredQuotes = fetchedQuotes.filter((q) => {
    const matchesSearch =
      q.quote.toLowerCase().includes(committedSearchTerm.toLowerCase()) ||
      q.author.toLowerCase().includes(committedSearchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      q.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Loading Quotes...
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 animate-pulse p-6 rounded-lg shadow-md"
            >
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Quotes</h1>
      <div className="mb-4 w-full flex justify-center">
        <CategoryList
          selected={selectedCategory}
          onSelect={(category) => setSelectedCategory(category)}
          quotes={fetchedQuotes}
        />
      </div>

      <div className="flex flex-col justify-center md:flex-row items-center gap-4 mb-10 w-full">
        <input
          type="text"
          placeholder="Search by quote or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-md shadow-sm"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setCommittedSearchTerm(searchTerm)}
            className="bg-[#F6ABFD] text-white px-4 py-2 flex items-center gap-3 rounded-full hover:bg-blue-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path fill="#14052D" d="M16 11a5 5 0 1 1-10 0a5 5 0 0 1 10 0" />
              <path
                fill="#14052D"
                fillRule="evenodd"
                d="M2 11a9 9 0 1 1 16.032 5.618l3.675 3.675a1 1 0 0 1-1.414 1.414l-3.675-3.675A9 9 0 0 1 2 11m9-7a7 7 0 1 0 0 14a7 7 0 0 0 0-14"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              setSearchTerm("");
              setCommittedSearchTerm("");
              setSelectedCategory("all");
            }}
            className="bg-gray-300 text-black px-4 py-2 rounded-full hover:bg-gray-400 transition"
          >
            Clear
          </button>
        </div>
      </div>

      {filteredQuotes.length === 0 ? (
        <p className="text-center text-gray-500">No matching quotes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuotes.map((q, i) => {
            const bgColor = getCategoryBgColor(q.category);
            const textColor = getCategoryTextColor(bgColor);

            let colSpanClass = "";
            switch (i % 4) {
              case 0:
                colSpanClass = "col-span-2";
                break;
              case 1:
                colSpanClass = "col-span-1";
                break;
              case 2:
                colSpanClass = "col-span-1";
                break;
              case 3:
                colSpanClass = "col-span-2";
                break;
            }

            return (
              <div
                key={q.id}
                data-aos="fade-up"
                className={`${colSpanClass} bg-white p-10 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}
              >
                <p className="text-2xl font-semibold mb-3">
                  &quot;{q.quote}&quot;
                </p>
                <p className="text-sm text-gray-600">- {q.author}</p>
                <span
                  style={{ backgroundColor: bgColor, color: textColor }}
                  className="inline-block text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full mt-3"
                >
                  {q.category}
                </span>
                <div className="flex items-center  justify-between mt-4">
                  {quotes.map((quote) => (
                    <div key={quote.id}>
                      <p>{quote.quote}</p>
                      <p>- {quote.author}</p>
                      <p>Votes: {quote.votes}</p>
                      <button onClick={() => handleVote(quote.id)}>Vote</button>
                    </div>
                  ))}
                  <span className="text-sm text-gray-500">
                    Votes: {q.votes}
                  </span>
                  <button
                    onClick={() => handleVote(q.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition"
                  >
                    Vote
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuoteList;
