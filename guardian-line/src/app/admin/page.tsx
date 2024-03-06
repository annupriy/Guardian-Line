"use client";
import { useEffect, useState } from "react";
import ReportListTable from "@/app/Components/ReportListTable";
type ReportStatus = "Live" | "NotLive";
type ReportResolution = "Resolved" | "Unresolved";

const Page = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [originalDocuments, setOriginalDocuments] = useState<any[]>([]);
  const [showStatusFilterOptions, setShowStatusFilterOptions] =
    useState<boolean>(false);
  const [showResolutionFilterOptions, setShowResolutionFilterOptions] =
    useState<boolean>(false);
  const [showCreatedFilterOptions, setShowCreatedFilterOptions] =
    useState<boolean>(false);

  const getDocuments = async () => {
    try {
      const response = await fetch(`/api/report_admin`);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error fetching documents", error);
    }
  };

  type StatusFilterType = {
    label: string;
    value: "ALL" | ReportStatus;
  };

  type ResoltionFilterType = {
    label: string;
    value: "ALL" | ReportResolution;
  };

  const statusFilters: StatusFilterType[] = [
    { label: "All", value: "ALL" },
    { label: "Live", value: "Live" },
    { label: "Not Live", value: "NotLive" },
  ];

  const resolutionFilters: ResoltionFilterType[] = [
    { label: "All", value: "ALL" },
    { label: "Resolved", value: "Resolved" },
    { label: "Unresolved", value: "Unresolved" },
  ];

  const createdFilter = [
    { label: "All Time", value: -1 },
    { label: "Last 24 Hours", value: 1 },
    { label: "Last 7 Days", value: 7 },
    { label: "Last 30 Days", value: 30 },
    { label: "Last 3 Months", value: 90 },
    { label: "Last 12 Months", value: 366 },
  ];

  const [selectedStatusFilter, setSelectedStatusFilter] =
    useState<StatusFilterType>(statusFilters[0]);
  const [selectedCreatedFilter, setSelectedCreatedFilter] = useState<any>(
    createdFilter[0]
  );
  const [selectedResolutionFilter, setSelectedResolutionFilter] =
    useState<ResoltionFilterType>(resolutionFilters[0]);

  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  function performSearch() {
    if (searchQuery.trim() === "") {
      setDocuments(originalDocuments);
    } else {
      const filteredDocs = originalDocuments.filter(
        (document: any) =>
          document.reportid?.includes(searchQuery) ||
          document.typeOfIncident
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setDocuments(filteredDocs);
    }
  }

  function handleEnterKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      performSearch();
    }
  }

  const loadDocuments = async () => {
    setLoading(true);
    if (!documents.length) setLoading(true);
    getDocuments().then((res: any) => {
      res.json().then((j: any) => {
        setDocuments(j);
        setOriginalDocuments(j);
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    loadDocuments().finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setFilteredDocuments(filterDocuments(documents));
  }, [
    documents,
    selectedStatusFilter,
    selectedCreatedFilter,
    selectedResolutionFilter,
  ]);

  function filterDocuments(docs: any[]): any[] {
    let filteredDocs = docs;

    if (selectedStatusFilter.value !== "ALL") {
      console.log(filteredDocs);
      filteredDocs = filteredDocs.filter(
        (d: any) => d.status === selectedStatusFilter.label
      );
    }
    console.log(selectedResolutionFilter.value);
    if (selectedResolutionFilter.value !== "ALL") {
      filteredDocs = filteredDocs.filter((d: any) => {
        if (selectedResolutionFilter.value === "Resolved") {
          return d.resolved === true;
        } else {
          return d.resolved !== true;
        }
      });
    }

    filteredDocs = filteredDocs.filter((doc: any) =>
      wasXDaysAgoOrLess(
        switchMonthAndDate(doc.dateOfIncident),
        selectedCreatedFilter.value
      )
    );
    // return the filtered documents after reversing the order
    filteredDocs.reverse();

    return filteredDocs;
  }

  function handleStatusFilterChange(status: StatusFilterType) {
    setSelectedStatusFilter(status);
  }

  function handleResolutionFilterChange(resolution: ResoltionFilterType) {
    setSelectedResolutionFilter(resolution);
  }

  function wasXDaysAgoOrLess(documentDate: Date, lastXDays: number): boolean {
    if (lastXDays < 0) return true;
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const today: Date = new Date();

    const diffInDays = Math.floor(
      (today.getTime() - documentDate.getTime()) / millisecondsInDay
    );

    return diffInDays <= lastXDays;
  }
  function switchMonthAndDate(dateString: string): Date {
    // Split the date string into parts (assuming format is MM/DD/YYYY)
    const [month, day, year] = dateString.split("/");

    // Rearrange the parts to format them as DD/MM/YYYY
    const formattedDate = `${day}/${month}/${year}`;

    // Return a new Date object with the rearranged date string
    return new Date(formattedDate);
  }
  return (
    <>
      <div className="flex h-full flex-col justify-between space-y-6 px-4 lg:pt-[30px] lg:px-0 pb-24 md:pb-0 bg-[#f3f3f3]">
        <div className="flex justify-center flex-row">
          <div
            className="text-4xl text-red-600 mb-6 "
            style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
          >
            Guardian Line Crime Reports
          </div>
        </div>
        <div className="flex justify-center">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
              onChange={handleSearchInputChange}
              onKeyDown={handleEnterKeyPress} // Add this line
            />
          </div>
          <div
            className="flex justify-end flex-row w-[70vw]"
            style={{ marginTop: 0 }}
          >
            <div className="relative mr-2">
              <button
                className={`font-poppins h-10 w-max rounded-full bg-white p-2 text-[16px] font-medium text-[#0943F1] md:h-[55px] md:p-4 `}
                onClick={() =>
                  setShowResolutionFilterOptions(!showResolutionFilterOptions)
                }
              >
                <div className="flex items-center justify-center gap-2">
                  Resolution <img src="/ControlDownIcon.svg" alt="" />
                </div>
              </button>
              {showResolutionFilterOptions && (
                <ul className="font-poppins absolute my-2 w-max rounded-2xl border bg-gray-50 p-2 text-[16px] font-medium z-[51]">
                  {resolutionFilters.map((status, index) => (
                    <li
                      key={index}
                      className={`m-3 cursor-pointer rounded-full px-4 py-3 text-[#0943F3] ${
                        selectedResolutionFilter.value === status.value
                          ? "bg-blue-500 text-white"
                          : "bg-white hover:bg-[#1146f3] hover:text-white"
                      }`}
                      onClick={() => {
                        handleResolutionFilterChange(status);
                        setShowResolutionFilterOptions(false);
                      }}
                    >
                      {status.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative mr-2">
              <button
                className={`font-poppins h-10 w-max rounded-full bg-white p-2 text-[16px] font-medium text-[#0943F1] md:h-[55px] md:p-4 `}
                onClick={() =>
                  setShowStatusFilterOptions(!showStatusFilterOptions)
                }
              >
                <div className="flex items-center justify-center gap-2">
                  Status <img src="/ControlDownIcon.svg" alt="" />
                </div>
              </button>
              {showStatusFilterOptions && (
                <ul className="font-poppins absolute my-2 w-max rounded-2xl border bg-gray-50 p-2 text-[16px] font-medium z-[51]">
                  {statusFilters.map((status, index) => (
                    <li
                      key={index}
                      className={`m-3 cursor-pointer rounded-full px-4 py-3 text-[#0943F3] ${
                        selectedStatusFilter.value === status.value
                          ? "bg-blue-500 text-white"
                          : "bg-white hover:bg-[#1146f3] hover:text-white"
                      }`}
                      onClick={() => {
                        handleStatusFilterChange(status);
                        setShowStatusFilterOptions(false);
                      }}
                    >
                      {status.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="relative">
              <button
                className={`font-poppins h-10 w-max rounded-full bg-white p-2 text-[16px] font-medium text-[#0943F1] md:h-[55px] md:p-4`}
                onClick={() =>
                  setShowCreatedFilterOptions(!showCreatedFilterOptions)
                }
              >
                <div className="flex items-center justify-center gap-3">
                  Created <img src="/ControlDownIcon.svg" alt="" />
                </div>
              </button>
              {showCreatedFilterOptions && (
                <ul className="font-poppins absolute my-2 w-max rounded-2xl border bg-gray-50 p-2 text-[16px] font-medium z-[51]">
                  {createdFilter.map((created, index) => (
                    <li
                      key={index}
                      className={`m-3 cursor-pointer rounded-full px-4 py-3 text-[#0943F3] ${
                        selectedCreatedFilter.value === created.value
                          ? "bg-blue-500 text-white"
                          : "bg-white hover:bg-[#1146f3] hover:text-white"
                      }`}
                      onClick={() => {
                        setSelectedCreatedFilter(created);
                        setShowCreatedFilterOptions(false);
                      }}
                    >
                      {created.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center h-[72.4vh] w-full items-center">
            <p>Loading...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="flex justify-center h-[72.4vh] w-full items-center">
            <div>Welcome to the Crime list</div>
          </div>
        ) : (
          <ReportListTable documentsData={filteredDocuments} />
        )}
      </div>
    </>
  );
};

export default Page;
