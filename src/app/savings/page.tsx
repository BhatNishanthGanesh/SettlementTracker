"use client"
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const SavingsPage = () => {
  // const [totalSavings, setTotalSavings] = useState<number>(0);
  // const [totalProfit, setTotalProfit] = useState<number>(0);
  // const [totalLoss, setTotalLoss] = useState<number>(0);
  // const [inputBudget, setInputBudget] = useState('');
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [totalReceived, setTotalReceived] = useState<number>(0);
  const [remainingBalance, setRemainingBalance] = useState<number>(0);
  const [inputBudget, setInputBudget] = useState('');

  // Fetch data and calculate total savings, profit, and loss
  // useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/posts", { cache: 'no-store' });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        
        // Calculate total savings, profit, and loss
        // const totals = data.reduce(
        //   (acc: { savings: number; profit: number; loss: number }, item: any) => {
        //     const spent = parseFloat(item.spent);
        //     const received = parseFloat(item.recieved);
        //     const diff = spent-received;
            
        //     acc.savings += diff;
        //     if (diff > 0) {
        //       acc.profit += diff;
        //     } else {
        //       acc.loss += Math.abs(diff);
        //     }
            
        //     return acc;
        //   },
        //   { savings: 0, profit: 0, loss: 0 }
        // );
        const totals = data.reduce(
          (acc: { spent: number; received: number }, item: any) => {
            acc.spent += parseFloat(item.spent);
            acc.received += parseFloat(item.recieved); // Ensure the field name is 'recieved'
            return acc;
          },
          { spent: 0, received: 0 }
        );
        
        setTotalSpent(totals.spent);
        setTotalReceived(totals.received);
        
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleBudgetInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputBudget(e.target.value);
      calculateRemainingBalance(e.target.value);
    };
  
    const calculateRemainingBalance = (value: string) => {
      const cleanedValue = value.replace(/[^\d.]/g, ''); // Remove non-numeric characters
      const budget = parseFloat(cleanedValue);
      if (!isNaN(budget)) {
        setRemainingBalance(budget - totalSpent + totalReceived);
      } else {
        setRemainingBalance(0);
      }
    };
  
  
  //       setTotalSavings(totals.savings);
  //       setTotalProfit(totals.profit);
  //       setTotalLoss(totals.loss);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // const handleBudgetInputChange = (e:any) => {
  //   setInputBudget(e.target.value);
  // };

  // const pieChartData = {
  //   labels: ['Savings', 'Profit', 'Loss'],
  //   datasets: [
  //     {
  //       data: [totalSavings, totalProfit, totalLoss],
  //       backgroundColor: ['#36A2EB', '#33FF33', '#FF6347'],
  //       hoverBackgroundColor: ['#36A2EB', '#33FF33', '#FF6347'],
  //     },
  //   ],
  // };

  return (
    <div className="flex flex-col items-center mt-8 h-screen">
      <h1 className="text-4xl mb-8 dark:text-white font-bold">Financial Summary</h1>
      <input
        type="text"
        placeholder="Enter total budget"
        className="mb-4 shadow-lg rounded p-1 border"
        value={inputBudget}
        onChange={handleBudgetInputChange}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
        {/* Card for Total Spent */}
        <div className="bg-gray-200 p-4 h-96 shadow-lg text-center rounded-lg">
          <p className="text-3xl bg-gray-400 p-4 font-semibold">Total Spent</p>
          <p className="text-8xl mt-24">{totalSpent}</p>
        </div>
        {/* Card for Total Received */}
        <div className="bg-gray-200 p-4 text-center shadow-lg h-96 rounded-lg">
          <p className="text-3xl bg-gray-400 p-4 font-semibold">Total Received</p>
          <p className="text-8xl mt-24">{totalReceived}</p>
        </div>
        {/* Card for Remaining Balance */}
        <div className="bg-gray-200 p-4 shadow-lg text-center h-96 rounded-lg">
          <p className="text-3xl bg-gray-400 p-4 font-semibold">Remaining Balance</p>
          <p className="text-8xl mt-24">{remainingBalance}</p>
        </div>
      </div>
      {/* Pie Chart */}
      {/* <div className="mt-8 w-full max-w-6xl">
        <h2 className="text-2xl mb-4 dark:text-white font-bold">Distribution</h2>
        <Pie data={pieChartData} />
      </div> */}
    </div>
  );
};

export default SavingsPage;
