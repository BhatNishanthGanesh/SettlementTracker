"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";

const SavingsTracker = () => {
  const [dailyBudget, setDailyBudget] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  //   const [savings, setSavings] = useState([]);
  const [savings, setSavings] = useState<
    Array<{ date: string; savings: number }>
  >([]);

  let meow = 0;

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/expense");
        const expenses = response.data;
        console.log(expenses);

        // Calculate savings for each day based on createdAt timings
        const dailySavings = calculateSavings(
          expenses,
          parseFloat(dailyBudget)
        );
        console.log(dailySavings);

        setSavings(dailySavings);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    if (!showForm) {
      fetchExpenses();
    }
  }, [showForm]);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    const budget = parseFloat(dailyBudget);
    console.log(budget);

    if (!isNaN(budget) && budget >= 1) {
      // @ts-ignore
      setDailyBudget(budget);
      console.log(dailyBudget);
      meow = budget;

      setShowForm(false);
      // Move the fetchExpenses logic here
      try {
        const response = await axios.get("http://localhost:3000/api/expense");
        // const response = await axios.get(
        //   "http://settlement-gold.vercel.app/api/expense"
        // );
        const expenses = response.data;
        console.log(expenses);

        console.log(budget);

        // Calculate savings for each day based on createdAt timings
        const dailySavings = calculateSavings(expenses, budget);
        console.log("savings:", dailySavings);

        setSavings(dailySavings);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    } else {
      alert("Please enter a valid number for the daily budget.");
    }
  };

  const calculateSavings = (expenses: any, dailyBudget: any) => {
    console.log(" dailyBudget:", dailyBudget);

    // Group expenses by date
    const groupedExpenses = expenses.reduce((acc: any, expense: any) => {
      const date = new Date(expense.createdAt).toLocaleDateString();
      acc[date] = acc[date] || [];
      acc[date].push(expense);
      return acc;
    }, {});

    // Calculate savings for each day
    const dailySavings = Object.entries(groupedExpenses).map(
      ([date, expensesOfDay]: any) => {
        const totalSpent = expensesOfDay.reduce(
          (acc: any, expense: any) => acc + expense.spent,
          0
        );
        console.log(" totalSpent:", totalSpent);

        console.log(
          "calculateSavings - inside map - dailyBudget:",
          dailyBudget
        );

        const savings = dailyBudget - totalSpent;
        console.log("savings=calculateSavings - totalspent:", savings);

        return { date, savings };
      }
    );

    return dailySavings;
  };

  const calculateTotalSavings = (
    savings: Array<{ date: string; savings: number }>
  ) => {
    return savings.reduce((total, saving) => total + saving.savings, 0);
  };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto mt-8 p-8">
      {showForm ? (
        <form
          onSubmit={handleFormSubmit}
          className="max-w-md mx-auto bg-white p-8 rounded shadow-lg"
        >
          <label className="block mb-4">
            What is your daily budget?
            <input
              type="number"
              value={dailyBudget}
              onChange={(e) => setDailyBudget(e.target.value)}
              className="w-full border p-2 mt-2"
              min={1}
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      ) : (
        <>
          <h1 className="text-center text-5xl font-mono dark:text-white">
            Savings
          </h1>
          <p className="font-bold dark:text-white mb-2">
            Budget for a day: {dailyBudget}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* {savings.map((saving: any, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-lg ">
              <h2 className="text-xl font-semibold mb-2">{saving.date}</h2>
              <p>₹{saving.savings.toFixed(2)}</p>
            </div>
          ))} */}
            {savings.map((saving, index) => (
              <div
                key={index}
                className={`bg-white dark:text-white dark:bg-medium p-4 rounded ${
                  hoveredCard === index ? "" : "shadow-lg"
                } transition-shadow duration-300`}
                // @ts-ignore
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h2 className="text-xl font-semibold mb-2">{saving.date}</h2>
                <p>₹{saving.savings.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <p className="font-bold dark:text-white mt-4">
            Total Savings or loses: ₹{calculateTotalSavings(savings).toFixed(2)}
          </p>
        </>
      )}
    </div>
    </>
  );
};

export default SavingsTracker;
