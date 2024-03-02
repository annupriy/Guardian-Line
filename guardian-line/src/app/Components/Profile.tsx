// "use client";
// import { User } from "@/types/user";
// import React from "react";

// type UserName = {
//   username: string;
// };
// const Profile: React.FC<UserName> = ({ username }) => {
//   return (
//     <>
//       <div className="mt-8 flex flex-col justify-center items-center">
//         <p className="text-green-800 text-3xl">My Profile</p>
//         <div className="text-xl mt-4">{username}</div>
//         <p className="text-green-800 text-3xl mt-8">Settings</p>
//         <button className="text-xl mt-4 btn">Change Password</button>
//       </div>
//     </>
//   );
// };

// export default Profile;

"use client";
import { User } from "@/types/user";
import React from "react";

type UserName = {
  username: string;
};

const Profile: React.FC<UserName> = ({ username }) => {
  return (
    <div className="container mx-auto px-4 mt-8 " style={{textAlign: 'center', padding: '40px 20px', borderRadius: '20px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)', backgroundColor: '#f9f9f9', width: '50%', margin: '175px auto'}}>
      <div className="max-w-lg mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="p-6">
          <h2 className="text-3xl font-semibold text-green-800 mb-4">My Profile</h2>
          <div className="text-xl font-medium text-gray-800">{username}</div>
        </div>
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-3xl font-semibold text-green-800 mb-4">Settings</h2>
          <button className="block w-full py-3 px-6 text-lg bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300">Change Password</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

