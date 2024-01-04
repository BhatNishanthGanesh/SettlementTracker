'use client'
import React, { useState,useEffect } from 'react';
import { useRouter,useSearchParams } from 'next/navigation';

import axios from 'axios';

const PostComponent = () => {
  
  //  const router=useRouter()
  //  const [searchParams = new URLSearchParams()] = useSearchParams();
  //  console.log(searchParams);
   
  // const dateParam: string | null = searchParams.has('date');

  // Use dateParam in your component logic
  // console.log('Date parameter:', dateParam);
   
  //  const query = router;
  //  const date  = query;

  
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
        // @ts-ignore
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
        //@ts-ignore
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

  // const formatDate = (timestamp:any) => {
  //   const date = new Date(timestamp);
  //   return date.toISOString().slice(0, 10); // YYYY-MM-DD
  // };
  
  const formatDate = (timestamp:any) => {
    const date = new Date(timestamp);
    return date.toISOString().slice(0, 10); // YYYY-MM-DD
  };


//   const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

//   console.log('Current URL:', currentUrl);
//   const parts = currentUrl.split('/');
// const date2 = parts[parts.length - 1]; // Extracts the last part of the URL

// console.log('Extracted Date:', date2);
   
  // const fetchPosts = async (date2:string) => {
  //   console.log(date2);
  //       try {
  //         const response = await axios.get(`http://localhost:3000/api/expense/day/${date2}`); // Replace with your API endpoint
  //         console.log(response);
          
  //         if (response.status === 200) {
  //           setPosts(response.data);
  //         } else {
  //           console.error('Failed to fetch posts');
  //         }
  //       } catch (error) {
  //         console.error('Error:', error);
  //       }
  //       console.log('end',date2)
  //       const res=await axios.get(`http://localhost:3000/api/expense/day/${date2}`);
  //       console.log(res.data,'fff')
  //     };

  const fetchPosts = async (date2: string) => {
    console.log('Fetching posts for date:', date2);
    try {
      const response = await axios.get(`http://localhost:3000/api/expense/day/${date2}`);
      console.log('Response:', response);
      if (response.status === 200) {
        setPosts(response.data);
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  
  useEffect(() => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const parts = currentUrl.split('/');
    const date2 = parts[parts.length - 1]; // Extracts the last part of the URL
  
    const formattedDate = date2 ? formatDate(date2) : formatDate(new Date());
    fetchPosts(formattedDate);
  }, []); // Empty dependency array ensures this effect runs only once on mount
  

      // useEffect(() => {
      //   const { date } = searchParams;
        
      //   console.log(date+"searchParams");
      //   const formattedDate = date ? formatDate(date) : formatDate(new Date());
      //   fetchPosts(formattedDate);
      // }, [searchParams]);
    


      // useEffect(() => {
      //   // @ts-ignore
      //   fetchPosts();
      // }, []);
      // useEffect(() => {
      //   if (!router) return; // Handle case where router is not yet available
      //   const { query } = router as any;
      //   const date = query?.date || formatDate(Date);
      //   fetchPosts(date);
      // }, [router]);
        
      //   const fetchPosts = async () => {
      //     const { date } = router.query; // Destructure the query object to get 'date'
          
      //     if (date) {
      //       try {
      //         const response = await axios.get(`http://localhost:3000/api/expense?date=${date}`);
      //         if (response.status === 200) {
      //           const filteredPosts = response.data.filter((post:any) => {
      //             const createdAtDate = new Date(post.createdAt).toLocaleDateString();
      //             console.log(createdAtDate);
                  
      //             return createdAtDate === date; // Check if post's date matches the URL date
      //           });
      //           setPosts(filteredPosts);
      //         } else {
      //           console.error('Failed to fetch posts');
      //         }
      //       } catch (error) {
      //         console.error('Error:', error);
      //       }
      //     }
      //   };
        
      
    
  
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
                <p className="text-gray-600">Desc: {post.description}</p>
                <p>Money spent: <span className="text-blue-600">{post.spent}</span></p>
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
};

export default PostComponent;
