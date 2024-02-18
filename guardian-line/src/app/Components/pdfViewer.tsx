"use client";
// import { Viewer, Worker } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";


const PdfViewer = ({ url, type }: { url: string; type: "video" | "image" |"None" }) => {
  if (type === "video") {
    return (
    //   <div className="h-[80vh] w-[70vw]">
    //     <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
    //       <Viewer fileUrl={url} plugins={[defaultLayoutPlugin()]} />
    //     </Worker>
    //   </div>
    <video width="540" height="420" controls preload="none">
    <source src={url} type="video/mp4" />
    <track
      src="/path/to/captions.vtt"
      kind="subtitles"
      srcLang="en"
      label="English"
    />
    Your browser does not support the video tag.
  </video>
    );
  } else if (type === "image") {
    return <img src={url} alt="Image" className="w-full max-h-[80vh]"/>;
  } else {
    return <div>This file cannot be viewed.</div>;
  }
};
export default PdfViewer;