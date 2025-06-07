import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import QuotesPage from "../app/quotes/page";
import "./../app/globals.css";

export default function Home() {
  return (
    <div className="flex flex-col  min-h-screen p-4 bg-[#f4f1eb]">
      <Navbar />
      <QuotesPage />
      <Footer />
    </div>
  );
}
