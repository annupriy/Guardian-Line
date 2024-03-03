import React, { useState } from "react";
import { useRouter } from "next/navigation";


type DocumentStatus = "RESOLVED" | "NOT_RESOLVED"; // Define DocumentStatus type

const ReportListTable = ({ documentsData }: { documentsData: any }): JSX.Element => {
    const router = useRouter();
    const [documentsPerPage, setDocumentsPerPage] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handleDownload = (url: string) => {
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = document.title;
        anchor.click();
    };

    const indexOfLastDocument = currentPage * documentsPerPage;
    const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
    const currentDocuments = documentsData.slice(indexOfFirstDocument, indexOfLastDocument);

    const totalPageCount = Math.ceil(documentsData.length / documentsPerPage);

    const firstPage = () => {
        setCurrentPage(1);
    };

    const lastPage = () => {
        setCurrentPage(totalPageCount);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev === 1 ? prev : prev - 1));
    };

    console.log(currentDocuments)

    const nextPage = () => {
        setCurrentPage((prev) => (prev === totalPageCount ? prev : prev + 1));
    };

    function showDocument(documentId: number) {
        router.push(`/documents/${documentId}`);
    }
    // console.log(currentDocuments);

    return (
        <div className="flex flex-col justify-between overflow-x-scroll rounded-3xl bg-slate-100 py-1 m-10  ">
            <div className="p-4">
                <table className="w-full border-separate border-spacing-x-6 lg:border-spacing-x-14">
                    <thead>
                        <tr className="font-poppins border-b text-[14px] font-medium text-[#8D8D8D]">
                            <th className="py-3 md:py-6">Report Id</th>
                            <th className="py-3 md:py-6">Type of Incident</th>
                            <th className="py-3 md:py-6 whitespace-normal">Description of Incident</th>
                            <th className="py-3 md:py-6 whitespace-normal">Address of Incident</th>
                        </tr>
                    </thead>
                    {/* make it overflow-y-scroll on mobile */}
                    <tbody className="overflow-y-scroll">
                        
                        {currentDocuments.map((document: any, index: number) => (
                            <tr
                                key={index}
                                className="font-poppins cursor-pointer border-b text-[14px] font-medium text-[#8D8D8D] ">
                                <td className="whitespace-nowrap ">{document.reportid || "#" + document.id}</td>
                                <td className="whitespace-nowrap">{document.typeOfIncident || "#" + document.typeOfIncident}</td>
                                <td className="whitespace-nowrap">{document.descriptionOfIncident || "#" + document.descriptionOfIncident}</td>
                                <td className="whitespace-nowrap">{document.incidentLocation.address || "#" + document.incidentLocation.address}</td> 
                                {/* <td className="whitespace-nowrap">{document.city || "#" + document.city}</td>
                            <td className="whitespace-nowrap">{document.state || "#" + document.state}</td>
                            <td className="whitespace-nowrap">{document.pincode || "#" + document.pincode}</td>
                            <td className="whitespace-nowrap">{document.status || "#" + document.status}</td>
                            <td className="whitespace-nowrap">{document.isSame || "#" + document.isSame}</td>
                            <td className="whitespace-nowrap">{document.vote || "#" + document.vote}</td> */}



                                {/* <td className="whitespace-nowrap ">
                                <div
                                    className={`flex h-8 min-w-max items-center justify-center gap-2 whitespace-nowrap rounded-2xl px-3 
                                        } lg:px-0 ${getDocumentStatusColor(document.status)}`}>
                                    <img
                                        src={`/newIcons/${document.status === "DRAFT" ? "TimeCircle" : "TimeCircleGreen"
                                            }.svg`}
                                        alt=""
                                        className=" justify-center"
                                    />
                                    `documentStatus.${formatDocumentStatus(document.status)}`
                                </div>
                            </td> */}
                                {/* <td className="px-3 md:pl-4 lg:pl-14">
                                <div>{new Date(document.created).toLocaleDateString()}</div>
                            </td>
                            <td className="flex content-center items-center justify-center py-3 md:py-6">
                                <button
                                    onClick={(event: any) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        handleDownload(document.document);
                                    }}>
                                    <img src="/newIcons/Download.svg" alt="" />
                                </button>
                            </td> */}
                                <td>
                                    <div className="flex-none gap-2">
                                        <div className="dropdown dropdown-end">
                                            <div
                                                tabIndex={0}
                                                role="button"
                                                className="btn btn-ghost btn-circle avatar mr-8"
                                            >

                                                <img
                                                    alt="Tailwind CSS Navbar component"
                                                    src="/dots.svg"
                                                />

                                            </div>

                                            <ul
                                                tabIndex={0}
                                                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                                            >
                                                <li
                                                    
                                                    onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    router.push(`/full_report?reportid=${document.reportid}`);

                                                    }}
                                                    >
                                                    Full Report
                                                    {/* <span className="badge">New</span> */}
                                                    {/* </link> */}
                                                </li>
                                                <li>
                                                    <button id="logoutButton">Resolved</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="font-poppins mt-4 mb-6 flex flex-col justify-between text-[#8D8D8D] md:flex-row">
                <div className="mb-4 ml-6 flex items-center space-x-2 text-[14px] font-medium ">
                    <span>table.show</span>
                    <div className="flex items-center">
                        <select
                            className="appearance-non rounded-lg border border-gray-400 bg-white py-0.5 px-2"
                            onChange={(e) => setDocumentsPerPage(parseInt(e.target.value))}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                    <span>table.records</span>
                </div>

                <div className="ml-6 flex items-center space-x-1 text-[12px] font-normal md:ml-0 md:mr-6 ">
                    <button
                        className={` rounded-lg border py-1 px-2 ${currentPage === 1 ? "border-[#0A43F0] text-[#0A43F0]" : ""
                            }`}
                        onClick={firstPage}>
                        First Page
                    </button>
                    <button className="rounded-xl border border-gray-400 py-1 px-2" onClick={prevPage}>
                        &lt;
                    </button>
                    <button className="rounded-xl border border-gray-400 py-1 px-2" disabled>
                        table.page {`${currentPage} $table.of ${totalPageCount}`}
                    </button>
                    <button className="rounded-xl border border-gray-400 py-1 px-2" onClick={nextPage}>
                        &gt;
                    </button>
                    <button
                        className={`rounded-xl border py-1 px-2 ${currentPage === totalPageCount ? "border-[#0A43F0] text-[#0A43F0]" : ""
                            }`}
                        onClick={lastPage}>
                        Last Page
                    </button>
                </div>
            </div>
        </div>
    );
};

function formatDocumentStatus(status: DocumentStatus): string | undefined {
    switch (status) {
        case "RESOLVED":
            return "resolved";
        case "NOT_RESOLVED":
            return "notResolved";
    }
}

function getDocumentStatusColor(status: DocumentStatus): string {
    switch (status) {
        case "RESOLVED":
            return "bg-[#E5F7ED]";
        case "NOT_RESOLVED":
            return "bg-[#FEEFEE]";
        default:
            return "";
    }
}

export default ReportListTable;
