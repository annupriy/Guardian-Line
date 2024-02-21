// //   return (
// //     <div className="h-full w-full bg-gradient-to-b from-red-50 to-blue-50 flex flex-col justify-center align-middle">
// //       <div className="text-2xl flex justify-center mr-24 text-red-600">
// //         Oops! You are not registered as a volunteer :(
// //       </div>
// //       <div className="flex justify-center mr-24">
// //         <Player
// //           autoplay b
// //           loop
// //           src="./Animation-Volunteer.json"
// //           className="h-60 w-60"
// //           style={{ marginLeft: "4px", marginTop: "-2px" }}
// //         />
// //       </div>
// //       <div className="form-control mt-4 "> div3
// //         <label className="label cursor-pointer justify-center mr-24">
// //           <span className="label-text text-xl font-semibold">
// //             Register yourself as a volunteer
// //           </span>
// //           <input
// //             type="checkbox"
// //             className="toggle toggle-success ml-2"
// //             checked={isChecked}
// //             onChange={handleToggleChange}
// //           />
// //         </label>
// //       </div>
// //     </div>
// //   );
// // };

"use client";
import React, { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const Unregistered = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isReadyToVolunteer, setIsReadyToVolunteer] = useState(false);

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
    handleVolunteerRegistration();
  };

  const handleVolunteerRegistration = async () => {
    console.log("registering volunteer")
    // write code to POST volunteer registration to server
    const res = await fetch("http://localhost:3000/api/volunteers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: "annu",
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  const handleYesClick = () => {
    setIsReadyToVolunteer(true);
  };

  const handleNoClick = () => {
    setIsReadyToVolunteer(false);
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-red-50 to-blue-50 flex flex-col justify-center items-center">
      <div className="text-center">
        {isChecked ? (
          isReadyToVolunteer ? (
            <div className="text-green-600 text-3xl mb-8">
              Reports filed near you
            </div>
          ) : (
            <div>
              <div className="text-3xl mb-4">Ready to help?</div>
              <div className="mb-8">
                <button onClick={handleYesClick} className="btn mr-2">
                  Yes
                </button>
                <button onClick={handleNoClick} className="btn">
                  No
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="text-3xl mb-4 text-red-600">
            Oops! You are not registered as a volunteer :(
          </div>
        )}
      </div>
      {!isChecked && (
        <div className="flex justify-center">
          <Player
            autoplay
            loop
            src="./Animation-Volunteer.json"
            className="h-60 w-60"
            style={{ marginLeft: "4px", marginTop: "-2px" }}
          />
        </div>
      )}
      {!isChecked && (
        <div className="form-control mt-4">
          <label className="label cursor-pointer">
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
      )}
    </div>
  );
};

// export default Unregistered;
export default Unregistered;
function useNavigation() {
  throw new Error("Function not implemented.");
}
