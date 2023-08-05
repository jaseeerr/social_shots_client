import React, { useEffect, useState } from 'react';
import SideBar from './sideBar';

const Test = ({ images }) => {



 
  return (



<>
<div className='flex'>
  <SideBar/>

  <div className="bg-black text-white w-full">
      <header className="bg-black py-4 px-8 shadow-md">
        {/* Navbar and logo */}
        <nav className="flex justify-between items-center">
          {/* Navbar content goes here */}
        </nav>
      </header>
      <main className="container mx-auto my-4">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
         
          {/* <div className="p-4 bg-black rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Follow Requests</h2>
            <ul>
         
              <li className="border-b py-2">User 1 wants to follow you</li>
              <li className="border-b py-2">User 2 wants to follow you</li>
              <li className="border-b py-2">User 3 wants to follow you</li>
            </ul>
          </div> */}

          <div className="p-4 bg-black rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <ul>
              {/* List of notifications goes here */}
              <li className="border-b py-2">Notification 1</li>
              <li className="border-b py-2">Notification 2</li>
              <li className="border-b py-2">Notification 3</li>
            </ul>
          </div>
        </section>
      </main>
      <footer className="bg-gray-700 py-4 text-white">
        {/* Footer content goes here */}
      </footer>
    </div>

</div>
</>



  );
};

export default Test;
