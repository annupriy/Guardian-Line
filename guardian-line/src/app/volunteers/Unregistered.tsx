"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const Unregistered = () => {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const handleToggleChange = () => {
    if (!isChecked) { // Check if it's not checked before navigating
      router.push('/volunteers/registered');
    }
    setIsChecked(!isChecked);
  };
  return (
    <div className="h-full w-full bg-gradient-to-b from-red-50 to-blue-50 flex flex-col justify-center align-middle">
      <div className="text-2xl flex justify-center mr-24 text-red-600">
        Oops! You are not registered as a volunteer :(
      </div>
      <div className="flex justify-center mr-24">
        <Player
          autoplay
          loop
          src="./Animation-Volunteer.json"
          className="h-60 w-60"
          style={{ marginLeft: "4px", marginTop: "-2px" }}
        />
      </div>
      <div className="form-control mt-4 ">
        <label className="label cursor-pointer justify-center mr-24">
          <span className="label-text text-xl font-semibold">
            Register yourself as a volunteer
          </span>
          <input
            type="checkbox"
            className="toggle toggle-success ml-2"
            checked={isChecked}
            onChange={handleToggleChange}
          />
        </label>
      </div>
    </div>
  );
};

export default Unregistered;
function useNavigation() {
  throw new Error("Function not implemented.");
}

