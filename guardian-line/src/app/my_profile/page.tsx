'use client'
import React from "react";

async function getUserName() {
    return 'annu'
    // write code to POST username from server
    // GET username code will be in login page
    
}
const page = () => {
    // const [userName, setUserName] = useState("user");
  return (
    <>
      <div className="mt-8 flex flex-col justify-center items-center">
        <p className="text-green-800 text-3xl">My Profile</p>
        <div className="text-xl mt-4">{getUserName()}</div>
        <p className="text-green-800 text-3xl mt-8">Settings</p>
        <button className="text-xl mt-4 btn">Change Password</button>
      </div>
    </>
  );
};

export default page;
function useState(arg0: string): [any, any] {
    throw new Error("Function not implemented.");
}

