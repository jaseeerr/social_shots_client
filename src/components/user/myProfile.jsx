import React from 'react';

const ProfilePage = () => {
  return (
    <div className="bg-gray-800 text-white min-h-screen">
     

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex">
          {/* Profile Picture */}
          <div className="w-1/4">
            <img
              src="https://i1.sndcdn.com/avatars-000252187355-42nbzf-t500x500.jpg"
              alt="Profile Picture"
              className="rounded-full w-40 h-40 object-cover"
            />
          </div>

          {/* User Info */}
          <div className="w-3/4 pl-10">
            <div className="flex items-center">
              <h2 className="text-2xl font-semibold">John Doe</h2>
              <button className="ml-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-sm">
                Edit Profile
              </button>
             
            </div>
            <div className="mt-2">
              <span className="text-gray-500 mr-3">100 posts</span>
              <span className="text-gray-500 mr-3">200 followers</span>
              <span className="text-gray-500">300 following</span>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Bio:</h3>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                vel semper augue. Sed eleifend dui non felis laoreet, in
                scelerisque arcu sollicitudin.
              </p>
            </div>
          </div>
        </div>

        

        {/* Photos */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Photos</h3>
          <div className="grid grid-cols-3 gap-4">
          <img
              src="https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg"
              alt="Photo 1"
              className="w-full h-60 object-cover rounded-lg"
            />
           <img
              src="https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg"
              alt="Photo 1"
              className="w-full h-60 object-cover rounded-lg"
            />
             <img
              src="https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg"
              alt="Photo 1"
              className="w-full h-60 object-cover rounded-lg"
            />
             <img
              src="https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg"
              alt="Photo 1"
              className="w-full h-60 object-cover rounded-lg"
            />
             <img
              src="https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg"
              alt="Photo 1"
              className="w-full h-60 object-cover rounded-lg"
            />
             <img
              src="https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg"
              alt="Photo 1"
              className="w-full h-60 object-cover rounded-lg"
            />
             <img
              src="https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg"
              alt="Photo 1"
              className="w-full h-60 object-cover rounded-lg"
            />
             <img
              src="https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg"
              alt="Photo 1"
              className="w-full h-60 object-cover rounded-lg"
            />
             <img
              src="https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg"
              alt="Photo 1"
              className="w-full h-60 object-cover rounded-lg"
            />
             <img
              src="https://c1.wallpaperflare.com/preview/968/514/572/head-man-figure-art.jpg"
              alt="Photo 1"
              className="w-full h-60 object-cover rounded-lg"
            />
            {/* Add more photos here */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
