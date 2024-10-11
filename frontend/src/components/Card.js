import React from 'react'

const  Card=({ text, number })=> {
    return (
        <div className="p-6 bg-white rounded-xl shadow-md space-y-4 max-w-full sm:max-w-md lg:max-w-lg">
        <div className="text-sm font-medium text-black">{text}</div>
        <p className="text-gray-500 font-medium ">{number}</p>
      </div>
      );
  
}

export default Card