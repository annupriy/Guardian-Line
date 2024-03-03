import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

type DocumentStatus = "Live" | "NotLive"; // Define DocumentStatus type

const ReportListTable = ({
  documentsData,
}: {
  documentsData: any;
}): JSX.Element => {
  const router = useRouter();
  const [documentsPerPage, setDocumentsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleDownload = (url: string) => {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = document.title;
    anchor.click();
  };
  const [isResolved, setIsResolved] = useState<boolean[]>([]);

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documentsData.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );
  const totalPageCount = Math.ceil(documentsData.length / documentsPerPage);
  const resolveReport = async (reportId: number, index: number) => {
    console.log(index);
    try {
      const res = await toast.promise(
        fetch(`/api/resolveReport`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reportId }),
        }),
        {
          loading: "Resolving report...",
          success: "Report resolved",
          error: "Error resolving report",
        }
      );
      if (res.status === 200) {
        // Update the document's resolved property in the documentsData array
        const updatedDocuments = [...documentsData];
        updatedDocuments[index].resolved = true;
        setIsResolved((prev) => {
          prev[index] = true;
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

  function showDocument(documentId: number) {
    router.push(`/documents/${documentId}`);
  }

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
                  {document.isSame ? "Fraud" : "Not fraud" || "-"}
                </td>
                <td className="whitespace-nowrap">{document.status}</td>
                <td className="whitespace-nowrap">
                  {document.resolved ? (
                    <button className="rounded-xl border border-green-400 py-1 px-2 bg-green-600 text-white">
                      Resolved
                    </button>
                  ) : (
                    <button
                      className="rounded-xl border border-gray-400 py-1 px-2 hover:bg-[#0A43F0] hover:text-white"
                      onClick={() => {
                        resolveReport(document.reportid, index);
                      }}
                    >
                      Resolve
                    </button>
                  )}
                </td>
                <td>
                  <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle mr-8"
                      >
                        <img
                          alt="Tailwind CSS Navbar component"
                          className="w-8 h-8"
                          src="/dots.svg"
                        />
                      </div>

                      <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                      >
                        <li>
                          {/* <link href="../my_profile" className="justify-between"> */}
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

function formatDocumentStatus(status: DocumentStatus): string | undefined {
  switch (status) {
    case "Live":
      return "Live";
    case "NotLive":
      return "Not Live";
  }
}

function getDocumentStatusColor(status: DocumentStatus): string {
  switch (status) {
    case "Live":
      return "bg-[#E5F7ED]";
    case "NotLive":
      return "bg-[#FEEFEE]";
    default:
      return "";
  }
}

export default ReportListTable;
