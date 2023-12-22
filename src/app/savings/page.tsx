"use client"
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const SavingsPage = () => {
  const [totalSavings, setTotalSavings] = useState<number>(0);
  const [totalProfit, setTotalProfit] = useState<number>(0);
  const [totalLoss, setTotalLoss] = useState<number>(0);

  // Fetch data and calculate total savings, profit, and loss
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/posts", { cache: 'no-store' });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        
        // Calculate total savings, profit, and loss
        const totals = data.reduce(
          (acc: { savings: number; profit: number; loss: number }, item: any) => {
            const spent = parseFloat(item.spent);
            const received = parseFloat(item.recieved);
            const diff = received - spent;
            
            acc.savings += diff;
            if (diff > 0) {
              acc.profit += diff;
            } else {
              acc.loss += Math.abs(diff);
            }
            
            return acc;
          },
          { savings: 0, profit: 0, loss: 0 }
        );

        setTotalSavings(totals.savings);
        setTotalProfit(totals.profit);
        setTotalLoss(totals.loss);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const pieChartData = {
    labels: ['Savings', 'Profit', 'Loss'],
    datasets: [
      {
        data: [totalSavings, totalProfit, totalLoss],
        backgroundColor: ['#36A2EB', '#33FF33', '#FF6347'],
        hoverBackgroundColor: ['#36A2EB', '#33FF33', '#FF6347'],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center mt-8   h-screen">
      <h1 className="text-4xl mb-8 dark:text-white font-bold ">Financial Summary</h1>
      <div className="grid grid-cols-3 gap-4 w-4/5">
        {/* Card for Total Savings */}
        <div className="bg-gray-200 p-4 h-96  text-center rounded-lg">
          <p className="text-3xl bg-gray-400 p-4 font-semibold ">Total Savings</p>
          <p className="text-8xl mt-24">{totalSavings}</p>
        </div>
        {/* Card for Total Profit */}
        <div className="bg-gray-200 p-4 text-center h-96 rounded-lg">
          <p className="text-3xl bg-gray-400 p-4 font-semibold">Total Profit</p>
          <p className="text-8xl mt-24">{totalProfit}</p>
        </div>
        {/* Card for Total Loss */}
        <div className="bg-gray-200 p-4 text-center h-96 rounded-lg">
          <p className="text-3xl bg-gray-400 p-4 font-semibold">Total Loss</p>
          <p className="text-8xl mt-24">{totalLoss}</p>
        </div>
      </div>
      {/* Pie Chart */}
      {/* <div className="mt-8 w-4/5">
        <h2 className="text-2xl mb-4 dark:text-white font-bold">Distribution</h2>
        <Pie data={pieChartData} />
      </div> */}
    </div>
  );
};

export default SavingsPage;
