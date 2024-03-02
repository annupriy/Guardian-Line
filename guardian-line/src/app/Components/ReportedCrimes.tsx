"use client";

import React, { useEffect, useState } from "react";
import { IncidentLocation } from "./reportsFiled";

type User = {
  name: string | null;
  id: string | null;
};

type UserInfo = {
  user: User;
};

type Report = {
  userName: string;
  descriptionOfIncident: string;
  dateOfIncident: string;
  timeOfIncident: string;
  city: string;
  state: string;
  pincode: string;
  incidentLocation: IncidentLocation; // Change to IncidentLocation type
  typeOfIncident: string;
  reportid: string;
  uploadedDocPath: string[];
};

const ReportedCrimes: React.FC<UserInfo> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [reportsPresent, setReportsPresent] = useState<boolean>(false);
  const [reportsData, setReportsData] = useState<Report[]>([]);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/findReports?userName=${user.name}`
        );
        if (response.ok) {
          const data = await response.json();
          setReportsData(data.reports);
          setReportsPresent(data.reports.length > 0);
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
  }, []);

  const handleExpand = (reportId: string) => {
    setExpandedReport(expandedReport === reportId ? null : reportId);
  };

  const handleViewDocument = (docPath: string[]) => {
    // Open the document in a new tab
    window.open(docPath[0], "_blank");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {reportsPresent ? (
        <div
          className="flex flex-wrap justify-center gap-4 min-h-screen py-8 translate-y-[11vh]"
          style={{ background:"#e8e3e3"}}
        >
          {reportsData.map((report, index) => (
            <div
              key={index}
              className="max-w-md w-full bg-white shadow-md rounded-md overflow-hidden m-4 transition-transform duration-300 transform hover:scale-105"
              style={{
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                background: "#e6e6e6",
              }}
            >
              <div className="px-6 py-4">
                <h2 className="text-2xl font-bold mb-2 text-sky-900">
                  {report.typeOfIncident}
                </h2>

                {report.descriptionOfIncident != "" && (
                  <p className="text-gray-700">
                    <span className="font-semibold text-teal-700">
                      Description of Incident:{" "}
                    </span>{" "}
                    {report.descriptionOfIncident}
                  </p>
                )}
              </div>
              <div className="px-6 py-4 flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                  onClick={() => handleExpand(report.reportid)}
                >
                  View Full Report
                </button>
              </div>
              {expandedReport === report.reportid && (
                <div className="px-6 py-4">
                  <p className="text-gray-700">
                    <span className="font-semibold text-teal-700">
                      Date of Incident:
                    </span>{" "}
                    {report.dateOfIncident}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold text-teal-700">
                      Time of Incident:
                    </span>{" "}
                    {report.timeOfIncident}
                  </p>

                  {report.city != null && (
                    <p className="text-gray-700">
                      <span className="font-semibold text-teal-700">
                        City:{" "}
                      </span>{" "}
                      {report.city}
                    </p>
                  )}

                  {report.state != null && (
                    <p className="text-gray-700">
                      <span className="font-semibold text-teal-700">
                        State:{" "}
                      </span>{" "}
                      {report.state}
                    </p>
                  )}

                  {report.pincode != null && (
                    <p className="text-gray-700">
                      <span className="font-semibold text-teal-700">
                        PIN Code:{" "}
                      </span>{" "}
                      {report.pincode}
                    </p>
                  )}

                  <p className="text-gray-700">
                    <span className="font-semibold text-teal-700">
                      Location of Incident:
                    </span>{" "}
                    {`${report.incidentLocation.address} (${report.incidentLocation.latitude}, ${report.incidentLocation.longitude})`}
                  </p>

                  {/* {report.uploadedDocPath != null && (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                      onClick={() => handleViewDocument(report.uploadedDocPath)}
                    >
                      View Uploaded Document
                    </button>
                  )} */}
                  {report.uploadedDocPath != null &&
                    report.uploadedDocPath.length > 0 && (
                      <div>
                        {/* {report.uploadedDocPath.map((doc, index) => (
      <div key={index}>
        <a
          href={doc.path}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 inline-block mb-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          View {doc.name}
        </a>
      </div>
    ))} */}
                      </div>
                    )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          className="text-center text-gray-600 mt-8"
          style={{ marginTop: "120px" }}
        >
          No reports filed yet! Stay safe.
        </div>
      )}
    </>
  );
};

export default ReportedCrimes;
