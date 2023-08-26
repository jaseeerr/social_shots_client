import React from 'react';

const OutGoingCall = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-8 w-96 md:max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Incoming Call</h1>
        <div className="flex flex-col md:flex-row items-center justify-center md:items-start">
          <img
            src="https://st.zippyshareme.com/cache/plugins/filepreviewer/4831/1e7f363caff4a1c5fbfa265ebd0b170ffa65f1577521a70f1fa4ba81538b73b8/1100x800_cropped.jpg"
            alt="Caller Avatar"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 md:mb-0 md:mr-4"
          />
          <div>
            <p className="font-semibold">John Doe</p>
            <p className="text-gray-600">Incoming video call...</p>
          </div>
        </div>
        <div className="flex justify-center mt-4 md:mt-6">
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mr-4">
            Answer
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutGoingCall;
