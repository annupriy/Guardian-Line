// // // "use client";

// // // import React, { useEffect, useState } from "react";
// // // import { SessionProvider, useSession } from "next-auth/react";

// // // type Report = {
// // //   userName: string;
// // //   descriptionOfIncident: string;
// // //   dateOfIncident: string;
// // //   timeOfIncident: string;
// // //   city: string;
// // //   state: string;
// // //   pincode: string;
// // //   incidentLocation: string;
// // //   typeOfIncident: string;
// // //   reportid: string;
// // //   uploadedDocPath: string[]; // Corrected type here
// // // };

// // // const Page = () => {
// // //   const { data: session } = useSession();
// // //   const [loading, setLoading] = useState<boolean>(true);
// // //   const [reportsPresent, setReportsPresent] = useState<boolean>(false);
// // //   const [reportsData, setReportsData] = useState<Report[]>([]);

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       if (!session) {
// // //         // redirect("/login");
// // //         return; // Redirect or handle unauthenticated state
// // //       }

// // //       try {
// // //         const response = await fetch(
// // //           `/api/findReports?userName=${session.user.name}`
// // //         );
// // //         if (response.ok) {
// // //           //if the reponse is not null, then set the reportsPresent to true
// // //           if (response !== null) {
// // //             setReportsPresent(true);
// // //             const data = await response.json();
// // //             setReportsData(data.reports);
// // //           }
// // //           // console.log(response.json())
// // //         } else {
// // //           console.error("Error fetching reports:", response.statusText);
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching reports:", error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [session]);

// // //   if (loading) {
// // //     return <p>Loading...</p>;
// // //   }

// // //   return (
// // //     <>
// // //       {reportsPresent ? (
// // //         <div>
// // //           {reportsData.map((report, index) => (
// // //             <div
// // //               key={index}
// // //               className="max-w-xl bg-white shadow-lg rounded-lg overflow-hidden m-24"
// // //             >
// // //               <div className="px-6 py-4">
// // //                 <h2 className="text-2xl font-bold mb-2">{report.typeOfIncident}</h2>
// // //                 <p className="text-gray-700">{report.descriptionOfIncident}</p>
// // //                 <p className="text-gray-700">{report.userName}</p>
// // //               </div>
// // //               <div className="px-6 py-4 flex justify-end">
// // //                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
// // //                   View Full Report
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       ) : (
// // //         // <ReportsFiled />
// // //         <div>No reports filed yet! Stay safe.</div>
// // //       )}
// // //     </>
// // //   );
// // // };

// // // const WrappedPage = () => (
// // //   <SessionProvider>
// // //     <Page />
// // //   </SessionProvider>
// // // );

// // // export default WrappedPage;



// "use client"
// import React, { useEffect, useState } from "react";
// import { SessionProvider, useSession } from "next-auth/react";

// type Report = {
//   userName: string;
//   descriptionOfIncident: string;
//   dateOfIncident: string;
//   timeOfIncident: string;
//   city: string;
//   state: string;
//   pincode: string;
//   incidentLocation: string;
//   typeOfIncident: string;
//   reportid: string;
//   uploadedDocPath: string[];
// };

// const Page = () => {
//   const { data: session } = useSession();
//   const [loading, setLoading] = useState<boolean>(true);
//   const [reportsPresent, setReportsPresent] = useState<boolean>(false);
//   const [reportsData, setReportsData] = useState<Report[]>([]);
//   const [expandedReport, setExpandedReport] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!session) {
//         // Redirect or handle unauthenticated state
//         return;
//       }

//       try {
//         const response = await fetch(
//           `/api/findReports?userName=${session.user.name}`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setReportsData(data.reports);
//           setReportsPresent(data.reports.length > 0);
//         } else {
//           console.error("Error fetching reports:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error fetching reports:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [session]);

//   const handleExpand = (reportId: string) => {
//     setExpandedReport(expandedReport === reportId ? null : reportId);
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       {reportsPresent ? (
//         <div className="flex flex-wrap justify-center gap-4 bg-gray-100 min-h-screen py-8">
//           {reportsData.map((report, index) => (
//             <div
//               key={index}
//               className="max-w-md w-full bg-white shadow-md rounded-md overflow-hidden m-4 transition-transform duration-300 transform hover:scale-105"
//             >
//               <div className="px-6 py-4">
//                 <h2 className="text-2xl font-bold mb-2">{report.typeOfIncident}</h2>
//                 <p className="text-gray-700">{report.descriptionOfIncident}</p>
//                 <p className="text-gray-700">{report.userName}</p>
//               </div>
//               <div className="px-6 py-4 flex justify-end">
//                 <button
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
//                   onClick={() => handleExpand(report.reportid)}
//                 >
//                   View Full Report
//                 </button>
//               </div>
//               {expandedReport === report.reportid && (
//                 <div className="px-6 py-4">
//                   <p>Date of Incident: {report.dateOfIncident}</p>
//                   <p>Time of Incident: {report.timeOfIncident}</p>
//                   {report.city!=null && <p>City: {report.city}</p>}
//                   {report.state &&  <p>State: {report.state}</p>}
//                   {report.pincode &&  <p>PIN Code: {report.pincode}</p>}

//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-gray-600 mt-8">No reports filed yet! Stay safe.</div>
//       )}
//     </>
//   );
// };

// const WrappedPage = () => (
//   <SessionProvider>
//     <Page />
//   </SessionProvider>
// );

// export default WrappedPage;


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
  uploadedDocPath: string[];
};

const Page = () => {
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
  // const handleViewDocument = (docPath: string[]) => {
  //   // Open a modal or navigate to a new page to view the document
  //   // You can use libraries like react-modal or open the document in a new tab/window
  //   // For simplicity, let's assume opening the document in a new tab
  //   window.open(docPath[0], '_blank');
  // };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {reportsPresent ? (
        <div className="flex flex-wrap justify-center gap-4 min-h-screen py-8"
        style={{background: '	#e8e3e3'}}>
          {reportsData.map((report, index) => (
            <div
              key={index}
              className="max-w-md w-full bg-white shadow-md rounded-md overflow-hidden m-4 transition-transform duration-300 transform hover:scale-105"
              style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', background: '#e6e6e6'}}
            >
              <div className="px-6 py-4">
                <h2 className="text-2xl font-bold mb-2 text-sky-900">{report.typeOfIncident}</h2>
                <p className="text-gray-700">
                  <span className="font-semibold text-teal-700">Description of Incident:</span>{" "}
                  {report.descriptionOfIncident}
                </p>
                {/* <p className="text-gray-700">{report.userName}</p> */}
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
                    

                    {/* {report.uploadedDocPath!=null && (
                    <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                    onClick={() => handleViewDocument(report.uploadedDocPath)}
                    >
                    View Uploaded Document
                    </button>
                    )} */}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-8">No reports filed yet! Stay safe.</div>
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

