'use client'
import React, { useState } from 'react';
// import { useRouter } from 'next/router';

import axios from 'axios';

const PostComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    expense: '',
    spent:'',
    recieved: '',
  });
  
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    const newValue = name === 'spent' || name === 'recieved' ? parseInt(value, 10) : value;
    
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  
  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    // const router = useRouter(); 

    try {
      const res = await axios.post('http://localhost:3000/api/posts', formData);

      if (!res.data) {
        throw new Error('Failed to add data');
      } else {
        console.log('Data added successfully:', res.data);

        // Clear the form after successful submission
        setFormData({
          name: '',
          expense: '',
          spent:'',
          recieved:'',
        });
        // router.push('/');
      }
    } catch (error) {
      console.error('Error while adding data:', error);
      // Display error message in UI or handle it as needed
    }
  };

  return (
    <div className="flex justify-center bg-gray-200 items-center h-screen">
    <div className="max-w-md mx-auto ">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expense">
            Expense:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="expense"
            value={formData.expense}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spent">
            Spent:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="spent"
            value={formData.spent}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recieved">
            Received:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="recieved"
            value={formData.recieved}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Data
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default PostComponent;
