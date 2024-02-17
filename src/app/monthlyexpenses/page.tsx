"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';

type Expense = {
  id: string;
  name: string;
  description: string;
  spent: number;
};

type MonthInfo = {
  month: string;
  totalForMonth: number;
};

const useClient = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);



  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
      setError(null); // Reset error when data is fetched successfully
    } catch (error: any) {
      setError(error.message || 'Error fetching data');
    }
  };

  const fetchExpensesByMonth = async ({ monthNumber, year }: { monthNumber: number; year: number }) => {
    try {
      // const url = `http://localhost:3000/api/expense/month?month=${monthNumber + 1}&year=${year}`;
      // const url = `http://settlement-gold.vercel.app/api/expense/month?month=${monthNumber + 1}&year=${year}`;
      // const url = `http://nimble-kitten-31c037.netlify.app/api/expense/month?month=${monthNumber + 1}&year=${year}`;
      await fetchData(`/api/expense/month?month=${monthNumber + 1}&year=${year}`);
      
    } catch (error: any) {
      setError(error.message || 'Error fetching data');
    }
  };

  return { data, error, fetchExpensesByMonth };
};


const ExpenseComponent = () => {
  // const [expensesByDate, setExpensesByDate] = useState([]);
  const [expensesByDate, setExpensesByDate] = useState<Expense[]>([]);
  // const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState<MonthInfo | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
  const { data: fetchedData, error, fetchExpensesByMonth } = useClient();
  const [hoveredCard, setHoveredCard] = useState(null);

  const sortExpenses = (expenses:any) => {
    // return expenses.sort((a:any, b:any) => b.spent - a.spent);
    return [...expenses].sort((a, b) => b.spent - a.spent);
  };

  useEffect(() => {
    console.log('Fetched Data:', fetchedData);
    if (fetchedData) {
      const sortedExpenses = sortExpenses([...fetchedData]);
      setExpensesByDate(sortedExpenses);
      console.log(expensesByDate);
      
      
    }
  }, [fetchedData]);
  
  

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthClick = async (month: string) => {
    // const currentYear = new Date().getFullYear();
    const monthNumber = months.indexOf(month);

    await fetchExpensesByMonth({ monthNumber, year: selectedYear });
    // @ts-ignore
    setSelectedMonth({ month, totalForMonth: calculateTotalForMonth(expensesByDate) });
  
    
  };
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value);
    setSelectedYear(newYear);
    // @ts-ignore
    fetchExpensesByMonth({ monthNumber: months.indexOf(selectedMonth.month), year: newYear });
  };

  const calculateTotalForMonth = (expenses: any[]) => {
    return Array.isArray(expenses) ? expenses.reduce((acc, expense) => acc + expense.spent, 0) : 0;
  };

  

  return (
    <>
    <Navbar/>
    <div className="p-4">
      <h1 className='text-5xl text-center sm:text-1xl md:text-2xl lg:text-5xl mb-4'>Monthly expenses</h1>
      <div className='flex items-center justify-between'>
      {!selectedMonth &&(
       <h2 className="text-xl text-black dark:text-white font-semibold">
       <span>Total Used in Month: </span>  
       
      </h2>    

      )}
      {selectedMonth && (
        <div className="mt-8">
          <h2 className="text-xl text-black dark:text-white font-semibold">
           <span>Total Used in </span>  
            {selectedMonth.month}: ₹{calculateTotalForMonth(expensesByDate)}
          </h2>
        </div>
      )}
      <div className="inline-block relative">
        <select
          className="border border-gray-900 dark:border-gray-600 rounded-md text-black px-4 py-2 pr-8 focus:outline-none focus:border-blue-500"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {Array.from({ length: 10 }, (_, i) => selectedYear - 5 + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        </div>
      </div>
       

      <div className="flex flex-wrap">
        {months.map((month) => (
          <div
            key={month}
            className={`bg-white rounded-md p-4 m-2 cursor-pointer transition duration-300 ${hoveredCard === month || selectedMonth?.month === month ? '' : 'shadow-lg'}`}
            //@ts-ignore
            onMouseEnter={() => setHoveredCard(month)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleMonthClick(month)}
          >
            <h3 className="text-lg font-semibold">{month}</h3>
          </div>
        ))}
      </div>

      {/* {selectedMonth && (
        <div className="mt-8">
          <h2 className="text-xl text-black dark:text-white font-semibold">
           <span>Total Used in </span>  

            {selectedMonth.month}: ₹{calculateTotalForMonth(expensesByDate)}
          </h2>
        </div>
      )} */}

      {/* Display expenses details as cards */}
      <div className="mt-8">
        <h2 className="text-xl text-black dark:text-white mb-3 font-semibold">Expenses Details:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {expensesByDate.map((expense) => (
  <div key={expense.id} className="bg-white p-4 shadow-md rounded-md">
    <h3 className="text-lg font-semibold">Name: {expense.name}</h3>
    <p><strong>Description:</strong> {expense.description}</p>
    <p><strong>Spent:</strong>₹{expense.spent}</p>
  </div>
))}

</div>

        </div>
      </div>
    </>
  );
};

export default ExpenseComponent;
