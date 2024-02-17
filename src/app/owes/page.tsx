"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";

async function getData() {
  // const res = await fetch("http://localhost:3000/api/posts", { cache: 'no-store' });
  // const res = await fetch("http://settlement-gold.vercel.app/api/posts", {
    // cache: "no-store",
  // });
  const res = await fetch("http://nimble-kitten-31c037.netlify.app/api/posts", {
    cache: "no-store",
  });

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

    const duesSummary = Object.entries(groupedData).map(
      ([name, items]: any) => {
        const totalSpent = items.reduce(
          (sum: any, currentItem: any) => sum + parseFloat(currentItem.spent),
          0
        );
        const totalReceived = items.reduce(
          (sum: any, currentItem: any) =>
            sum + parseFloat(currentItem.recieved),
          0
        );
        const totalDues = totalSpent - totalReceived;
        return { name, totalDues };
      }
    );

    const filteredDuesSummary = duesSummary.filter(
      (item: any) => item.totalDues > 0
    );

    return (
      <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDuesSummary.length > 0 &&
          filteredDuesSummary.map((item: any, index) => (
            <div
              key={index}
              className="bg-white dark:bg-medium p-24 rounded-md shadow-md "
            >
              <h1 className="text-4xl  font-semibold mb-2">{item.name}</h1>
              <p>Owes: {Math.abs(item.totalDues)}</p>
            </div>
          ))}
      </div>
    );
  };
  return (
    <>
    <Navbar/>
    <div className="flex flex-col dark:bg-dark mt-4 dark:text-white items-center justify-center p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Owes Summary</h1>
      {renderOwesSummary()}
    </div>
    </>
  );
};

export default OwesSummary;
