"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseComponent = () => {
  const [expensesByDate, setExpensesByDate] = useState([]);
  const [totalAmountUsed, setTotalAmountUsed] = useState(0);
  const [projectedAmountAfterOneMonth, setProjectedAmountAfterOneMonth] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/expense');
      if (response.status === 200) {
        setExpensesByDate(response.data);
      } else {
        console.error('Failed to fetch expenses');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Calculate total amount used from fetched expenses
  useEffect(() => {
    const totalSpent = expensesByDate.reduce((acc, expense) => acc + expense.spent, 0);
    setTotalAmountUsed(totalSpent);
  }, [expensesByDate]);

  // Calculate projected amount after one month
  useEffect(() => {
    const daysInMonth = 30; // Assuming a month has 30 days
    const averageDailyExpense = totalAmountUsed / daysInMonth;
    const projectedAmount = averageDailyExpense * 30; // Assuming a month has 30 days

    setProjectedAmountAfterOneMonth(projectedAmount);
  }, [totalAmountUsed]);

  const handleMonthClick = (month:any) => {
    const filteredExpenses = expensesByDate.filter((expense:any) => {
      const expenseDate = new Date(expense.date);
      return expenseDate.toLocaleString('default', { month: 'long' }) === month;
    });

    const totalForMonth = filteredExpenses.reduce((acc, expense) => acc + expense.spent, 0);
    setSelectedMonth({ month, totalForMonth });
  };

  return (
    <div className="p-4">
      {/* Display total amount used */}
      {/* <h2 className="text-2xl font-semibold mb-4">Total Amount Used: ${totalAmountUsed}</h2>
      {/* Display projected amount after one month */}
      {/* <h2 className="text-2xl font-semibold mb-4">Projected Amount After 1 Month: ${projectedAmountAfterOneMonth}</h2> */} 

      {/* Render month cards */}
      <div className="flex flex-wrap">
        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
          <div
            key={month}
            className="bg-white shadow-md rounded-md p-4 m-2 cursor-pointer transition duration-300 hover:shadow-lg"
            onClick={() => handleMonthClick(month)}
          >
            <h3 className="text-lg font-semibold">{month}</h3>
          </div>
        ))}
      </div>

      {/* Display selected month's total used money */}
      {selectedMonth && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">
            Total Used in {selectedMonth.month}: ${selectedMonth.totalForMonth}
          </h2>
        </div>
      )}

      {/* Render other expense details as needed */}
      {/* ... */}
    </div>
  );
};

export default ExpenseComponent;
