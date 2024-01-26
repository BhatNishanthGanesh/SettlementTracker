'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trash2, Edit } from 'react-feather';


async function getData() {
  const res = await fetch("http://localhost:3000/api/posts", { cache: 'no-store' });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const simulateLoadingDelay = async (delay = 1000) => {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export default function Home() {
    const [data, setData] = useState([] as any[]);
    const [loading, setLoading] = useState(true);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedExpense, setUpdatedExpense] = useState('');
    const [updatedSpent, setUpdatedSpent] = useState('');
    const [updatedRecieved, setUpdatedRecieved] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    const fetchData = async () => {
      try {
        await simulateLoadingDelay(); 
        const result = await getData();
        setData(result);
        setLoading(false);
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
    
  
    const toggleSelectItem = (id: string) => {
      const isSelected = selectedItems.includes(id);
      let updatedSelectedItems: string[];
  
      if (isSelected) {
        updatedSelectedItems = selectedItems.filter((itemId) => itemId !== id);
      } else {
        updatedSelectedItems = [...selectedItems, id];
      }
  
      setSelectedItems(updatedSelectedItems);
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
    const deleteSelectedItems = async () => {
      try {
        // Loop through selected items and delete them
        await Promise.all(selectedItems.map(async (id) => {
          const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
            method: 'DELETE',
          });
  
          if (!response.ok) {
            throw new Error(`Failed to delete item with ID: ${id}`);
          }
        }));
  
        fetchData(); // Refresh data after deletion
        setSelectedItems([]); // Clear selected items
      } catch (error) {
        console.error('Error deleting selected items:', error);
      }
    };
    // const renderDues = () => {
    //   const groupedData = data.reduce((acc:any, item:any) => {
    //     if (!acc[item.name]) {
    //       acc[item.name] = [];
    //     }
    //     acc[item.name].push(item);
    //     return acc;
    //   }, {});
    
    //   // Calculate dues for each client
    //   const duesSummary = Object.entries(groupedData).map(([name, items]:any) => {
    //     const totalSpent = items.reduce((sum:any, currentItem:any) => sum + parseFloat(currentItem.spent), 0);
    //     const totalReceived = items.reduce((sum:any, currentItem:any) => sum + parseFloat(currentItem.recieved), 0);
    //     const totalDues = totalSpent - totalReceived;
    //     return { name, totalDues };
    //   });
    
    //   return (
    //     <div className="mt-8">
    //       <h2 className="text-2xl font-bold">Dues Summary</h2>
    //       <ul className="list-disc pl-4">
    //         {duesSummary.map((item:any, index) => (
    //           <li key={index}>
    //             {item.name}: {item.totalDues >= 0 ? (item.totalDues === 0 ? 'No dues' : `Owes: ${Math.abs(item.totalDues)}`) : `To pay: ${Math.abs(item.totalDues)}`}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   );
    // };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };
  
    const filteredData = data.filter((item: any) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (timestamp:any) => {
      const date = new Date(timestamp);
      return date.toLocaleString(); 
    };
    
    const renderSkeletonLoading = () => {
      return (
        <tr>
          <td className="border p-2 animate-pulse">&nbsp;</td>
          <td className="border p-2 animate-pulse">&nbsp;</td>
          <td className="border p-2 animate-pulse">&nbsp;</td>
          <td className="border p-2 animate-pulse">&nbsp;</td>
          <td className="border p-2 animate-pulse">&nbsp;</td>
          <td className="border p-2 animate-pulse">&nbsp;</td>
          <td className="border p-2 animate-pulse">&nbsp;</td>
          <td className="border p-2 animate-pulse">&nbsp;</td>
        </tr>
      );
    };
  return (
    <main className="items-center justify-between p-9">
      <h1 className="text-4xl mb-4 text-center dark:text-white font-bold">Settlement Tracker</h1>
      <div className="flex justify-center items-center mb-4">
        <button className="bg-red-500 shadow-lg m-2 p-2 rounded font-bold">
          <Link href="/post">Create</Link>
        </button>
        <input
          type="text"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={handleSearch}
          className="border rounded-md p-2 shadow-lg"
        />
      </div>
      <div className='overflow-auto'>

      <table className="mt-8 border-collapse border min-w-full shadow-lg">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 dark:text-white">
            <th className="border p-2 ">Name</th>
            <th className="border p-2">Expense</th>
            <th className="border p-2">Spent</th>
            <th className="border p-2">Received</th>
            <th className="border">Edit</th>
            <th className="border">Remove</th>
            <th className="border p-2 ">Created At</th>
            <th className='border p-2'></th>
          </tr>
        </thead>
        <tbody>
        {loading ? (
              // Render skeleton loading for each row
              // @ts-ignore
              Array.from({ length: 5 }).map((_, index) => renderSkeletonLoading(index))
            ) : (<>
          {filteredData.map((item:any, index) => (
            <tr className="bg-white dark:bg-medium dark:text-white text-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" key={index}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.expense}</td>
              <td className="border p-2">{item.spent}</td>
              <td className="border p-2">{item.recieved}</td>
              <td className="border p-2 cursor-pointer" onClick={() => openModal(item.id)}><Edit className="text-red-500 p-1 rounded" /></td>
              <td className="border p-2 cursor-pointer flex justify-center" onClick={() => {setSelectedItemId(item.id); setShowConfirmation(true)}}> <Trash2 className="text-red-500 p-1 rounded" /></td>
              <td className="border p-2">{formatDate(item.createdAt)}</td>
              <td className="border p-2">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelectItem(item.id)}
                />
              </td>
            </tr>
          ))}
          </>)}
        </tbody>
      </table>
      </div>
     
      {selectedItems.length > 0 && (
        <div className="mt-4">
          <button onClick={deleteSelectedItems} className="bg-red-500 text-white px-4 py-2 rounded-md">
            Delete Selected
          </button>
        </div>
      )}
      {/* {renderDues()} */}
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
