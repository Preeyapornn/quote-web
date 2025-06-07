"use client";
import React, { useEffect, useState } from "react";
import DoughnutChart from "../../../components/DoughnutChart";
import QuoteCategoryChart from "../../../components/QuoteCategoryChart";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import TopQuotePerCategory from "../../../components/TopQuotePerCategory";

type Quote = {
  id: number;
  quote: string;
  author: string;
  category: string;
  votes: number;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function DashboardPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch(`${apiUrl}/quotes`);
        if (!res.ok) throw new Error("Failed to fetch quotes");
        const data = await res.json();
        setQuotes(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  const totalVotes = quotes.reduce((sum, q) => sum + q.votes, 0);
  const topQuote = quotes.reduce(
    (top, q) => (q.votes > top.votes ? q : top),
    quotes[0]
  );

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#180331]">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-100 rounded-xl p-6 shadow-md text-center">
            <h2 className="text-xl font-bold mb-2">Total Votes</h2>
            <p className="text-4xl font-bold text-blue-800">{totalVotes}</p>
          </div>
          <div className="bg-green-100 rounded-xl p-6 shadow-md text-center">
            <h2 className="text-xl font-bold mb-2">Top Quote</h2>
            <p className="italic">&quot;{topQuote.quote}&quot;</p>

            <p className="text-sm text-gray-600">- {topQuote.author}</p>
          </div>
          <div className="bg-purple-100 rounded-xl items-center p-6 shadow-md justify-center flex flex-col text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
            >
              <path
                fill="#ffb800"
                d="M22 8.162v.073c0 .86 0 1.291-.207 1.643s-.584.561-1.336.98l-.793.44c.546-1.848.729-3.834.796-5.532l.01-.221l.002-.052c.651.226 1.017.395 1.245.711c.283.393.283.915.283 1.958m-20 0v.073c0 .86 0 1.291.207 1.643s.584.561 1.336.98l.794.44c-.547-1.848-.73-3.834-.797-5.532l-.01-.221l-.001-.052c-.652.226-1.018.395-1.246.711C2 6.597 2 7.12 2 8.162"
              />
              <path
                fill="#ffb800"
                fillRule="evenodd"
                d="M16.377 2.347A26.4 26.4 0 0 0 12 2c-1.783 0-3.253.157-4.377.347c-1.139.192-1.708.288-2.184.874c-.475.586-.45 1.219-.4 2.485c.173 4.348 1.111 9.78 6.211 10.26V19.5H9.82a1 1 0 0 0-.98.804l-.19.946H6a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5h-2.65l-.19-.946a1 1 0 0 0-.98-.804h-1.43v-3.534c5.1-.48 6.039-5.911 6.211-10.26c.05-1.266.076-1.9-.4-2.485c-.476-.586-1.045-.682-2.184-.874m-3.59 3.46a.75.75 0 0 1 .463.693v4a.75.75 0 0 1-1.5 0V8.31l-.22.22a.75.75 0 1 1-1.06-1.06l1.5-1.5a.75.75 0 0 1 .817-.163"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-xl font-bold mb-2">Top Category</h2>
            <p className="text-2xl font-bold text-purple-800">
              {topQuote.category}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-white flex items-center justify-center min-h-64 rounded-xl pb-6  shadow-md">
            <DoughnutChart />
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <QuoteCategoryChart />
          </div>
        </div>
        <div>
          <TopQuotePerCategory />
        </div>

        {/* <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-md">
            <thead>
              <tr className="bg-gray-200 text-left text-sm uppercase tracking-wide text-gray-700">
                <th className="px-6 py-3">Quote</th>
                <th className="px-6 py-3">Author</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Votes</th>
              </tr>
            </thead>
            <tbody>
              {quotes
                .sort((a, b) => b.votes - a.votes)
                .map((quote) => (
                  <tr key={quote.id} className="border-t hover:bg-gray-100">
                    <td className="px-6 py-4">{quote.quote}</td>
                    <td className="px-6 py-4">{quote.author}</td>
                    <td className="px-6 py-4">{quote.category}</td>
                    <td className="px-6 py-4 font-bold">{quote.votes}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div> */}
      </div>
      <Footer />
    </>
  );
}
