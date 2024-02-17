// 'use client'
// import React, { useState } from 'react';
// // import { useRouter } from 'next/router';

// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// const PostComponent = () => {
//   const router = useRouter(); 
//   const [formData, setFormData] = useState({
//     name: '',
//     expense: '',
//     spent:'',
//     recieved: '',
//   });
  
//   const handleChange = (e:any) => {
//     const { name, value } = e.target;
//     // const newValue = name === 'spent' || name === 'recieved' ? parseInt(value, 10) : value;
//     let newValue;

//     if (name === 'spent' || name === 'recieved') {
//       newValue = parseInt(value, 10);
//       newValue = newValue < 0 ? 0 : newValue; 
//     } else {
//       newValue = value;
//     }
    
//     setFormData({
//       ...formData,
//       [name]: newValue,
//     });
//   };
  
  
//   const handleSubmit = async (e:any) => {
//     e.preventDefault();
    

//     try {
//       const res = await axios.post('http://localhost:3000/api/posts', formData);

//       if (!res.data) {
//         throw new Error('Failed to add data');
//       } else {
//         console.log('Data added successfully:', res.data);

//         // Clear the form after successful submission
//         setFormData({
//           name: '',
//           expense: '',
//           spent:'',
//           recieved:'',
//         });
//         router.push('/');
//         // redirect('/')
        
//       }
//     } catch (error) {
//       console.error('Error while adding data:', error);
//       // Display error message in UI or handle it as needed
//     }
//   };

//   return (
//     <div className="flex justify-center  dark:bg-dark bg-gray-200 items-center h-screen">
//     <div className="max-w-md mx-auto ">
//       <form onSubmit={handleSubmit} className="bg-white dark:bg-medium  shadow-md rounded px-8 pt-6 pb-6 mb-4">
//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="name">
//             Name:
//           </label>
//           <input
//             // className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             style={{
//               boxShadow: '5px 5px 10px #d4d4d4, -5px -5px 10px #ffffff',
//               borderRadius: '15px',
//               padding: '1em',
//               backgroundColor: 'rgb(240, 240, 240)',
//               border: 'none',
//               outline: 'none',
//             }}
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm dark:text-white font-bold mb-2" htmlFor="expense">
//             Expense:
//           </label>
//           <input
//             // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             style={{
//               boxShadow: '5px 5px 10px #d4d4d4, -5px -5px 10px #ffffff',
//               borderRadius: '15px',
//               padding: '1em',
//               backgroundColor: 'rgb(240, 240, 240)',
//               border: 'none',
//               outline: 'none',
//             }}
//             type="text"
//             name="expense"
//             value={formData.expense}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="spent">
//             Spent:
//           </label>
//           <input
//             // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             style={{
//               boxShadow: '5px 5px 10px #d4d4d4, -5px -5px 10px #ffffff',
//               borderRadius: '15px',
//               padding: '1em',
//               backgroundColor: 'rgb(240, 240, 240)',
//               border: 'none',
//               outline: 'none',
//             }}
//             type="number"
//             name="spent"
//             value={formData.spent}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="recieved">
//             Received:
//           </label>
//           <input
//             // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             style={{
//               boxShadow: '5px 5px 10px #d4d4d4, -5px -5px 10px #ffffff',
//               borderRadius: '15px',
//               padding: '1em',
//               backgroundColor: 'rgb(240, 240, 240)',
//               border: 'none',
//               outline: 'none',
//             }}
//             type="number"
//             name="recieved"
//             value={formData.recieved}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             style={{
//               boxShadow: '5px 5px 10px #d4d4d4, -5px -5px 10px #ffffff',
//               borderRadius: '15px',
//               padding: '1em',
//               backgroundColor: 'rgb(240, 240, 240)',
//               border: 'none',
//               outline: 'none',
//             }}
//             type="submit"
//           >
//             Add Data
//           </button>
//         </div>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default PostComponent;

'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import Navbar from '../components/navbar';

const PostComponent = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    expense: '',
    spent: '',
    received: '',
  });

  const { theme } = useTheme(); // Use next-themes useTheme hook

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    let newValue;

    if (name === 'spent' || name === 'received') {
      newValue = parseInt(value, 10);
      newValue = newValue < 0 ? 0 : newValue;
    } else {
      newValue = value;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      // const res = await axios.post('http://localhost:3000/api/posts', formData);
      // const res = await axios.post('http://settlement-gold.vercel.app/api/posts', formData);
      // const res = await axios.post('http://nimble-kitten-31c037.netlify.app/api/posts', formData);
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(formData),
        // body: formData,
        // Headers, if needed:
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      } else {
        const data = await res.json();
        console.log('Data added successfully:', data);

        // Clear the form after successful submission
        setFormData({
          name: '',
          expense: '',
          spent: '',
          received: '',
        });
        router.push('/');
      }
    } catch (error) {
      console.error('Error while adding data:', error);
      // Display error message in UI or handle it as needed
    }
  };

  const inputStyles = {
    borderRadius: '15px',
    padding: '1em',
    backgroundColor: theme === 'dark' ? '' : 'rgb(240, 240, 240)',
    border: 'none',
    outline: 'none',
  };

  if (theme !== 'dark') {
    // Apply box-shadow for light mode
    //@ts-ignore
    inputStyles['boxShadow'] = '5px 5px 10px #d4d4d4, -5px -5px 10px #ffffff';
  }
  return (
    <>
    <Navbar/>
    <div className={`flex justify-center ${theme === 'dark' ? 'dark:bg-dark' : ''} items-center mt-8`}>
      <div className="max-w-md mx-auto ">
        <form onSubmit={handleSubmit} className={` ${theme === 'dark' ? '' : 'bg-gray-100'} border-4 border-gray-100 shadow-lg rounded px-8 pt-6 pb-6 mb-4`}>
          <div className="mb-4">
            <label className={`block ${theme === 'dark' ? 'dark:text-white' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="name">
              Name:
            </label>
            <input
              style={inputStyles}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className={`block ${theme === 'dark' ? 'dark:text-white' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="expense">
              Expense:
            </label>
            <input
              style={inputStyles}
              type="text"
              name="expense"
              value={formData.expense}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className={`block ${theme === 'dark' ? 'dark:text-white' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="spent">
              Spent:
            </label>
            <input
              style={inputStyles}
              type="number"
              name="spent"
              value={formData.spent}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className={`block ${theme === 'dark' ? 'dark:text-white' : 'text-gray-700'} text-sm font-bold mb-2`} htmlFor="received">
              Received:
            </label>
            <input
              style={inputStyles}
              type="number"
              name="received"
              value={formData.received}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`bg-gray-200 shadow-lg hover:bg-gray-300 text-black font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline`}
              type="submit"
            >
              Add Data
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default PostComponent;
