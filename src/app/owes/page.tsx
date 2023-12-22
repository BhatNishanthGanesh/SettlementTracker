"use client"
import React, { useEffect, useState } from 'react';

async function getData() {
  const res = await fetch("http://localhost:3000/api/posts", { cache: 'no-store' });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const OwesSummary = () => {
  const [data, setData] = useState([] as any[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const renderOwesSummary = () => {
    const groupedData = data.reduce((acc: any, item: any) => {
      if (!acc[item.name]) {
        acc[item.name] = [];
      }
      acc[item.name].push(item);
      return acc;
    }, {});

    const duesSummary = Object.entries(groupedData).map(([name, items]: any) => {
      const totalSpent = items.reduce((sum: any, currentItem: any) => sum + parseFloat(currentItem.spent), 0);
      const totalReceived = items.reduce((sum: any, currentItem: any) => sum + parseFloat(currentItem.recieved), 0);
      const totalDues = totalSpent - totalReceived;
      return { name, totalDues };
    });

    const filteredDuesSummary = duesSummary.filter((item: any) => item.totalDues > 0);

    return (
      <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDuesSummary.length > 0 &&
          filteredDuesSummary.map((item: any, index) => (
            <div key={index} className="bg-white dark:bg-medium rounded-md shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p>Owes: {Math.abs(item.totalDues)}</p>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col dark:bg-dark dark:text-white items-center justify-center p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Owes Summary</h1>
      {renderOwesSummary()}
    </div>
  );
};

export default OwesSummary;
