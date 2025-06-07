import { useState } from "react";
import axios from "axios";

const AddQuoteForm = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quote || !author || !category) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/quotes", {
        quote,
        author,
        category,
        votes: 0,
      });
      setMessage("Quote added successfully!");
      setQuote("");
      setAuthor("");
      setCategory("");
      window.location.reload();
    } catch (error) {
      console.error(error);
      setMessage("Error adding quote.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4  ">
      <h2 className="text-lg font-bold mb-4">Add a New Quote</h2>
      {message && <p className="text-sm mb-2 text-blue-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Quote"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          className="w-full border p-2 rounded-full"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border p-2 rounded-full"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddQuoteForm;
