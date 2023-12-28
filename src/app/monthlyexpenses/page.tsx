"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseComponent = () => {
  const [expensesByDate, setExpensesByDate] = useState([]);
  const [totalAmountUsed, setTotalAmountUsed] = useState(0);
  const [projectedAmountAfterOneMonth, setProjectedAmountAfterOneMonth] = useState(0);

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
    const projectedAmount = averageDailyExpense * daysInMonth;

    setProjectedAmountAfterOneMonth(projectedAmount);
  }, [totalAmountUsed]);

  return (
    <div>
      {/* Display total amount used */}
      <h2>Total Amount Used: ${totalAmountUsed}</h2>
      {/* Display projected amount after one month */}
      <h2>Projected Amount After 1 Month: ${projectedAmountAfterOneMonth}</h2>

      {/* Render other expense details as needed */}
      {/* ... */}
    </div>
  );
};

export default ExpenseComponent;
