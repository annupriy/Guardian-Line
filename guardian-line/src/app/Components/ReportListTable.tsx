import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

type ReportStatus = "Live" | "NotLive";
type ReportResolution = "Resolved" | "Unresolved";

const ReportListTable = ({
  
  documentsData,
}: {
  documentsData: any;
}): JSX.Element => {
  const router = useRouter();
  const dialogModalRef = React.useRef<HTMLDialogElement>(null);
  const [documentsPerPage, setDocumentsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isResolved, setIsResolved] = useState<boolean[]>([]);
  const [resolvedtrueReport, setResolvedTrueReport] = useState<boolean[]>([]);

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documentsData.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  type StatusFilterType = {
    label: string;
    value: string;
  };
  const statusFilters: StatusFilterType[] = [
    { label: "True Report", value: "True Report" },
    { label: "False Report", value: "False Report" },
  ];

  const [resolved, setResolved] = useState<number>(0);

  const [dropdownVisible, setDropdownVisible] = useState<string>();

  const toggle = (reportId: string): void => {
    const modal = document.getElementById(
      `my_modal_${reportId}`
    ) as HTMLDialogElement | null;
    modal?.showModal();
  };

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false); // State to track dropdown open/close

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Toggle dropdown state
  };

  const totalPageCount = Math.ceil(documentsData.length / documentsPerPage);
  const resolveReport = async (
    reportId: number,
    index: number,
    statement: boolean,
    incidentType: string,
    userStatus: string
  ) => {
    try {
      const res = await toast.promise(
        fetch(`/api/resolveReport`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reportId, statement,incidentType,userStatus }),
        }),
        {
          loading: "Resolving report...",
          success: "Report resolved",
          error: "Error resolving report",
        }
      );
      if (res.status === 200) {
        const updatedDocuments = [...documentsData];
        updatedDocuments[index].resolved = true;
        setIsResolved((prev) => {
          prev[index] = true;
          return [...prev];
        });
        setResolvedTrueReport((prev) => {
          prev[index] = statement;
          return [...prev];
        });
      } else {
        toast.error("Error resolving report");
      }
    } catch (error) {
      toast.error("Error resolving report");
    }
  };
  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    setCurrentPage(totalPageCount);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 1 ? prev : prev - 1));
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPageCount ? prev : prev + 1));
  };

  // const ModalExample = () => {
  //   const modalRef = useRef<HTMLDialogElement>(null);
  
  //   const openModal = () => {
  //     if (modalRef.current) {
  //       modalRef.current.showModal();
  //     }
  //   };
  
  //   const closeModal = () => {
  //     if (modalRef.current) {
  //       modalRef.current.close();
  //     }
  //   };
  
  

  return (
    <div className="flex flex-col justify-between overflow-x-scroll lg:overflow-x-hidden rounded-3xl bg-white py-1 m-10 mb-4">
 
      
      <Toaster />
      <div className="p-4">
        <table className="w-full border-separate border-spacing-x-6 lg:border-spacing-x-14 mb-4">
          <thead>
            <tr className="font-poppins border-b text-[14px] font-medium text-[#8D8D8D]">
              <th className="py-3 md:py-6">Report Id</th>
              <th className="py-3 md:py-6">Type of Incident</th>
              <th className="py-3 md:py-6 whitespace-normal">
                Model Prediction
              </th>
              <th className="py-3 md:py-6 whitespace-normal">Status</th>
              <th className="py-3 md:py-6">Resolution</th>
            </tr>
          </thead>
          {/* make it overflow-y-scroll on mobile */}
          <tbody className="overflow-y-scroll">
            {currentDocuments.map((document: any, index: number) => (
              <tr
                key={index}
                className="font-poppins cursor-pointer border-b text-[14px] font-medium text-[#8D8D8D] "
              >
                <td className="whitespace-nowrap ">{document.reportid}</td>
                <td className="whitespace-nowrap">{document.typeOfIncident}</td>
                <td className="whitespace-nowrap">
                  {document.isSame
                    ? "Fraud"
                    : document.vote < 0
                    ? "Fraud"
                    : "Not Fraud"}
                </td>
                <td className="whitespace-nowrap">{document.status}</td>
                <td className="whitespace-nowrap">
                  {document.resolved ? (
                    // If isResolvedTrue is true then bg should be green else red
                    <button
                      className="rounded-xl border border-gray-400 py-1 px-2 text-white"
                      style={{
                        backgroundColor:
                          resolvedtrueReport[index] === true ||
                          document.adminStatement === true
                            ? "green"
                            : resolvedtrueReport[index] === false ||
                              document.adminStatement === false
                            ? "red"
                            : "green",
                      }}
                    >
                      Resolved
                    </button>
                  ) : (
                    <div>
                      <button
                        className="rounded-xl border border-gray-400 py-1 px-2 hover:bg-[#0A43F0] hover:text-white"
                        onClick={() => toggle(document.reportid)}
                      >
                        Resolve
                      </button>
                      <dialog
                        id={`my_modal_${document.reportid}`} // Unique id for each modal
                        ref={dialogModalRef}
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box">
                          <div className="flex justify-center">
                            <p className="p-1 font-bold text-lg text-black ">
                              Validate the report as true or false!
                            </p>
                          </div>
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                              onClick={() => {
                                dialogModalRef.current?.close();
                              }}
                            >
                              ✕
                            </button>
                          </form>
                          <div className="modal-action justify-between">
                            <form
                              method="dialog"
                              className="flex justify-evenly w-full"
                            >
                              <button
                                className="btn btn-success"
                                onClick={() => {
                                  resolveReport(document.reportid, index, true, document.typeOfIncident,document.userStatus),
                                    setResolved(1),
                                    dialogModalRef.current?.close();
                                }}
                              >
                                True Report
                              </button>
                              <button
                                className="btn btn-error"
                                onClick={() => {
                                  resolveReport(
                                    document.reportid,
                                    index,
                                    false,
                                    document.typeOfIncident,
                                    document.userStatus
                                  ),
                                    setResolved(-1),
                                    dialogModalRef.current?.close();
                                }}
                              >
                                False Report
                              </button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </div>
                  )}
                </td>
                <td>
                  <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle mr-8"
                        onClick={() => setDropdownOpen(!dropdownOpen)} // Close dropdown on blur
                      >
                        <img
                          alt="Tailwind CSS Navbar component"
                          className="w-8 h-8"
                          src="/dots.svg"
                        />
                      </div>

                      {dropdownOpen && (
                        <ul
                          tabIndex={0}
                          className="absolute mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                        >
                          <li
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              router.push(
                                `/full_report?reportid=${document.reportid}`
                              );
                            }}
                            className="cursor-pointer hover:bg-primary-100 hover:text-primary-700"
                          >
                            Full Report
                          </li>
                        </ul>
                      )}
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
          <span>Show</span>
          <div className="flex items-center">
            <select
              className="appearance-non rounded-lg border border-gray-400 bg-white py-0.5 px-2"
              onChange={(e) => setDocumentsPerPage(parseInt(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <span>Records</span>
        </div>

        <div className="ml-6 flex items-center space-x-1 text-[12px] font-normal md:ml-0 md:mr-6 ">
          <button
            className={` rounded-lg border py-1 px-2 ${
              currentPage === 1 ? "border-[#0A43F0] text-[#0A43F0]" : ""
            }`}
            onClick={firstPage}
          >
            First Page
          </button>
          <button
            className="rounded-xl border border-gray-400 py-1 px-2"
            onClick={prevPage}
          >
            &lt;
          </button>
          <button
            className="rounded-xl border border-gray-400 py-1 px-2"
            disabled
          >
            Page {`${currentPage} of ${totalPageCount}`}
          </button>
          <button
            className="rounded-xl border border-gray-400 py-1 px-2"
            onClick={nextPage}
          >
            &gt;
          </button>
          <button
            className={`rounded-xl border py-1 px-2 ${
              currentPage === totalPageCount
                ? "border-[#0A43F0] text-[#0A43F0]"
                : ""
            }`}
            onClick={lastPage}
          >
            Last Page
          </button>
        </div>
      </div>
    </div>
  );
};

function formatDocumentStatus(status: ReportStatus): string | undefined {
  switch (status) {
    case "Live":
      return "Live";
    case "NotLive":
      return "Not Live";
  }
}

function getDocumentStatusColor(status: ReportStatus): string {
  switch (status) {
    case "Live":
      return "bg-[#E5F7ED]";
    case "NotLive":
      return "bg-[#FEEFEE]";
    default:
      return "";
  }
}

function formatDocumentResolution(
  resolution: ReportResolution
): string | undefined {
  switch (resolution) {
    case "Resolved":
      return "Resolved";
    case "Unresolved":
      return "Unresolved";
  }
}

function getDocumentResolutionColor(resolution: ReportResolution): string {
  switch (resolution) {
    case "Resolved":
      return "bg-[#E5F7ED]";
    case "Unresolved":
      return "bg-[#FEEFEE]";
    default:
      return "";
  }
}

export default ReportListTable;