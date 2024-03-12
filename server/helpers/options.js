export const options = {
  format: "A4",
  orientation: "portrait",
  border: "8mm",
  header: {
    height: "15mm",
    contents:
      '<h4 style=" color: red;font-size:20;font-weight:800;text-align:center;">Job Application Report</h4>',
  },
  footer: {
    height: "20mm",
    contents: {
      first: "Cover page",
      2: "Second page", // Any page number is working. 1-based index
      default:
        '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
      last: "Last Page",
    },
  },
};
