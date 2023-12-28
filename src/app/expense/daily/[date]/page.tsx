// "use client"

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Page = () => {
//   const [posts, setPosts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [showTaskModal, setTaskShowModal] = useState(false);
//   const [newPostData, setNewPostData] = useState({
//     name: '',
//     description: '',
//     spent: '',
//   });
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [updateData, setUpdateData] = useState({
//     name: '',
//     description: '',
//     spent: 0,
//   });

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/expense'); // Replace with your API endpoint
//       if (response.status === 200) {
//         setPosts(response.data);
//       } else {
//         console.error('Failed to fetch posts');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleCreatePost = async () => {
//     try {
//       // Perform data validation before sending
//       if (!newPostData.name || !newPostData.description || !newPostData.spent) {
//         console.error('Missing required fields');
//         return;
//       }

//       const response = await axios.post('http://localhost:3000/api/expense', newPostData)
//       if (response.status === 200) {
//         setShowModal(false);
//         setNewPostData({ name:"", description:"", spent:""});
//         fetchPosts();
//         console.log('Post added successfully!');
//         console.log(response);
//       } else {
//         console.error('Failed to create post');
//       }
//     } catch (error:any) {
//       if (error.response && error.response.data && error.response.data.err) {
//         console.error('Validation error:', error.response.data.err.message);
//       } else {
//         console.error('Error:', error);
//       }
//     }
//   };

//   const openModal = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };


//   const handleDelete = async (postId:any) => {
//     try {
//       const response = await axios.delete(`http://localhost:3000/api/expense/${postId}`);
//       if (response.status === 200) {
//         fetchPosts();
//         console.log('Post deleted successfully!');
//       } else {
//         console.error('Failed to delete post');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleUpdate = (postId:any, postData:any) => {
//     setSelectedPost(postId);
//     setUpdateData({
//       name: postData.name,
//       description: postData.description,
//       spent: postData.spent,
//     });
//     setTaskShowModal(true);
//   };

//   const handleUpdatePost = async () => {
//     try {
//       const response = await axios.patch(`http://localhost:3000/api/expense/${selectedPost}`, updateData);
//       if (response.status === 200) {
//         fetchPosts();
//         setTaskShowModal(false);
//         console.log('Post updated successfully!');
//       } else {
//         console.error('Failed to update post');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="mt-5 m-5">
//       <button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         onClick={openModal}
//       >
//         Create New
//       </button>

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
//           <div className="bg-white p-8 rounded">
//             <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
//             <input
//               type="text"
//               placeholder="Name"
//               name='name'
//               value={newPostData.name}
//               onChange={(e) => setNewPostData({ ...newPostData, name: e.target.value })}
//               className="border border-gray-300 rounded-md mb-4 p-2"
//             />
//             <input
//               type='text'
//               placeholder="Description"
//               name='description'
//               value={newPostData.description}
//               onChange={(e) => setNewPostData({ ...newPostData, description: e.target.value })}
//               className="border border-gray-300 rounded-md mb-4 p-2"
//             />
//             <input
//               type="number"
//               placeholder="Spent"
//               name='spent'
//               value={newPostData.spent}
//               onChange={(e) => setNewPostData({ ...newPostData, spent: e.target.value })}
//               className="border border-gray-300 rounded-md mb-4 p-2"
//             />
//             <button
//               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//               onClick={handleCreatePost}
//             >
//               Post
//             </button>
//             <button
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
//               onClick={closeModal}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {showTaskModal && selectedPost && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
//           <div className="bg-white p-8 rounded">
//             <h2 className="text-xl font-semibold mb-4">Update Post</h2>
//             <input
//               type="text"
//               placeholder="Name"
//               value={updateData.name}
//               onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
//               className="border border-gray-300 rounded-md mb-4 p-2"
//             />
//             <input
//               type="text"
//               placeholder="Description"
//               value={updateData.description}
//               onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
//               className="border border-gray-300 rounded-md mb-4 p-2"
//             />
//             <input
//               type="number"
//               placeholder="Spent"
//               value={updateData.spent}
//               onChange={(e) => setUpdateData({ ...updateData, spent: Number(e.target.value) })}
//               className="border border-gray-300 rounded-md mb-4 p-2"
//             />
//             <button
//               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//               onClick={handleUpdatePost}
//             >
//               Update
//             </button>
//             <button
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
//               onClick={() => setTaskShowModal(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
//         {posts.map((post:any) => (
//           <div key={post.id} className="bg-gray-200 rounded p-4">
//             <h3 className="text-xl font-semibold">{post.name}</h3>
//             <p className="text-gray-600">{post.description}</p>
//             <p className="text-blue-600">{post.spent}</p>
//             <div className="flex justify-between mt-4">
//               <button
//                 className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={() => handleDelete(post.id)}
//               >
//                 Delete
//               </button>
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 onClick={() => handleUpdate(post.id, post)}
//               >
//                 Update
//               </button>
//           </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Page;

'use client'
import React, { useState,useEffect } from 'react';
// import { useRouter } from 'next/router';

import axios from 'axios';

const PostComponent = () => {

  const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showTaskModal, setTaskShowModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [updateData, setUpdateData] = useState({
      name: '',
      description: '',
      spent: 0,
    });
  const [formData, setFormData] = useState({
    name: '',
    description:'',
    spent:'',
  });

  
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  const handleDelete = async (postId:any) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/expense/${postId}`);
      if (response.status === 200) {
        fetchPosts();
        console.log('Post deleted successfully!');
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = (postId:any, postData:any) => {
    setSelectedPost(postId);
    setUpdateData({
      name: postData.name,
      description: postData.description,
      spent: postData.spent,
    });
    setTaskShowModal(true);
  };

  const handleUpdatePost = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/expense/${selectedPost}`, updateData);
      if (response.status === 200) {
        fetchPosts();
        setTaskShowModal(false);
        console.log('Post updated successfully!');
      } else {
        console.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    // const newValue = name === 'spent' || name === 'recieved' ? parseInt(value, 10) : value;
    let newValue;

    if (name === 'spent') {
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

  const formatDate = (timestamp:any) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); 
  };
   
  const fetchPosts = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/expense'); // Replace with your API endpoint
          if (response.status === 200) {
            setPosts(response.data);
          } else {
            console.error('Failed to fetch posts');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      useEffect(() => {
        fetchPosts();
      }, []);
    
  
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    

    try {
      const res = await axios.post('http://localhost:3000/api/expense', formData);

      if (!res.data) {
        throw new Error('Failed to add data');
      } else {
        console.log('Data added successfully:', res.data);

        // Clear the form after successful submission
        setFormData({
          name: '',
          description: '',
          spent:'',
        });
        setShowModal(false)
        // router.push('/');
        // redirect('/')
        
      }
    } catch (error) {
      console.error('Error while adding data:', error);
      // Display error message in UI or handle it as needed
    }
  };
  return (
        <div className="mt-5 m-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={openModal}
          >
            Create New
          </button>
    
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
              <div className="bg-white p-8 rounded">
                <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
                <input
                  type="text"
                  placeholder="Name"
                  name='name'
                  value={formData.name}
                  // onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md mb-4 p-2"
                />
                <input
                  type='text'
                  placeholder="Description"
                  name='description'
                  value={formData.description}
                  // onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md mb-4 p-2"
                />
                <input
                  type="number"
                  placeholder="Spent"
                  name='spent'
                  value={formData.spent}
                  // onChange={(e) => setFormData({ ...formData, spent: e.target.value })}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md mb-4 p-2"
                />
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSubmit}
                >
                  Post
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
    
          {showTaskModal && selectedPost && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
              <div className="bg-white p-8 rounded">
                <h2 className="text-xl font-semibold mb-4">Update Post</h2>
                <input
                  type="text"
                  placeholder="Name"
                  value={updateData.name}
                  onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                  className="border border-gray-300 rounded-md mb-4 p-2"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={updateData.description}
                  onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
                  className="border border-gray-300 rounded-md mb-4 p-2"
                />
                <input
                  type="number"
                  placeholder="Spent"
                  value={updateData.spent}
                  onChange={(e) => setUpdateData({ ...updateData, spent: Number(e.target.value) })}
                  className="border border-gray-300 rounded-md mb-4 p-2"
                />
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleUpdatePost}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={() => setTaskShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
    
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {posts.map((post:any) => (
              <div key={post.id} className="bg-gray-200 rounded p-4">
                <h3 className="text-xl font-semibold">{post.name}</h3>
                <p className="text-gray-600">{post.description}</p>
                <>Money spent At: <span className="text-blue-600">{post.spent}</span></>
                <p>created At: {formatDate(post.createdAt)}</p>
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleUpdate(post.id, post)}
                  >
                    Update
                  </button>
              </div>
              </div>
            ))}
          </div>
        </div>
      );


  // return (
  //   <div className="flex justify-center  dark:bg-dark bg-gray-200 items-center h-screen">
  //   <div className="max-w-md mx-auto ">
  //     <form onSubmit={handleSubmit} className="bg-white dark:bg-medium  shadow-md rounded px-8 pt-6 pb-6 mb-4">
  //       <div className="mb-4">
  //         <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="name">
  //           Name:
  //         </label>
  //         <input
  //           className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  //           type="text"
  //           name="name"
  //           value={formData.name}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>
  //       <div className="mb-4">
  //         <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="name">
  //           Description:
  //         </label>
  //         <input
  //           className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  //           type="text"
  //           name="description"
  //           value={formData.description}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>
  //       <div className="mb-4">
  //         <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="spent">
  //           Spent:
  //         </label>
  //         <input
  //           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  //           type="number"
  //           name="spent"
  //           value={formData.spent}
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>
  //       <div className="flex items-center justify-between">
  //         <button
  //           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  //           type="submit"
  //         >
  //           Add Data
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  //   </div>
  // );
};

export default PostComponent;
