import fs from "fs";
import path from "path";
import "jspdf-autotable";
import { jsPDF } from "jspdf";
import { fileURLToPath } from "url";
import ApplicationModel from "../models/application.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reportGenerateController = async (req, res, next) => {
  try {
    // Fetch the application from the database using the ID
    const application = await ApplicationModel.findById(req.params.id);

    const applications = await ApplicationModel.find({});

    if (!application && !applications.length) {
      return res.status(404).send("No applications found");
    }

    const unit = "pt";
    const size = "A3";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    const title = "Job Application Report ";
    const headers = [
      [
        "ID",
        "Job Title",
        "Location",
        "Experience level",
        "Job Position",
        "Job Category",
        "Description",
        "Date Posted",
      ],
    ];

    const job = application
      ? [
          [
            application._id,
            application.jobTitle,
            application.location,
            application.experienceLevel,
            application.jobPosition,
            application.jobCategory,
            application.description,
            application.datePosted,
          ],
        ]
      : [];

    const jobs = applications.map((application) => [
      application._id,
      application.jobTitle,
      application.location,
      application.experienceLevel,
      application.jobPosition,
      application.jobCategory,
      application.description,
      application.datePosted,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: job.length ? job : jobs, // Use job if it exists, otherwise use jobs
      styles: {
        font: "helvetica",
        fillcolor: [204, 255, 255],
        textColor: [0, 0, 0],
        setFontSize: 14,
      },
      theme: "striped",
      fontStyle: "bold",
      overflow: "linebreak",
      columnStyles: {
        0: { fillcolor: [0, 123, 255] },
        1: { fillcolor: [108, 117, 125] },
      },
      headStyles: { fillColor: [59, 130, 246] },
    };

    function centerText(doc, text, y) {
      const textWidth =
        (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
      doc.text(text, textOffset, y);
    }

    doc.setFontSize(20);
    centerText(doc, title, 40);
    doc.autoTable(content);

    // Save the PDF to a buffer
    const pdfBuffer = doc.output("arraybuffer");

    // Save the PDF to a file
    const filePath = path.join(__dirname, "../docs", "Job-Application.pdf");
    fs.writeFileSync(filePath, Buffer.from(pdfBuffer));

    // Set the response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Job-Application.pdf"
    );

    // Send the PDF buffer as the response
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while generating the report");
  }
};

export default reportGenerateController;
