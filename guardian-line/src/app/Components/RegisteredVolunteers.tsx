'use client';
import React from "react";
import { useState } from "react";
const RegisteredVolunteers = () => {
  const [isReadyToVolunteer, setIsReadyToVolunteer] = useState(false);
  const handleYesClick = () => {
    setIsReadyToVolunteer(true);
  };

  const handleNoClick = () => {
    setIsReadyToVolunteer(false);
  };
  return (
    <div className="text-center">
      {isReadyToVolunteer ? (
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
      )}
    </div>
  );
};

export default RegisteredVolunteers;
