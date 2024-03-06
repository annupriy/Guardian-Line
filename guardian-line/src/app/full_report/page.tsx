"use client";
import React from "react";
import { useState, useEffect } from "react";

type Report = {
  typeOfIncident: string;
  descriptionOfIncident: string;
  incidentLocation: {
    latitude: string;
    longitude: string;
    address: string;
  };
  dateOfIncident: string;
  timeOfIncident: string;
  personalInformation: string;
  city: string;
  State: string;
  Pincode: string;
  uploadedDocPath: [];
  status: string;
  isSame: boolean;
  resolved: boolean;
};

type PageProps = {
  searchParams: { error?: string };
};

const Page = ({ searchParams }: PageProps) => {
  const [reportid, setReportid] = useState<string>("");
  useEffect(() => {
    const rid = new URLSearchParams(searchParams).get("reportid");
    console.log(searchParams, rid);
    if (rid) {
      setReportid(rid);
    }
    const response = async () => {
      try {
        const response = await fetch(
          `/api/detailed_report?reportid=${rid}`
        );
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          if (data.report) setInput(data.report);
        }
        //   console.log(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    response();
  }, []);

  const handleViewDocument = (docPath: Array<any>) => {
    docPath.forEach((doc) => {
      if (doc.path) {
        window.open(doc.path, "_blank");
      }
    });
  };

  const [input, setInput] = useState<Report>({
    typeOfIncident: "",
    descriptionOfIncident: "",
    incidentLocation: { latitude: "", longitude: "", address: "" },
    dateOfIncident: "",
    timeOfIncident: "",
    personalInformation: "",
    city: "",
    State: "",
    Pincode: "",
    uploadedDocPath: [],
    status: "",
    isSame: false,
    resolved: false,
  });

  const [uploadedDocs, setUploadedDocs] = useState<
    { file: File; title: string }[]
  >([]);

  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [currentDoc, setCurrentDoc] = useState<{
    path: string;
    title: string;
  } | null>(null);
  const handleView = (index: number) => {
    // Handle view action
    setCurrentDoc({
      path: URL.createObjectURL(uploadedDocs[index].file),
      title: uploadedDocs[index].title,
    });
    setDropdownIndex(null);
  };

  // const [isExpanded, setIsExpanded] = useState(false);

  // const toggleExpand = () => {
  //   setIsExpanded(!isExpanded);

  // };

  const toggleDropdownMore = (index: number | null) => {
    setDropdownIndex(index === dropdownIndex ? null : index);
  };

  const handleDelete = (index: number) => {
    setUploadedDocs((prevDocs) => [
      ...prevDocs.slice(0, index),
      ...prevDocs.slice(index + 1),
    ]);
    setDropdownIndex(null);
  };
  // console.log(reportid);

  // const handleExpand = (reportId: string) => {
  //     setExpandedReport(expandedReport === reportIde);
  //   };

  return (
    <div className="h-full bg-slate-100 p-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl text-red-600 font-semibold">Full Report</h1>

        <div className="">
          <table className="flex flex-col justify-center items-center w-[30rem] md:flex text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl p-4">
            <tbody>
              <tr className="bg-white dark:bg-gray-800 ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Report ID:
                </th>
                <td className="px-6 py-4">{reportid}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Report Type:
                </th>
                <td className="px-6 py-4">
                  {input.typeOfIncident ? input.typeOfIncident : "N.A"}
                </td>
              </tr>

              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Report Description:
                </th>
                <td className="px-6 py-4">
                  {input.descriptionOfIncident
                    ? input.descriptionOfIncident
                    : "N.A"}
                </td>
              </tr>

              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Report address:
                </th>
                <td className="px-6 py-4">
                  {input.incidentLocation.address
                    ? input.incidentLocation.address
                    : "N.A"}
                </td>
              </tr>

              {/* <tr className="bg-white dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Report Description:
                                </th>
                                {/* <div className='w-full'> */}
              {/* <td className="px-6 py-4 whitespace-normal max-w-md">
                                    {input.descriptionOfIncident}
                                    <div className="max-h-32 overflow-y-auto">
                                        <p>
                                            {input.descriptionOfIncident}
                                        </p>
                                    </div>
                                </td>
                                {/* </div> */}
              {/* <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Report address:
                                </th>
                                <td className="px-6 py-4">
                                    {input.incidentLocation.address}
                                </td>

                            </tr>   */}

              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  latitude:
                </th>
                <td className="px-6 py-4">
                  {input.incidentLocation.latitude
                    ? input.incidentLocation.latitude
                    : "N.A"}
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="bg-white px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  longitude:
                </th>
                <td className="px-6 py-4">
                  {input.incidentLocation.longitude
                    ? input.incidentLocation.longitude
                    : "N.A"}
                </td>
              </tr>

              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  state:
                </th>
                <td className="px-6 py-4">
                  {input.State ? input.State : "N.A"}
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  pincode:
                </th>
                <td className="px-6 py-4">
                  {input.Pincode ? input.Pincode : "N.A"}
                </td>
              </tr>

              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  city:
                </th>
                <td className="px-6 py-4">{input.city ? input.city : "N.A"}</td>
              </tr>

              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Report Date:
                </th>
                <td className="px-6 py-4">
                  {input.dateOfIncident ? input.dateOfIncident : "N.A"}
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Report Time:
                </th>
                <td className="px-6 py-4">
                  {input.timeOfIncident ? input.timeOfIncident : "N.A"}
                </td>
              </tr>

              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Report Validity:
                </th>
                <td className="px-6 py-4">
                  {input.isSame ? "Fraud" : "Not Fraud"}
                </td>
              </tr>

              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Resolved status:
                </th>
                <td className="px-6 py-4">
                  {input.resolved ? "Resolved" : "Not Resolved"}
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  report status:
                </th>
                <td className="px-6 py-4">
                  {input.status ? input.status : "N.A"}
                </td>
              </tr>

              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Personal Information:
                </th>
                <td className="px-6 py-4 break-all ">
                  {input.personalInformation
                    ? input.personalInformation
                    : "N.A"}
                  {/* WDUIWQEHDQWUIERQWIIIIIIIIUEWQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ */}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex-cols justify-center items-center">
            <table className="w-full md:flex text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 p-4">
              <tbody></tbody>
            </table>
          </div>

          {/* {input.uploadedDocPath.length > 0 && input.uploadedDocPath.map((docPath, index) => (
                                        <button
                                            key={index}
                                            className="bg-slate-300 hover:bg-slate-400 text-green-900 font-bold py-2 px-4 rounded transition-colors duration-300"
                                            onClick={() => handleViewDocument(docPath)}
                                        >
                                            Download Uploaded Document
                                        </button>

                                )
                                 
                                )} */}
          <div className="flex justify-center items-center">
            {input.uploadedDocPath && input.uploadedDocPath.length > 0 && (
              <button
                className=" bg-slate-300 hover:bg-slate-400 flex justify-center items-center text-green-900 font-bold py-2 px-4 rounded transition-colors duration-300"
                onClick={() => handleViewDocument(input.uploadedDocPath)}
              >
                Download Uploaded Document
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
