'use client'
import React from 'react'
import { NextPageContext } from "next";
import router, { Router } from "next/router";
import { ReactElement, useEffect, useRef, useState } from "react";
import PdfViewer from "./pdfViewer";

const Doc_upload = () => {
    const [currentDoc, setCurrentDoc] = useState<{ path: string; title: string } | null>(null);

    // const [user, setUser] = useState({
    //     email: "",
    //     name: "",
    //     phone: "",
    //   });
    //   const session = useSession();
    //   useEffect(() => {
    //     getUser().then((res) => {
    //       res.json().then((j: any) => {
    //         setUser(j);
    //       });
    //     });
    //   }, [session]);

    const [uploadedDocs, setUploadedDocs] = useState<{ file: File; title: string }[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
  
    const handleDocsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
  
      if (files && files.length > 0) {
        const newFiles = Array.from(files).map((file) => ({
          file,
          title: file.name,
        }));
  
        setUploadedDocs((prevDocs) => [...prevDocs, ...newFiles]);
      }
    };

    // next.config.js


  

    const handleUploadClick = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      };

    const handleDelete = (index: number) => {
    setUploadedDocs((prevDocs) => [...prevDocs.slice(0, index), ...prevDocs.slice(index + 1)]);
    setDropdownIndex(null);
    };

      const toggleDropdownMore = (index: number | null) => {
        setDropdownIndex(index === dropdownIndex ? null : index);
      };
      const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
      const handleView = (index: number) => {
        // Handle view action
        setCurrentDoc({
          path: URL.createObjectURL(uploadedDocs[index].file),
          title: uploadedDocs[index].title,
        });
        setDropdownIndex(null);
      };
            return (
                <div>
                    <div className="text-black flex">
                    <p
                      className="font-mono font-light text-sm  mt-6"
                      style={{ fontFamily: "" }}>
                      {("Additional Documents")}
                    </p>
                    <p
                      className="  text-sm font-mono text-black opacity-50 ml-3 mt-7"
                      style={{ fontFamily: "" }}>
                      {("Maximum file size 5 MB")}
                    </p>
                  </div>
                  <div className="">
                    <div className="flex w-full">
                      <div className="w-full">
                        <div
                          className="flex h-[125px] w-full rounded-[20px] border border-blue-700 hover:cursor-pointer"
                          onClick={handleUploadClick}>
                          <div className="m-auto">
                            <span
                              className="  text-xl font-medium text-blue-700"
                              style={{ fontFamily: "__POPPINS_C17214" }}>
                              <img
                                src="/upload.svg"
                                alt="See Options"
                                className="inline -translate-y-1 w-6 h-6"
                              />{" "}
                              {("Drag and drop")}
                            </span>
                            <span
                              className="  text-xl font-medium text-neutral-400"
                              style={{ fontFamily: "__POPPINS_C17214" }}>
                              {" "}
                              {("or browse files")}
                            </span>
                          </div>
                        </div>
                        <input
                          ref={fileInputRef}
                          id="dropzone-file"
                          type="file"
                          onChange={handleDocsChange}
                          multiple
                          className="hidden"
                        />
                      </div>
                    </div>
                    {currentDoc && (
                      <div className="fixed top-0 left-0 z-[53] flex h-full w-full items-center justify-center bg-black bg-opacity-50 ">
                        <div className="rounded-lg bg-white p-4">
                          <PdfViewer
                            url={currentDoc.path}
                            type={
                              currentDoc.title.toLowerCase().endsWith(".mp4")
                                ? "video"
                                : /\.(jpeg|jpg|gif|png)$/.test(currentDoc.title.toLowerCase())
                                ? "image"
                                : "None"
                            }
                          />

                          <button
                            className="mt-4 rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-700"
                            onClick={() => setCurrentDoc(null)}>
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                    {uploadedDocs.length > 0 && (
                      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                        {uploadedDocs.map((doc, index) => (
                          <div
                            key={index}
                            className="mb-3 flex h-20 w-72 justify-between rounded-[50px] border border-black bg-white md:w-full lg:m-3">
                            <div
                              className="ml-4 flex items-center break-all   text-base font-medium text-black"
                              style={{ fontFamily: "__POPPINS_C17214" }}>
                              {doc.title}
                            </div>
                            <div
                              className="relative ml-4 flex cursor-pointer items-center px-2   text-base font-medium text-black"
                              onClick={() => toggleDropdownMore(index)}
                              style={{ fontFamily: "__POPPINS_C17214" }}>
                              <img src="/more.svg" className="inline" alt="" />
                              {dropdownIndex === index && (
                                <div className="absolute left-0 top-[2.7rem] w-36 overflow-hidden rounded-[10px] border border-neutral-900 bg-white shadow-lg">
                                  <div
                                    onClick={() => handleView(index)}
                                    className="cursor-pointer py-2 px-4 hover:bg-gray-100">
                                    {("View")}
                                  </div>
                                  <div
                                    onClick={() => handleDelete(index)}
                                    className="cursor-pointer py-2 px-4 hover:bg-gray-100">
                                    {("Delete")}
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
  )
}

export default Doc_upload
