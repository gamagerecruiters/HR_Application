import { useState, useCallback } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ReportComponent = () => {
  const [application, setApplication] = useState([]); // Initialize application state

  const exportreport = useCallback(() => {
    console.log("Export PDF");

    const unit = "pt";
    const size = "A3";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    const title = "Job Application Report ";
    const headers = [
      [
        "Job Title",
        "Location",
        "Experience level",
        "Job Position",
        "Job Category",
        "Description",
        "Date Posted",
      ],
    ];

    const job = application.map((Application) => [
      Application.jobTitle,
      Application.location,
      Application.experienceLevel,
      Application.jobPosition,
      Application.jobCategory,
      Application.description,
      Application.datePosted,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: job,
    };
    doc.setFontSize(20);
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Job-Application.pdf");
  }, [application]); // dependency array

  return (
    <div>
      <button onClick={exportreport}>Export PDF</button>
    </div>
  );
};

export default ReportComponent;
