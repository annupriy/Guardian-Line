'use client'
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReportListTable from "@/app/Components/ReportListTable";
import { get } from "http";
type DocumentStatus = "RESOLVED" | "NOT_RESOLVED"; // Define DocumentStatus type

const Page = (props: any) => {
    const router = useRouter();
    const [documents, setDocuments] = useState<any[]>([]);
    const [filteredDocuments, setFilteredDocuments] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [originalDocuments, setOriginalDocuments] = useState<any[]>([]);
    const [showStatusFilterOptions, setShowStatusFilterOptions] = useState<boolean>(false);
    const [showCreatedFilterOptions, setShowCreatedFilterOptions] = useState<boolean>(false);

    const getDocuments = async () => {
        // return a list of dummy documents
        try {
            const response = await fetch(`/api/report_admin`);


            //populate my data in an object format to be used in the table
            // const documents = data.map((item: any) => {
            //     return {
            //         title: item.typeOfIncident,
            //         status: item.descriptionOfIncident,
            //         created: item.incidentLocation,
            //         dateOfIncident: item.dateOfIncident,
            //         timeOfIncident: item.timeOfIncident,
            //         city: item.city,
            //         state: item.state,

            //     };
            // });

            //populate my documents data in this project as given below



            // return Promise.resolve({
            //     json: () => {
            //         return Promise.resolve([
            //             {
            //                 title: "Document 1",
            //                 status: "RESOLVED",
            //                 created: "2022-01-01",
            //             },
            //         ]);
            //     },
            // });
            return response;
        } catch (error) {

        }
    };

    type StatusFilterType = {
        label: string;
        value: "ALL" | DocumentStatus;
    };

    const statusFilters: StatusFilterType[] = [
        { label: "documentFilter.all", value: "ALL" },
        { label: "documentFilter.resolved", value: "RESOLVED" },
        { label: "documentFilter.notresolved", value: "NOT_RESOLVED" },
    ];

    const createdFilter = [
        { label: "createdFilter.allTime", value: -1 },
        { label: "createdFilter.last24Hours", value: 1 },
        { label: "createdFilter.last7Days", value: 7 },
        { label: "createdFilter.last30Days", value: 30 },
        { label: "createdFilter.last3Months", value: 90 },
        { label: "createdFilter.last12Months", value: 366 },
    ];

    const [selectedStatusFilter, setSelectedStatusFilter] = useState<StatusFilterType>(statusFilters[0]);
    const [selectedCreatedFilter, setSelectedCreatedFilter] = useState<any>(createdFilter[0]);

    function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchQuery(event.target.value);
    }

    function performSearch() {
        if (searchQuery.trim() === "") {
            setDocuments(originalDocuments);
        } else {
            const filteredDocs = originalDocuments.filter((document: any) =>
                document.title.toLowerCase().includes(searchQuery.toLowerCase())
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
    }, [documents, selectedStatusFilter, selectedCreatedFilter]);

    function filterDocuments(docs: any[]): any[] {
        let filteredDocs = docs;

        // filteredDocs = filteredDocs?.filter(
        //     (d: any) => d.status === selectedStatusFilter.value || selectedStatusFilter.value === "ALL"
        // );

        filteredDocs = filteredDocs?.filter((doc: any) =>
            wasXDaysAgoOrLess(new Date(doc.created), selectedCreatedFilter.value)
        );

        return filteredDocs;
    }

    function handleStatusFilterChange(status: StatusFilterType) {
        router.push("/documentList?filter=" + status.value.toLowerCase())
        setSelectedStatusFilter(status);
    }

    function wasXDaysAgoOrLess(documentDate: Date, lastXDays: number): boolean {
        if (lastXDays < 0) return true;

        const millisecondsInDay = 24 * 60 * 60 * 1000;
        const today: Date = new Date();

        const diffInDays = Math.floor((today.getTime() - documentDate.getTime()) / millisecondsInDay);

        return diffInDays <= lastXDays;
    }

    return (
        <>
            <div className="flex h-full flex-col justify-between space-y-6 px-4 lg:pt-[30px] lg:px-0 pb-24 md:pb-0 ">
                <div className="flex flex-col justify-between lg:flex-row">
                    <h1 className="font-poppins text-[34px] font-medium text-[#122029] ">
                        documentList
                    </h1>

                    <div className="flex justify-around lg:space-x-6">
                        <div className="relative">
                            <button
                                className={`font-poppins h-10 w-max rounded-full bg-white p-2 text-[16px] font-medium text-[#0943F1] md:h-[55px] md:p-4`}
                                onClick={() => setShowStatusFilterOptions(!showStatusFilterOptions)}>
                                <div className="flex items-center justify-center gap-2">
                                    Status <img src="/newIcons/ControlDownIcon.svg" alt="" />
                                </div>
                            </button>
                            {showStatusFilterOptions && (
                                <ul className="font-poppins absolute my-2 w-max rounded-2xl border bg-gray-50 p-2 text-[16px] font-medium">
                                    {statusFilters.map((status, index) => (
                                        <li
                                            key={index}
                                            className={`m-3 cursor-pointer rounded-full px-4 py-3 text-[#0943F3] ${selectedStatusFilter.value === status.value
                                                ? "bg-blue-500 text-white"
                                                : "bg-white hover:bg-[#1146f3] hover:text-white"
                                                }`}
                                            onClick={() => {
                                                handleStatusFilterChange(status);
                                                setShowStatusFilterOptions(false);
                                            }}>
                                            {status.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                className={`font-poppins h-10 w-max rounded-full bg-white p-2 text-[16px] font-medium text-[#0943F1] md:h-[55px] md:p-4`}
                                onClick={() => setShowCreatedFilterOptions(!showCreatedFilterOptions)}>
                                <div className="flex items-center justify-center gap-3">
                                    Created <img src="/newIcons/ControlDownIcon.svg" alt="" />
                                </div>
                            </button>
                            {showCreatedFilterOptions && (
                                <ul className="font-poppins absolute my-2 w-max rounded-2xl border bg-gray-50 p-2 text-[16px] font-medium">
                                    {createdFilter.map((created, index) => (
                                        <li
                                            key={index}
                                            className={`m-3 cursor-pointer rounded-full px-4 py-3 text-[#0943F3] ${selectedCreatedFilter.value === created.value
                                                ? "bg-blue-500 text-white"
                                                : "bg-white hover:bg-[#1146f3] hover:text-white"
                                                }`}
                                            onClick={() => {
                                                setSelectedCreatedFilter(created);
                                                setShowCreatedFilterOptions(false);
                                            }}>
                                            {created.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <button
                            onClick={() => {
                                document?.getElementById("fileUploadHelper")?.click();
                            }}
                            className={`font-poppins h-10 whitespace-nowrap rounded-full bg-white p-2 text-sm font-medium text-[#0943F1] md:h-[55px] md:p-4 md:text-[16px]`}>
                            addDocuments
                        </button>
                    </div>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : documents.length === 0 ? (
                    <div>Welcome to the document list</div>
                ) : (
                    <ReportListTable documentsData={filteredDocuments} />
                )}
            </div>
        </>
    );


    // function formatDocumentStatus(status: DocumentStatus) {
    //     switch (status) {
    //         case "RESOLVED":
    //             return "resolved";

    //         case "NOT_RESOLVED":
    //             return "Not resolved";
    //     }
    // }


};

export default Page;
