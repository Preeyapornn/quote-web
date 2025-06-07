import { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

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

type Quote = {
  id: number;
  quote: string;
  author: string;
  category: string;
  votes: number;
};

const DoughnutChart = () => {
  const [categoryScores, setCategoryScores] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    axios
      .get<Quote[]>("http://localhost:3001/quotes")
      .then((res) => {
        const scoreByCategory: { [key: string]: number } = {};

        res.data.forEach((quote) => {
          const cat = quote.category.toLowerCase();
          scoreByCategory[cat] = (scoreByCategory[cat] || 0) + quote.votes;
        });

        setCategoryScores(scoreByCategory);
      })
      .catch((err) => console.error("Error fetching quotes:", err));
  }, []);

  const labels = Object.keys(categoryScores);
  const data = Object.values(categoryScores);
  const backgroundColors = labels.map(getCategoryBgColor);

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-72 h-72">
      <h2 className="text-center mb-2">Total Votes by Category</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default DoughnutChart;
