import React from 'react';

const ReportsFiled = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="max-w-xl bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <h2 className="text-2xl font-bold mb-2">Date</h2>
              <p className="text-gray-700">Description of the report</p>
            </div>
            <div className="px-6 py-4 flex justify-end">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Full Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsFiled;
