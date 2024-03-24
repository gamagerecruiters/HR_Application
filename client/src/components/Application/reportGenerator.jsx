import { saveAs } from "file-saver";

const generateReport = (applications) => {
  let csvContent = "data:text/csv;charset=utf-8,";
  const headers = ["Name", "Email", "Phone", "Address", "CoverLetter"];
  csvContent += headers.join(",") + "\r\n";

  applications.forEach((application) => {
    const row = [
      application.name,
      application.email,
      application.phone,
      application.address,
      application.coverLetter,
    ];
    csvContent += row.join(",") + "\r\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "report.csv");
  document.body.appendChild(link); // Required for FF

  link.click(); // This will download the data file named "report.csv".
};

export default generateReport;
