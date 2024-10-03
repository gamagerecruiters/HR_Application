import ErrorHandler from "../middlewares/error.js";
import EmployeeModel from "../models/employee.model.js";
import mongoose from "mongoose"; // Import Mongoose for ObjectId validation
import {
  isAuthorizedAdminAccess,
  isAuthorizedUserAccess,
  isAuthorizedSuperAdminAccess
} from "../services/authService.js";
import fs from "fs";
import path from "path";
import "jspdf-autotable";
import { jsPDF } from "jspdf";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based index
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


// Create employee
export const createEmployeeController = async (req, res, next) => {
  const {
    fullName,
    NICNumber,
    birthDate,
    email,
    jobPosition,
    jobCategory,
    department,
    gender,
    phone,
    company,
    startDate,
    endDate,
  } = req.body;

  try {
    // Verify the Authorized Admin Access
    if (!isAuthorizedAdminAccess(req.user, req.isAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // Validate required fields
    if (
      !fullName ||
      !NICNumber ||
      !birthDate ||
      !email ||
      !jobPosition ||
      !jobCategory ||
      !department ||
      !gender ||
      !company ||
      !startDate
    ) {
      return next(new ErrorHandler(400, "Please provide all required fields!"));
    }

    // Check if the employee already exists
    const existingEmployee = await EmployeeModel.findOne({ email });
    if (existingEmployee) {
      return next(new ErrorHandler(400, "Email is already taken!"));
    }

    // Create a new employee object
    const newEmployee = new EmployeeModel({
      fullName,
      NICNumber,
      birthDate,
      email,
      jobPosition,
      jobCategory,
      department,
      gender,
      phone,
      company,
      startDate,
      endDate,
    });

    // Save the employee to the database
    await newEmployee.save();

    // Respond with success message
    res
      .status(201)
      .json({ success: true, message: "Employee created successfully!" });
  } catch (error) {
    // Handle error
    next(error);
  }
};

// Retrieve all employees
export const getAllEmployeeController = async (req, res, next) => {
  try {
    // Verify the Authorized Admin Access
    if (!isAuthorizedSuperAdminAccess(req.user, req.isSuperAdmin) && !isAuthorizedAdminAccess(req.user, req.isAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // Find all users
    const allEmployee = await EmployeeModel.find();

    if (!allEmployee || allEmployee.length === 0) {
      return res
        .status(404)
        .json({ message: "Employees not found", success: false });
    }

    res.status(200).json({
      message: "Users fetched successfully",
      success: true,
      employees: allEmployee,
    });
  } catch (error) {
    next(error);
  }
};

// Retrieve employee By Id
export const getEmployeeController = async (req, res, next) => {
  const { employeeId } = req.params;
  try {
    // Verify the Authorized Admin Access
    if (!isAuthorizedAdminAccess(req.user, req.isAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    

    // validate
    if (!employeeId) {
      throw new ErrorHandler(400, "Please provide all fields!");
    }

    // Check if employeeId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res
        .status(400)
        .json({ message: "Invalid parameters", success: false });
    }

    // Find employee by Id
    const employee = await EmployeeModel.find({ _id: employeeId });

    // If employee not exist
    if (!employee || employee.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res.status(200).json({
      message: "User fetched successfully",
      success: true,
      employee: employee,
    });
  } catch (error) {
    next(error);
  }
};

// Update Employee by Id
export const updateEmployeeController = async (req, res, next) => {
  const { employeeId } = req.params;
  const {
    fullName,
    NICNumber,
    birthDate,
    email,
    jobPosition,
    jobCategory,
    department,
    gender,
    phone,
    company,
    startDate,
    endDate,
  } = req.body;

  try {
    // Verify the user access (if needed)
    // Replace isAuthorizedUserAccess with your own authorization logic if required
    // Verify the Authorized Admin Access
    if (!isAuthorizedAdminAccess(req.user, req.isAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // validate
    if (!employeeId) {
      throw new ErrorHandler(400, "Please provide all fields!");
    }

    // Check if employeeId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res
        .status(400)
        .json({ message: "Invalid parameters", success: false });
    }

    const employee = await EmployeeModel.findOne({ _id: employeeId });

    if (!employee) {
      res.status(404).json({ message: "Employee Not Found", success: false });
    }

    // Update the employee properties if they are provided in the request body
    if (fullName) employee.fullName = fullName;
    if (NICNumber) employee.NICNumber = NICNumber;
    if (birthDate) employee.birthDate = birthDate;
    if (email) employee.email = email;
    if (jobPosition) employee.jobPosition = jobPosition;
    if (jobCategory) employee.jobCategory = jobCategory;
    if (department) employee.department = department;
    if (gender) employee.gender = gender;
    if (phone) employee.phone = phone;
    if (company) employee.company = company;
    if (startDate) employee.startDate = startDate;
    if (endDate) employee.endDate = endDate;

    await employee.save();

    res.status(200).json({
      message: "Employee Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Delete employee controller function
export const deleteEmployeeController = async (req, res, next) => {
  const { employeeId } = req.params; // Read the employeeId parameter
  try {
    // Verify the Authorized Admin Access
    // Replace isAuthorizedAdminAccess with your own authorization logic if required
    // Verify the Authorized Admin Access
    if (!isAuthorizedAdminAccess(req.user, req.isAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    // Find the employee by id and delete that employee from the database
    const deletedEmployee = await EmployeeModel.findByIdAndDelete({
      _id: employeeId,
    });

    if (!deletedEmployee) {
      return res
        .status(404)
        .json({ message: "Employee not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Employee deleted successfully", success: true });
  } catch (error) {
    next(error);
  }
};

export const generateEmployeeReport = async (req, res, next) => {
  try {
    // Verify the Authorized Admin Access
    if (!isAuthorizedAdminAccess(req.user, req.isAdmin)) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }

    const employees = await EmployeeModel.find({});

    if (!employees.length) {
      return res.status(404).send("No employees found");
    }

    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
    const marginLeft = 10;
    const doc = new jsPDF(orientation, unit, size);

    const title = " Recruited Employees Report ";
    const headers = [
      [
        "",
        "ID",
        "Full Name",
        "Email",
        "Job Position",
        "Job Category",
        "Department",
        "Gender",
        "Phone",
        "Company",
        "Start Date",
        "End Date",
      ],
    ];

    const employeeData = employees.map((employee, index) => [
      ++index,
      employee._id,
      `${employee.fullName}`,
      employee.email,
      employee.jobPosition,
      employee.jobCategory,
      employee.department,
      employee.gender,
      employee.phone || "",
      employee.company,
      formatDate(employee.startDate), // Assuming you have a formatDate function
      formatDate(employee.endDate), // Assuming you have a formatDate function
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: employeeData,
      styles: {
        font: "helvetica",
        textColor: [0, 0, 0],
        setFontSize: 15,
        overflow: "linebreak",
      },
      theme: "striped",
      headStyles: { fillColor: [59, 130, 246] }, // Changing background color of the header
      cellPadding: 5, // Adding padding to cells
    };

    function centerText(doc, text, y) {
      const textWidth =
        (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
      doc.text(text, textOffset, y);
    }

    doc.setFontSize(15);
    centerText(doc, title, 20);
    doc.autoTable(content);

    // Save the PDF to a buffer
    const pdfBuffer = doc.output("arraybuffer");

    // Save the PDF to a file
    const filePath = path.join(__dirname, "../docs", "Employee-Report.pdf");
    fs.writeFileSync(filePath, Buffer.from(pdfBuffer));

    // Set the response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Employee-Report.pdf"
    );

    // Send the PDF buffer as the response
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    return next(error);
  }
};

