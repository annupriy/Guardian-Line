"use client"
import React, {useContext} from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import ContactForBanned from './contactForBanned';

const Page = () => {
  return (
    <div className="flex flex-col items-center h-full bg-gray-100 font-bold">
      <div className="text-center mt-12">
        <div className="text-4xl text-red-600 mb-6 " style={{textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'}}>
          <FaExclamationCircle className="inline-block mr-2" />
          Uh oh, you&apos;re unable to use the platform!
        </div>
        <p className="text-gray-700 mb-2 text-lg">
          We&apos;ve received reports of you providing false information.
        </p>
        <p className="text-gray-700 mb-2 text-lg">
          Don&apos;t worry! If you believe this is a mistake and you haven&apos;t falsely reported anything, please feel free to contact us.
        </p>
      </div>
        < ContactForBanned/ >
    </div>
  );
};

export default Page;
