'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

async function getData() {
  const res = await fetch("http://localhost:3000/api/posts", { cache: 'no-store' });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}



export default function Home() {
    const [data, setData] = useState([] as any[]);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const [updatedExpense, setUpdatedExpense] = useState('');
    const [updatedSpent, setUpdatedSpent] = useState('');
    const [updatedRecieved, setUpdatedRecieved] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
  
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const openModal = (id: any) => {
      setSelectedItemId(id);
      const selectedItem = data.find((item: any) => item.id === id); // Find the selected item in the data
      if (selectedItem) {
        setUpdatedName(selectedItem.name); // Set updatedName to the name of the selected item
        setUpdatedExpense(selectedItem.expense); // Set other fields if needed
        setUpdatedSpent(selectedItem.spent);
        setUpdatedRecieved(selectedItem.recieved);
      }
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
      setSelectedItemId('');
      setUpdatedName('');
      setUpdatedExpense('');
      setUpdatedSpent('')
      setUpdatedRecieved('')
    };
  
    const updateItem = async () => {
      try {
        // Convert spent and received to numbers
        const spentValue = parseFloat(updatedSpent);
        const recievedValue = parseFloat(updatedRecieved);
    
        const updatedData = {
          name: updatedName,
          expense: updatedExpense, // Assuming expense is supposed to be a string
          spent: isNaN(spentValue) ? 0 : spentValue,
          recieved: isNaN(recievedValue) ? 0 : recievedValue,
        };
    
        const response = await fetch(`http://localhost:3000/api/posts/${selectedItemId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
    
        if (!response.ok) {
          throw new Error('Failed to update item');
        }
    
        fetchData();
        closeModal();
      } catch (error) {
        console.error('Error updating item:', error);
      }
    };
    
  
  
  

    const deleteItem = async (id: any) => {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
  
        fetchData();
        setShowConfirmation(false);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    };
    const renderDues = () => {
      const groupedData = data.reduce((acc:any, item:any) => {
        if (!acc[item.name]) {
          acc[item.name] = [];
        }
        acc[item.name].push(item);
        return acc;
      }, {});
    
      // Calculate dues for each client
      const duesSummary = Object.entries(groupedData).map(([name, items]:any) => {
        const totalSpent = items.reduce((sum:any, currentItem:any) => sum + parseFloat(currentItem.spent), 0);
        const totalReceived = items.reduce((sum:any, currentItem:any) => sum + parseFloat(currentItem.recieved), 0);
        const totalDues = totalSpent - totalReceived;
        return { name, totalDues };
      });
    
      return (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Dues Summary</h2>
          <ul className="list-disc pl-4">
            {duesSummary.map((item:any, index) => (
              <li key={index}>
                {item.name}: {item.totalDues >= 0 ? (item.totalDues === 0 ? 'No dues' : `Owes: ${Math.abs(item.totalDues)}`) : `To pay: ${Math.abs(item.totalDues)}`}
              </li>
            ))}
          </ul>
        </div>
      );
    };

    const formatDate = (timestamp:any) => {
      const date = new Date(timestamp);
      return date.toLocaleString(); 
    };
    

  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <h1 className="text-4xl">Expense Tracker</h1>
      <button className='bg-red-500 m-2 p-1 rounded font-bold'><Link href="/post">Add new Data</Link></button>
      <table className="mt-8 border-collapse border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Expense</th>
            <th className="border p-2">Spent</th>
            <th className="border p-2">Received</th>
            <th className="border p-2">Edit</th>
            <th className="border p-2">Remove</th>
            <th className="border p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item:any, index) => (
            <tr className="bg-white text-center" key={index}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.expense}</td>
              <td className="border p-2">{item.spent}</td>
              <td className="border p-2">{item.recieved}</td>
              <td className="border p-2 cursor-pointer" onClick={() => openModal(item.id)}><button className='bg-red-500 p-1 rounded'>Update</button></td>
              <td className="border p-2 cursor-pointer" onClick={() => {setSelectedItemId(item.id); setShowConfirmation(true)}}><button className='bg-red-500 p-1 rounded'>Delete</button></td>
              <td className="border p-2">{formatDate(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderDues()}
      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <input
              type="text"
              placeholder="Enter Updated Name"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="text"
              placeholder="Enter Updated Expense"
              value={updatedExpense}
              onChange={(e) => setUpdatedExpense(e.target.value)}
              className="block mt-4 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="number"
              placeholder="Enter Spent Expense"
              value={updatedSpent}
              onChange={(e) => setUpdatedSpent(e.target.value)}
              className="block mt-4 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="number"
              placeholder="Enter Recieved Expense"
              value={updatedRecieved}
              onChange={(e) => setUpdatedRecieved(e.target.value)}
              className="block mt-4 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={updateItem} className="bg-indigo-500 text-white px-4 py-2 rounded-md">Save</button>
              <button onClick={closeModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      )}
       {showConfirmation && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <p>Are you sure you want to delete this item?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => deleteItem(selectedItemId)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
              <button onClick={() => setShowConfirmation(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
