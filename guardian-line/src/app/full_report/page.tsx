"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Suspense } from "react";

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
  //  uploadedDocPath: [];
  status: string;
  isSame: boolean;
  resolved: boolean;
};

type PageProps = {
  searchParams: { error?: string };
};

const Page = ({ searchParams }: PageProps) => {
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
    // uploadedDocPath: [],
    status: "",
    isSame: false,
    resolved: false,
  });
  const [reportid, setReportid] = useState<string>("");
  useEffect(() => {
    const rid = new URLSearchParams(searchParams).get("reportid");
    if (rid) {
      setReportid(rid);
    }
  }, []);

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

  useEffect(() => {
    const response = async () => {
      try {
        const response = await fetch(
          `/api/detailed_report?reportid=${reportid}`
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
  }, [reportid]);

  return (
    <div className="h-screen bg-slate-100">
      <div className="flex flex-col justify-center items-center p-8 mt-20">
        <h1 className="text-3xl p-4 text-red-600">Full Report</h1>

        <div className="relative overflow-x-auto">
          <table className="w-full md:flex text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-black-900 rounded-xl p-4">
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
                <td className="px-6 py-4">{input.typeOfIncident}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Report Description:
                </th>
                <td className="px-6 py-4">{input.descriptionOfIncident}</td>
              </tr>

              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Report address:
                </th>
                <td className="px-6 py-4">{input.incidentLocation.address}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  latitude:
                </th>
                <td className="px-6 py-4">{input.incidentLocation.latitude}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  longitude:
                </th>
                <td className="px-6 py-4">
                  {input.incidentLocation.longitude}
                </td>
              </tr>

              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  city:
                </th>
                <td className="px-6 py-4">{input.city}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  state:
                </th>
                <td className="px-6 py-4">{input.State}</td>
              </tr>
            </tbody>

            <tbody>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  pincode:
                </th>
                <td className="px-6 py-4">{input.Pincode}</td>
              </tr>

              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Personal Information:
                </th>
                <td className="px-6 py-4">
                  csdfdlkfkjweoifjweifjiweoufweifjwekfjwekfwejfqwkfqijriewojnsadcnasjfkqwhifjqwojpfqwofjwnffsadcqwi
                  wopjfweifjweifjmsdcsdknwf
                  dnqwjkdfqwfjqwijfqwojfqwofkqwmfewkfqwijfqowfjqpwfmsdndfkdfjasfkqwk;fkpqwfkqwfmfqwmkfqpwfkewfewkfnwqfqw;fk;
                  {/* {input.personalInformation} */}
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  UploadedDoc:
                </th>
                <td className="px-6 py-4">{input.Pincode}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Report Date:
                </th>
                <td className="px-6 py-4">{input.dateOfIncident}</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Report Time:
                </th>
                <td className="px-6 py-4">{input.timeOfIncident}</td>
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
                <td className="px-6 py-4">{input.status}</td>
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
            </tbody>
          </table>
        </div>

        {uploadedDocs.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            {uploadedDocs.map((doc, index) => (
              <div
                key={index}
                className="mb-3 flex h-20 w-72 justify-between rounded-[50px] border border-black bg-white md:w-full lg:m-3"
              >
                <div
                  className="ml-4 flex items-center break-all   text-base font-medium text-black"
                  style={{ fontFamily: "__POPPINS_C17214" }}
                >
                  {doc.title}
                </div>
                <div
                  className="relative ml-4 flex cursor-pointer items-center px-2   text-base font-medium text-black"
                  onClick={() => toggleDropdownMore(index)}
                  style={{ fontFamily: "" }}
                >
                  <img src="/more.svg" className="inline" alt="" />
                  {dropdownIndex === index && (
                    <div className="absolute left-0 top-[2.7rem] w-36 overflow-hidden rounded-[10px] border border-neutral-900 bg-white shadow-lg">
                      <div
                        onClick={() => handleView(index)}
                        className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                      >
                        {"View"}
                      </div>
                      <div
                        onClick={() => handleDelete(index)}
                        className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                      >
                        {"Delete"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
