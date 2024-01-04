"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const ExpenseCard = ({ date }: any) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/expense/day/${date}`}>
      <div className="w-96 mx-4 my-4">
        <div className="bg-white  shadow-md rounded-md transition duration-300 hover:shadow-lg">
          <div className="p-4">
            <h3 className="text-lg font-semibold">{formattedDate}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ExpensePage = () => {
  const [cardDates, setCardDates] = useState<string[]>([]);

  useEffect(() => {
    // Load existing dates from localStorage if available
    const storedDates = JSON.parse(localStorage.getItem('expenseCardDates') || '[]');
    setCardDates(storedDates);
  }, []);

  const createExpenseCard = () => {
    const currentDate = new Date().toISOString().split('T')[0]; // Extracts the date without time

    // Check if the currentDate already exists in cardDates
    if (!cardDates.includes(currentDate)) {
      const updatedDates = [...cardDates, currentDate];
      localStorage.setItem('expenseCardDates', JSON.stringify(updatedDates));
      setCardDates(updatedDates);
    } else {
      console.log('Expense for this date already exists');
    }
  };

  return (
    <div className="p-8">
      <button
        onClick={createExpenseCard}
        className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md mb-4 hover:bg-blue-600 transition duration-300"
      >
        Create Expense
      </button>
      <div className="flex flex-wrap">
        {cardDates.map((date) => (
          <ExpenseCard key={date} date={date} />
        ))}
      </div>
    </div>
  );
};

export default ExpensePage;
