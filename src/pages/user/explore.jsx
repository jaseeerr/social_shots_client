import React, { useState, useEffect, useRef } from 'react';
import SideBar from '../../components/user/sideBar';
import MyAxiosInstance from '../../utils/axios';
import { IMG_CDN, VIDEO_CDN } from '../../config/urls';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Explore = () => {
  const axiosInstance = MyAxiosInstance();
  const goto = useNavigate();

  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchInputRef = useRef(null);

  useEffect(() => {
    if(!localStorage.getItem('userToken'))
    {
      goto('/login')
    }
    searchInputRef.current.focus();

    axiosInstance.get('allPosts').then((response) => {
      setPosts(response.data);
    });
  }, []);

  const performSearch = () => {
    setIsLoading(true);
    axiosInstance.get(`search?query=${searchTerm}`).then((response) => {
      setSearchResults(response.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (searchTerm) {
      // Delay the search execution for better UX
      const timeoutId = setTimeout(performSearch, 300);

      // Cleanup function to clear the timeout
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const view = (id) => {
    goto(`/viewPost/${id}`);
  };



  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-2xl font-bold">Feed</h1>
          </div>
          <div className="flex justify-center mb-4">
            <input
              ref={searchInputRef}
              value={searchTerm}
              onChange={handleInputChange}
              type="text"
              className="border border-gray-700 rounded px-4 py-2 bg-gray-800 text-white font-semibold z-50"
              placeholder="Search"
            />
          </div>
          {searchResults && searchTerm && (
            <div className="mt-4">
              {isLoading ? (
                <div className="text-center">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Loading spinner SVG */}
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-900 rounded-lg max-h-52 overflow-y-auto">
                  {searchResults.length === 0 ? (
                    <div className="rounded p-4 mb-2 text-center text-white">Not found</div>
                  ) : (
                    searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="rounded p-4 mb-2 text-center"
                      >
                        <span className='flex justify-center text-white '>
                        <img src={IMG_CDN+result.dp} alt="" className='w-8 h-8 rounded-full text-center mr-3 mb-2 object-cover' />
                        <Link to={`/${result.username}`} >
                          {result.username}
                        </Link>
                        </span>
                       
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
          <div className="grid grid-cols-3 gap-1 lg:px-28">
            {posts.map((post, index) => (
              <div
                key={index}
                onClick={() => view(post._id)}
                className="bg-white rounded"
              >

                {post.postType=="img" ?
                <img
                src={IMG_CDN + post.picture}
                alt={`Post ${index + 1}`}
                className="hover:opacity-80"
              />
              :
              (
                <div className="relative w-full h-full cursor-pointer hover:opacity-80">
                <video
                  src={VIDEO_CDN + post.picture}
                  type="video/mp4"
                  className="w-full h-full object-cover "
                  loop
                  muted
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 flex items-center justify-center">
                 
                </div>
              </div>
              )
            //   <video  className='w-full object-fill hover:opacity-80  mb-4 h-full'>
            //   <source src={VIDEO_CDN+post.picture} type="video/mp4" className="" />
            //   Your browser does not support the video tag.
            // </video>
            
                }
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
