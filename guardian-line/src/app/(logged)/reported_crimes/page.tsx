"use client";

import React, { useEffect, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";

type Report = {
  userName: string;
  descriptionOfIncident: string;
  dateOfIncident: string;
  timeOfIncident: string;
  city: string;
  state: string;
  pincode: string;
  incidentLocation: string;
  typeOfIncident: string;
  reportid: string;
  uploadedDocPath: string[]; // Corrected type here
};

const Page = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [reportsPresent, setReportsPresent] = useState<boolean>(false);
  const [reportsData, setReportsData] = useState<Report[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!session) {
        // redirect("/login");
        return; // Redirect or handle unauthenticated state
      }

      try {
        const response = await fetch(
          `/api/findReports?userName=${session.user.name}`
        );
        if (response.ok) {
          //if the reponse is not null, then set the reportsPresent to true
          if (response !== null) {
            setReportsPresent(true);
            const data = await response.json();
            setReportsData(data.reports);
          }
          // console.log(response.json())
        } else {
          console.error("Error fetching reports:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {reportsPresent ? (
        <div>
          {reportsData.map((report, index) => (
            <div
              key={index}
              className="max-w-xl bg-white shadow-lg rounded-lg overflow-hidden m-24"
            >
              <div className="px-6 py-4">
                <h2 className="text-2xl font-bold mb-2">{report.typeOfIncident}</h2>
                <p className="text-gray-700">{report.descriptionOfIncident}</p>
                <p className="text-gray-700">{report.userName}</p>
              </div>
              <div className="px-6 py-4 flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  View Full Report
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // <ReportsFiled />
        <div>No reports filed yet! Stay safe.</div>
      )}
    </>
  );
};

const WrappedPage = () => (
  <SessionProvider>
    <Page />
  </SessionProvider>
);

export default WrappedPage;
