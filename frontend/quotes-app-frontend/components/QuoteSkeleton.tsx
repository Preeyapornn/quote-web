import React from "react";

const QuoteSkeleton: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>

      <div className="h-3 bg-gray-200 rounded w-1/2"></div>

      <div className="h-5 w-20 bg-gray-200 rounded-full mt-3"></div>
    </div>
  );
};

export default QuoteSkeleton;
