import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


const CvViewer = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Currículum de Lucas Mateo Leis</h2>
      <Document file={`${process.env.PUBLIC_URL}/Lucas_Mateo_Leis.pdf`}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default CvViewer;
