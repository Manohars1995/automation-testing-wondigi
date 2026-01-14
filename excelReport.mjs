import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/* ================= PATH FIX ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= REPORT DIR ================= */
const REPORT_DIR = path.join(__dirname, "reports");
if (!fs.existsSync(REPORT_DIR)) fs.mkdirSync(REPORT_DIR);

/* ================= HELPERS ================= */

function normalizeId(title) {
  if (!title) return null;

  // Cypress can send title as string OR array
  const text = Array.isArray(title) ? title.join(" ") : String(title);

  const match = text.match(/(DI|ST|TC|BD|LP|DB|AS|AC|EN)_?(\d+)/i);
  if (!match) return null;

  return `${match[1].toUpperCase()}${match[2].padStart(3, "0")}`;
}


async function createExcel(testData, results, fileName) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(testData.module);

  /* ===== HEADER ===== */
  sheet.mergeCells("A1:G1");
  sheet.getCell("A1").value = `Project Name : ${testData.project.name}`;
  sheet.getCell("A1").font = { bold: true };

  sheet.mergeCells("A2:G2");
  sheet.getCell("A2").value = `Website URL : ${testData.project.url}`;

  sheet.mergeCells("A3:G3");
  sheet.getCell("A3").value = `Executed By : ${testData.project.executedBy}`;

  sheet.mergeCells("A4:G4");
  sheet.getCell("A4").value = `Execution Date : ${new Date().toLocaleString()}`;

  sheet.mergeCells("A6:G6");
  sheet.getCell("A6").value = testData.project.build;
  sheet.getCell("A6").font = { bold: true };

  sheet.mergeCells("A8:G8");
  sheet.getCell("A8").value = testData.module;
  sheet.getCell("A8").font = { bold: true };
  sheet.getCell("A8").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFCC00" }
  };

  /* ===== TABLE HEADER ===== */
  sheet.addRow([
    "Test Case ID",
    "Test Scenario",
    "Test Steps",
    "Expected Result",
    "Actual Result",
    "Pass/Fail",
    "Comments"
  ]).font = { bold: true };

  sheet.columns = [
    { width: 15 },
    { width: 35 },
    { width: 55 },
    { width: 45 },
    { width: 30 },
    { width: 12 },
    { width: 20 }
  ];

  /* ===== MAP RESULTS ===== */
  const resultMap = {};
  results.runs.forEach(run => {
    run.tests.forEach(test => {
      const id = normalizeId(test.title);
      if (id) resultMap[id] = test;
    });
  });

  /* ===== WRITE ROWS ===== */
  testData.testcases.forEach(tc => {
    const res = resultMap[tc.id];
    const passed = res && res.state === "passed";

    const row = sheet.addRow([
      tc.id,
      tc.scenario,
      tc.steps,
      tc.expected,
      passed
        ? "Executed successfully"
        : (res?.displayError || "Execution failed"),
      passed ? "PASS" : "FAIL",
      ""
    ]);

    row.getCell(6).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: passed ? "FF00FF00" : "FFFF0000" }
    };

    row.getCell(6).font = { bold: true };
    row.getCell(6).alignment = { horizontal: "center" };
  });

  const filePath = path.join(REPORT_DIR, fileName);
  await workbook.xlsx.writeFile(filePath);
}

/* ================= MAIN ================= */

export default async function generateExcel(results) {
  const executedSpecs = results.runs.map(r => r.spec.name).join(",");

  // BOOK DEMO
  if (executedSpecs.includes("bookDemo")) {
    const bookDemoData = JSON.parse(
      fs.readFileSync("testcases/bookDemo.testcases.json", "utf-8")
    );
    await createExcel(bookDemoData, results, "Book_Demo_Report.xlsx");
    console.log("✅ Book Demo Excel generated");
  }

  // LOGIN
  if (executedSpecs.includes("login")) {
    const loginData = JSON.parse(
      fs.readFileSync("testcases/login.testcases.json", "utf-8")
    );
    await createExcel(loginData, results, "Login_Page_Report.xlsx");
    console.log("✅ Login Page Excel generated");
  }

  // DASHBOARD
  if (executedSpecs.includes("dashboard")) {
    const dashboardData = JSON.parse(
      fs.readFileSync("testcases/dashboard.testcases.json", "utf-8")
    );
    await createExcel(dashboardData, results, "Dashboard_Report.xlsx");
    console.log("✅ Dashboard Excel generated");
  }
    // STAFF MODULE ONLY
  if (executedSpecs.includes("staff")) {
    const staffData = JSON.parse(
      fs.readFileSync("testcases/staff.testcases.json", "utf-8")
    );

    await createExcel(staffData, results, "Staff_Report.xlsx");

    console.log("✅ Staff Excel generated: Staff_Report.xlsx");
  }
    /* ===== STUDENTS MODULE ===== */
  if (executedSpecs.includes("students")) {
    const studentsData = JSON.parse(
      fs.readFileSync("testcases/students.testcases.json", "utf-8")
    );

    await createExcel(
      studentsData,
      results,
      "Students_Report.xlsx"
    );

    console.log("✅ Students Excel generated");
  }
 /* ===== ROLES MODULE (NEW) ===== */
  if (executedSpecs.includes("roles")) {
    const rolesData = JSON.parse(
      fs.readFileSync("testcases/roles.testcases.json", "utf-8")
    );
    await createExcel(rolesData, results, "Roles_Report.xlsx");
    console.log("✅ Roles Excel generated");
  }
  // SERVICES MODULE
if (executedSpecs.includes("services")) {
  const servicesData = JSON.parse(
    fs.readFileSync("testcases/services.testcases.json", "utf-8")
  );
  await createExcel(servicesData, results, "Services_Report.xlsx");
  console.log("✅ Services Excel generated");
}
// ADD THIS BLOCK AT THE END (do not remove existing code)

if (executedSpecs.includes("department")) {
  const departmentData = JSON.parse(
    fs.readFileSync("testcases/department.testcases.json", "utf-8")
  );

  await createExcel(
    departmentData,
    results,
    "Department_Report.xlsx"
  );

  console.log("✅ Department Excel generated");
}
// ADD THIS BLOCK AT THE END (do not remove existing code)

if (executedSpecs.includes("timetable")) {
  const timetableData = JSON.parse(
    fs.readFileSync("testcases/timetable.testcases.json", "utf-8")
  );

  await createExcel(
    timetableData,
    results,
    "TimeTable_Report.xlsx"
  );

  console.log("✅ TimeTable Excel generated");
}
/* ===== ENQUIRY MODULE ===== */
if (executedSpecs.includes("enquiry")) {
  const enquiryData = JSON.parse(
    fs.readFileSync("testcases/enquiry.testcases.json", "utf-8")
  );

  await createExcel(
    enquiryData,
    results,
    "Enquiry_Report.xlsx"
  );

  console.log("✅ Enquiry Excel generated");
}
// BILLING MODULE
if (executedSpecs.includes("billing")) {
  const billingData = JSON.parse(
    fs.readFileSync("testcases/billing.testcases.json", "utf-8")
  );
  await createExcel(billingData, results, "Billing_Report.xlsx");
  console.log("✅ Billing Excel generated");
}

  
  const academicsData = JSON.parse(
    fs.readFileSync("testcases/academics.testcases.json", "utf-8")
  );

  await createExcel(
    academicsData,
    results,
    "Academics_Attendance_Report.xlsx"
  );

  console.log("✅ Academics Attendance Excel generated");
 if (executedSpecs.includes("diary")) {
  const diaryData = JSON.parse(
    fs.readFileSync("testcases/diary.testcases.json", "utf-8")
  );

  await createExcel(
    diaryData,
    results,
    "Diary_Report.xlsx"
  );

  console.log("✅ Diary Excel generated");
}

if (executedSpecs.includes("classnotes")) {
  const classNotesData = JSON.parse(
    fs.readFileSync("testcases/classnotes.testcases.json", "utf-8")
  );
  await createExcel(classNotesData, results, "ClassNotes_Report.xlsx");
  console.log("✅ Class Notes Excel generated");
}
if (executedSpecs.includes("examinations")) {
  const examData = JSON.parse(
    fs.readFileSync("testcases/examinations.testcases.json", "utf-8")
  );
  await createExcel(examData, results, "Examinations_Report.xlsx");
  console.log("✅ Examinations Excel generated");
}
if (executedSpecs.includes("academics")) {
  const academicsData = JSON.parse(
    fs.readFileSync("testcases/academics.testcases.json", "utf-8")
  );

  await createExcel(
    academicsData,
    results,
    "Academics_Attendance_Report.xlsx"
  );

  console.log("✅ Academics Attendance Excel generated");
}
if (executedSpecs.includes("results")) {
  const resultsData = JSON.parse(
    fs.readFileSync("testcases/results.testcases.json", "utf-8")
  );
  await createExcel(resultsData, results, "Results_Report.xlsx");
  console.log("✅ Results Excel generated");
}
if (executedSpecs.includes("circulars")) {
  const circularsData = JSON.parse(
    fs.readFileSync("testcases/circulars.testcases.json", "utf-8")
  );
  await createExcel(circularsData, results, "Circulars_Report.xlsx");
  console.log("✅ Circulars Excel generated");
}
// TRANSPORTATION MODULE (NEW – SAFE ADDITION)
if (executedSpecs.includes("transportation")) {
  const transportationData = JSON.parse(
    fs.readFileSync("testcases/transportation.testcases.json", "utf-8")
  );

  await createExcel(
    transportationData,
    results,
    "Transportation_Report.xlsx"
  );

  console.log("✅ Transportation Excel generated");
}
/* ===== LIBRARY MODULE ===== */
if (executedSpecs.includes("library")) {
  const libraryData = JSON.parse(
    fs.readFileSync("testcases/library.testcases.json", "utf-8")
  );

  await createExcel(
    libraryData,
    results,
    "Library_Report.xlsx"
  );

  console.log("✅ Library Excel generated");
}
// INVENTORY MODULE
if (executedSpecs.includes("inventory")) {
  const inventoryData = JSON.parse(
    fs.readFileSync("testcases/inventory.testcases.json", "utf-8")
  );

  await createExcel(
    inventoryData,
    results,
    "Inventory_Report.xlsx"
  );

  console.log("✅ Inventory Excel generated");
}
// ADD THIS BLOCK AT END – DO NOT REMOVE EXISTING CODE

if (executedSpecs.includes("care")) {
  const careData = JSON.parse(
    fs.readFileSync("testcases/care.testcases.json", "utf-8")
  );

  await createExcel(
    careData,
    results,
    "Care_Report.xlsx"
  );

  console.log("✅ Care Excel generated");
}
// ================= CALENDAR MODULE =================
if (executedSpecs.includes("calendar")) {
  const calendarData = JSON.parse(
    fs.readFileSync("testcases/calendar.testcases.json", "utf-8")
  );

  await createExcel(
    calendarData,
    results,
    "Calendar_Report.xlsx"
  );

  console.log("✅ Calendar Excel generated");
}

// ================= SETTINGS MODULE EXCEL REPORT =================
if (executedSpecs.includes("settings")) {
  const settingsData = JSON.parse(
    fs.readFileSync("testcases/settings.testcases.json", "utf-8")
  );

  await createExcel(
    settingsData,
    results,
    "Settings_Report.xlsx"
  );

  console.log("✅ Settings Excel generated");
}

}
