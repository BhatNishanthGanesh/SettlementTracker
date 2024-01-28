'use client'
import React, { useState,useEffect } from 'react';
// import { useRouter,useSearchParams } from 'next/navigation';
// import Image from 'next/image';

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
  const [loading, setLoading] = useState(true);


  
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
    return date.toISOString().slice(0, 10); // YYYY-MM-DD
  };

  const fetchPosts = async (date2: string) => {
    setLoading(true);
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
    }finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const parts = currentUrl.split('/');
    const date2 = parts[parts.length - 1]; 
  
    const formattedDate = date2 ? formatDate(date2) : formatDate(new Date());
    const fetchPostsTimeout = setTimeout(() => {
      fetchPosts(formattedDate);
    }, 2000);

    return () => clearTimeout(fetchPostsTimeout);
  }, []); 


  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      // const res = await axios.post('http://localhost:3000/api/expense', formData);
      const res = await axios.post('http://settlement-tracker.vercel.app/api/expense', formData);

      if (!res.data) {
        throw new Error('Failed to add data');
      } else {
        console.log('Data added successfully:', res.data);
        setFormData({
          name: '',
          description: '',
          spent:'',
        });
        setShowModal(false)
        
      }
    } catch (error) {
      console.error('Error while adding data:', error);
    }
  };
  return (
        <div className="mt-5 m-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
            onClick={openModal}
          >
            Create New
          </button>
         
          {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
    <div className="bg-white p-8 rounded flex flex-row items-center justify-center">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-md mb-4 p-2"
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 rounded-md mb-4 p-2"
        />
        <input
          type="number"
          placeholder="Spent"
          name="spent"
          value={formData.spent}
          onChange={handleChange}
          className="border border-gray-300 rounded-md mb-4 p-2"
        />
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 rounded"
          onClick={handleSubmit}
        >
          Post
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
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
          {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div role="status">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
        </div>
      ) : !showModal && !showTaskModal && !selectedPost && posts.length === 0 && (
        <div className="inset-0 flex items-center justify-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkV56OWHUdTTTdYWQPszPUrp50xSQW6cUDFg&usqp=CAU"
            height={250}
            width={250}
            className='rounded p-2'
            alt="no"
          />
        </div>
      )}
        </div>
      );
};

export default PostComponent;
