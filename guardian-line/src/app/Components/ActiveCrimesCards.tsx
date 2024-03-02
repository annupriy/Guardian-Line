import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MapPinIcon } from "@heroicons/react/24/outline";
type IncidentLocation = {
  latitude: number;
  longitude: number;
  address: string;
};

type ActiveCrimesCardsProps = {
  descriptionOfIncident: string;
  incidentLocation: IncidentLocation;
  personalInformation: string;
  timeOfIncident: string;
  userName: string;
  reportid: string;
  typeOfIncident: string;
  distance: string;
};

const ActiveCrimesCards: React.FC<ActiveCrimesCardsProps> = ({
  typeOfIncident,
  distance,
  descriptionOfIncident,
  incidentLocation,
  personalInformation,
  timeOfIncident,
  userName,
  reportid,
}) => {
  const [showButtons1, setShowButtons1] = useState(true);
  const [showButtons2, setShowButtons2] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const [showThanksMessage, setShowThanksMessage] = useState(false);

  const handleGoingToValidate = () => {
    setShowButtons2(true);
    setShowButtons1(false);
    handleReportClick();
  };

  const handleSkip = () => {
    setShowCard(false);
    removeCrimeReport();
  };

  const handleDone = () => {
    setShowCard(false);
    setShowThanksMessage(true);
  };

  const handleReportClick = () => {
    // Hide the message after 5 seconds
    setTimeout(() => {
      setShowThanksMessage(false);
    }, 5000);
  };

  const removeCrimeReport = async () => {
    // Remove the object from ActiveCrimes from ActiveVolunteers Collection
    const res = await fetch("/api/volunteersLocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        removeReport: true,
        reportid: reportid,
        vote: 0,
      }),
    });
    if (!res) {
      toast.dismiss();
      toast.error("Error");
    } else if (res.status === 200) {
      toast.dismiss();
      console.log("Deleted");
    } else {
      toast.dismiss();
      if (res.status === 401) {
        toast.error("Error skipping report. Please try again.");
      } else {
        toast.error("Could not skip report");
      }
    }
  };

  const handleVoteYes = async () => {
    // Remove the object from ActiveCrimes from ActiveVolunteers Collection
    const res = await fetch("/api/volunteersLocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vote: 1,
        removeReport: true,
        reportid: reportid,
      }),
    });
    if (!res) {
      toast.dismiss();
      toast.error("Error");
    } else if (res.status === 200) {
      toast.dismiss();
      console.log("Deleted");
    } else {
      toast.dismiss();
      if (res.status === 401) {
        toast.error("Error validating report. Please try again.");
      } else {
        toast.error("Could not validate");
      }
    }
  };

  const handleVoteNo = async () => {
    // Remove the object from ActiveCrimes from ActiveVolunteers Collection
    const res = await fetch("/api/volunteersLocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vote: -1,
        removeReport: true,
        reportid: reportid,
      }),
    });
    if (!res) {
      toast.dismiss();
      toast.error("Error");
    } else if (res.status === 200) {
      toast.dismiss();
      console.log("Deleted");
    } else {
      toast.dismiss();
      if (res.status === 401) {
        toast.error("Error validating report. Please try again.");
      } else {
        toast.error("Could not validate");
      }
    }
  };

  const latitude = incidentLocation.latitude;
  const longitude = incidentLocation.longitude;
  const address = incidentLocation.address;

  return (
    <>
      {showCard && (
        <div className="card w-96 bg-[#990011] text-neutral-content self-start threedbox">
          <div className="card-body flex-nowrap">
            <div className="card-actions justify-between flex-nowrap items-center ">
              <div className="card-title text-2xl">{typeOfIncident}</div>
              {/* show distance upto 2 decimal digits only */}
              <div className="card-title text-xl">
                {parseFloat(distance).toFixed(2)}
                {" km"}
                <MapPinIcon className="w-6 rounded-full overflow-hidden border-cyan-900"></MapPinIcon>
              </div>
            </div>
            <div className="items-start">
              <div className="italic">Description: {descriptionOfIncident}</div>
            </div>
            <div className="collapse collapse-arrow">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium flex justify-between ">
                Address
                <div className="card-title text-sm">Time: {timeOfIncident}</div>
              </div>
              <div className="collapse-content border-transparent bg-[#e7c8c2] text-black rounded-xl ">
                <p className="mt-3">{address}</p>
                <h5 className="mt-2">Latitude: {latitude}</h5>
                <h5 className="">Longitude: {longitude}</h5>
              </div>
            </div>
            {personalInformation && personalInformation!=="" && (
              <div className="mb-3">
                <p>Personal Information: {personalInformation}</p>
              </div>
            )}
            {showButtons1 && (
              <div className="card-actions justify-between flex-nowrap">
                <button
                  className="btn btn-primary"
                  onClick={handleGoingToValidate}
                >
                  Going to validate or help?
                </button>
                <button className="btn btn-ghost" onClick={handleSkip}>
                  Skip this one
                </button>
              </div>
            )}
            {showButtons2 && (
              <div className="card-actions justify-evenly flex-nowrap">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleDone();
                    handleVoteYes();
                  }}
                >
                  True Report
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    handleDone();
                    handleVoteNo();
                  }}
                >
                  False Report
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {showThanksMessage && (
        <p className="text-green-600 mt-4">Thanks for helping us validate!</p>
      )}
    </>
  );
};

export default ActiveCrimesCards;
