"use client"
import ReportedCrimes from "@/app/Components/ReportedCrimes";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { IncidentLocation } from "../../Components/reportsFiled"
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
  uploadedDocPath: Array<any>[];
};
const Page = async () => {
  const authSession = await getServerAuthSession();
  if (!authSession) {
    redirect("/login");
  }
  if (authSession.user) {
    return <ReportedCrimes user={authSession.user} />;
  }
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [reportsPresent, setReportsPresent] = useState<boolean>(false);
  const [reportsData, setReportsData] = useState<Report[]>([]);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!session) {
        // Redirect or handle unauthenticated state
        return;
      }

      try {
        const response = await fetch(
          `/api/findReports?userName=${session.user.name}`
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
  }, [session]);

  const handleExpand = (reportId: string) => {
    setExpandedReport(expandedReport === reportId ? null : reportId);
  };

  

  const handleViewDocument = (docPath: Array<any>) => {
    // Open the document in a new tab
    // window.open(docPath[0], "_blank");
    // console.log(docPath[0]);
    // if(docPath[0]!=null){
    //   console.log(docPath[0].path)
    //    window.open(docPath[0].path, "_blank");
    // }
    docPath.forEach((doc) => {
      if (doc.path) {
        window.open(doc.path, "_blank");
      }
    });
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {reportsPresent ? (
        <div className="flex flex-wrap justify-center gap-4 min-h-screen py-8 " style={{background: '	#e8e3e3', marginTop:'120px'}}>
          {reportsData.map((report, index) => (
            <div key={index} className="max-w-md w-full bg-white shadow-md rounded-md overflow-hidden m-4 transition-transform duration-300 transform hover:scale-105" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', background: '#e6e6e6'}}>
              <div className="px-6 py-4">
                <h2 className="text-2xl font-bold mb-2 text-sky-900">{report.typeOfIncident}</h2>
              
                {report.descriptionOfIncident != "" && <p className="text-gray-700">
                    <span className="font-semibold text-teal-700">Description of Incident: </span>{" "}
                    {report.descriptionOfIncident}</p>}
                <p className="text-gray-700">
                    <span className="font-semibold text-teal-700">Username: </span>{" "}
                    {report.userName}</p>
          
              </div>
              <div className="px-6 py-4 flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300" onClick={() => handleExpand(report.reportid)}>
                  View Full Report
                </button>
              </div>
              {expandedReport === report.reportid && (
                <div className="px-6 py-4">
                  <p className="text-gray-700">
                    <span className="font-semibold text-teal-700">Date of Incident:</span>{" "}
                    {report.dateOfIncident}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold text-teal-700">Time of Incident:</span>{" "}
                    {report.timeOfIncident}
                  </p>
                  
                  {report.city != null && <p className="text-gray-700">
                    <span className="font-semibold text-teal-700">City: </span>{" "}
                    {report.city}</p>}
                  
                    {report.state != null && <p className="text-gray-700">
                    <span className="font-semibold text-teal-700">State: </span>{" "}
                    {report.state}</p>}

                    {report.pincode != null && <p className="text-gray-700">
                    <span className="font-semibold text-teal-700">PIN Code: </span>{" "}
                    {report.pincode}</p>}

                    <p className="text-gray-700">
                      <span className="font-semibold text-teal-700">Location of Incident:</span>{" "}
                      {`${report.incidentLocation.address} (${report.incidentLocation.latitude}, ${report.incidentLocation.longitude})`}
                    </p>

                    {report.uploadedDocPath && report.uploadedDocPath.length > 0 && (
                      <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                      onClick={() => handleViewDocument(report.uploadedDocPath)}
                      >
                      View Uploaded Document
                      </button>
                    )}
                  {/* {report.uploadedDocPath != null && report.uploadedDocPath.length > 0 && (
  <div>
    {report.uploadedDocPath.map((doc: Object, index: number) => (
  <div key={index}>
    <a
      href={doc.path}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 inline-block mb-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      View {doc.title}
    </a>
  </div>
))} */}
  {/* </div>
)} */}

                    
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-8" style={{marginTop:'120px'}}>No reports filed yet! Stay safe.</div>
      )}
    </>
  );
};

export default Page;
