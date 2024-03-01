import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
type IncidentLocation = {
  latitude: number;
  longitude: number;
};

type ActiveCrimesCardsProps = {
  descriptionOfIncident: string;
  incidentLocation: IncidentLocation;
  personalInformation: string;
  timeOfIncident: string;
  userName: string;
  reportid: string;
};

const ActiveCrimesCards: React.FC<ActiveCrimesCardsProps> = ({
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
    const res = await fetch("http://localhost:3000/api/volunteersLocation", {
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
    const res = await fetch("http://localhost:3000/api/volunteersLocation", {
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
    const res = await fetch("http://localhost:3000/api/volunteersLocation", {
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

  return (
    <>
      {showCard && (
        <div className="card w-96 bg-amber-900 text-neutral-content">
          <div className="card-body text-center flex-nowrap">
            <div className="card-actions justify-between flex-nowrap items-center ">
              <div className="card-title text-2xl">{descriptionOfIncident}</div>
              <div className="flex-col">
                <h5 className="">Latitude: {latitude}</h5>
                <h5 className="">Longitude: {longitude}</h5>
                <h5 className="">{timeOfIncident}</h5>
              </div>
            </div>
            <p>{personalInformation}</p>
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
