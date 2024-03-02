"use client"
import React, {useContext} from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import ContactUsInfo from './contactForBanned';

const Page = () => {
  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 font-bold" style={{ marginTop: '50px'}}>
      <div className="text-center">
        <div className="text-3xl text-red-600 mb-4 " style={{textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'}}>
          <FaExclamationCircle className="inline-block mr-2" />
          Uh oh, you&apos;re unable to use the platform!
        </div>
        <p className="text-gray-700 mb-6">
          We&apos;ve received reports of you providing false information.
        </p>
        <p className="text-gray-700 mb-6">
          Don&apos;t worry! If you believe this is a mistake, please let us know.
        </p>
        <p>
        If you believe you haven&apos;t falsely reported anything, please feel free to contact us.
        </p>
        < ContactUsInfo/ >
      </div>
    </div>
  );
};

export default Page;
