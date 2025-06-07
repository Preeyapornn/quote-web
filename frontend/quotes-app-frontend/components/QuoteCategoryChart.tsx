
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type Quote = {
  id: number;
  quote: string;
  author: string;
  category: string;
  votes: number;
};

const QuoteCategoryChart: React.FC = () => {
  const [categoryCount, setCategoryCount] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    axios.get<Quote[]>('http://localhost:3001/quotes')
      .then((res) => {
        const countByCategory: { [key: string]: number } = {};
        res.data.forEach((quote) => {
          const cat = quote.category;
          countByCategory[cat] = (countByCategory[cat] || 0) + 1;
        });
        setCategoryCount(countByCategory);
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  const data = {
    labels: Object.keys(categoryCount),
    datasets: [
      {
        label: 'Number of Quotes',
        data: Object.values(categoryCount),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderRadius: 10,
      },
    ],
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Quotes by Category</h2>
      <Bar data={data} />
    </div>
  );
};

export default QuoteCategoryChart;
