import React from 'react';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="flex dark:text-white flex-wrap mt-10 justify-center">
      {/* Daily Expenses Card */}
      <Link href="/expense/day">
        <div className="max-w-xs  cursor-pointer bg-dark rounded overflow-hidden shadow-lg m-4">
          <img
            className="w-full h-40 object-cover"
            src="https://moneyview.in/images/blog/wp-content/uploads/2017/10/Blog-11-reasonsfeature-min.jpg"
            alt="Daily Expenses"
          />
          <div className="px-8 py-7">
            <div className="font-bold text-xl mb-2">Daily Expenses</div>
            <p className="text-gray-700 dark:text-gray-300 text-base">Track your daily expenses here</p>
          </div>
        </div>
      </Link>

      {/* View Monthly Expenses Card */}
      <Link href="/monthlyexpenses">
        <div className="max-w-xs cursor-pointer bg-dark rounded overflow-hidden shadow-lg m-4">
          <img
            className="w-full h-40 object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVgXrNrEJLS8I0nPB79-Aklx-TeChusJp6sQ&usqp=CAU"
            alt="View Monthly Expenses"
          />
          <div className="px-6 py-4 ">
            <div className="font-bold text-xl mb-2">View Monthly Expenses</div>
            <p className="text-gray-700 dark:text-gray-300 text-base">Check out your expenses for the month</p>
          </div>
        </div>
      </Link>

      {/* Savings Card */}
      <Link href="/savings">
        <div className="max-w-xs cursor-pointer bg-dark rounded overflow-hidden shadow-lg m-4">
          <img
            className="w-full h-40  object-cover"
            src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2F2aW5nc3xlbnwwfHwwfHx8MA%3D%3D"
            alt="Savings"
          />
          <div className="px-8 py-7">
            <div className="font-bold text-xl mb-2">Savings</div>
            <p className="text-gray-700 dark:text-gray-300 text-base">Track your daily savings</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Page;
