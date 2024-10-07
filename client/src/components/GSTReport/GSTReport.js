
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import '../styles/main.css';

// function GSTReport() {
//   const [reportData, setReportData] = useState(null);
//   const [dateRange, setDateRange] = useState({ start: '', end: '' });

//   useEffect(() => {
//     fetchReportData();
//   }, []);

//   const fetchReportData = async () => {
//     try {
//       const response = await axios.get('https://gst-system-backend-admin.onrender.com/api/reports', { params: dateRange });
//       setReportData(response.data);
//     } catch (error) {
//       console.error('Error fetching report data:', error);
//     }
//   };

//   const handleDateChange = (e) => {
//     setDateRange({ ...dateRange, [e.target.name]: e.target.value });
//   };

//   const handleGenerateReport = (e) => {
//     e.preventDefault();
//     fetchReportData();
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text('GST Report', 20, 10);

//     const tableColumn = ['Metric', 'Value'];
//     const tableRows = [
//       ['Total GST Collected', `₹${reportData.totalGSTCollected.toFixed(2)}`],
//       ['Number of Invoices', reportData.totalInvoices],
//       ['Paid Invoices', reportData.paidInvoices],
//       ['Pending Invoices', reportData.pendingInvoices],
//     ];

//     doc.autoTable(tableColumn, tableRows, { startY: 20 });

//     doc.save('gst_report.pdf');
//   };

//   if (!reportData) return <div>Loading...</div>;

//   return (
//     <div className="gst-report">
//       <h2>GST Report</h2>
//       <div className="report-container">
//         <form onSubmit={handleGenerateReport}>
//           <div className="input-group">
//             <label htmlFor="start">Start Date:</label>
//             <input
//               type="date"
//               id="start"
//               name="start"
//               value={dateRange.start}
//               onChange={handleDateChange}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="end">End Date:</label>
//             <input
//               type="date"
//               id="end"
//               name="end"
//               value={dateRange.end}
//               onChange={handleDateChange}
//             />
//           </div>
//           <button type="submit">Generate Report</button>
//           <button type="button" onClick={exportToPDF}>Export Report to PDF</button>
//         </form>
//         <div className="report-summary">
//           <h3>Report Summary</h3>
//           <p>Total GST Collected: ₹{reportData.totalGSTCollected.toFixed(2)}</p>
//           <p>Number of Invoices: {reportData.totalInvoices}</p>
//           <p>Paid Invoices: {reportData.paidInvoices}</p>
//           <p>Pending Invoices: {reportData.pendingInvoices}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GSTReport;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import '../../styles/main.css';
// import * as XLSX from 'xlsx';
// import { FaFilePdf, FaFileCsv, FaFileExcel } from 'react-icons/fa';

// function GSTReport() {
//   const [reportData, setReportData] = useState(null);
//   const [dateRange, setDateRange] = useState({ start: '', end: '' });

//   useEffect(() => {
//     fetchReportData();
//   }, []);

//   const fetchReportData = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/reports', { params: dateRange });
//       setReportData(response.data);
//     } catch (error) {
//       console.error('Error fetching report data:', error);
//     }
//   };

//   const handleDateChange = (e) => {
//     setDateRange({ ...dateRange, [e.target.name]: e.target.value });
//   };

//   const handleGenerateReport = (e) => {
//     e.preventDefault();
//     fetchReportData();
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text('GST Report', 20, 10);

//     const tableColumn = ['Metric', 'Value'];
//     const tableRows = [
//       ['Total GST Collected', `₹${reportData.totalGSTCollected.toFixed(2)}`],
//       ['Number of Invoices', reportData.totalInvoices],
//       ['Paid Invoices', reportData.paidInvoices],
//       ['Pending Invoices', reportData.pendingInvoices],
//     ];

//     doc.autoTable(tableColumn, tableRows, { startY: 20 });
//     doc.save('gst_report.pdf');
//   };

//   const exportToCSV = () => {
//     const csvData = [
//       ['Metric', 'Value'],
//       ['Total GST Collected', reportData.totalGSTCollected.toFixed(2)],
//       ['Number of Invoices', reportData.totalInvoices],
//       ['Paid Invoices', reportData.paidInvoices],
//       ['Pending Invoices', reportData.pendingInvoices],
//     ];

//     const csvString = csvData.map(row => row.join(',')).join('\n');
//     const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     if (link.download !== undefined) {
//       const url = URL.createObjectURL(blob);
//       link.setAttribute('href', url);
//       link.setAttribute('download', 'gst_report.csv');
//       link.style.visibility = 'hidden';
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   const exportToExcel = () => {
//     const wsData = [
//       ['Metric', 'Value'],
//       ['Total GST Collected', reportData.totalGSTCollected],
//       ['Number of Invoices', reportData.totalInvoices],
//       ['Paid Invoices', reportData.paidInvoices],
//       ['Pending Invoices', reportData.pendingInvoices],
//     ];

//     const ws = XLSX.utils.aoa_to_sheet(wsData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'GST Report');
//     XLSX.writeFile(wb, 'gst_report.xlsx');
//   };

//   if (!reportData) return <div>Loading...</div>;

//   return (
//     <div className="gst-report">
//       <h2>GST Report</h2>
//       <div className="report-container">
//         <form onSubmit={handleGenerateReport}>
//           <div className="input-group">
//             <label htmlFor="start">Start Date:</label>
//             <input
//               type="date"
//               id="start"
//               name="start"
//               value={dateRange.start}
//               onChange={handleDateChange}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="end">End Date:</label>
//             <input
//               type="date"
//               id="end"
//               name="end"
//               value={dateRange.end}
//               onChange={handleDateChange}
//             />
//           </div>
//           <button type="submit">Generate Report</button>
//           <button type="button" onClick={exportToPDF}>
//             <FaFilePdf /> Export to PDF
//           </button>
//           <button type="button" onClick={exportToCSV}>
//             <FaFileCsv /> Export to CSV
//           </button>
//           <button type="button" onClick={exportToExcel}>
//             <FaFileExcel /> Export to Excel
//           </button>
//         </form>
//         <div className="report-summary">
//           <h3>Report Summary</h3>
//           <p>Total GST Collected: ₹{reportData.totalGSTCollected.toFixed(2)}</p>
//           <p>Number of Invoices: {reportData.totalInvoices}</p>
//           <p>Paid Invoices: {reportData.paidInvoices}</p>
//           <p>Pending Invoices: {reportData.pendingInvoices}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GSTReport;
import React, { useState, useEffect } from 'react';
import '../../styles/main.css';
import { FaFilePdf, FaFileCsv, FaFileExcel } from 'react-icons/fa';
import api from '../../services/api';

function GSTReport() {
  const [reportData, setReportData] = useState(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const data = await api.getReportData(dateRange);
      setReportData(data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleGenerateReport = (e) => {
    e.preventDefault();
    fetchReportData();
  };

  if (!reportData) return <div>Loading...</div>;

  return (
    <div className="gst-report">
      <h2>GST Report</h2>
      <div className="report-container">
        <form onSubmit={handleGenerateReport}>
          <div className="input-group">
            <label htmlFor="start">Start Date:</label>
            <input
              type="date"
              id="start"
              name="start"
              value={dateRange.start}
              onChange={handleDateChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="end">End Date:</label>
            <input
              type="date"
              id="end"
              name="end"
              value={dateRange.end}
              onChange={handleDateChange}
            />
          </div>
          <button type="submit">Generate Report</button>
          <button type="button" onClick={() => api.exportToPDF(reportData)}>
            <FaFilePdf /> Export to PDF
          </button>
          <button type="button" onClick={() => api.exportToCSV(reportData)}>
            <FaFileCsv /> Export to CSV
          </button>
          <button type="button" onClick={() => api.exportToExcel(reportData)}>
            <FaFileExcel /> Export to Excel
          </button>
        </form>
        <div className="report-summary">
          <h3>Report Summary</h3>
          <p>Total GST Collected: ₹{reportData.totalGSTCollected.toFixed(2)}</p>
          <p>Number of Invoices: {reportData.totalInvoices}</p>
          <p>Paid Invoices: {reportData.paidInvoices}</p>
          <p>Pending Invoices: {reportData.pendingInvoices}</p>
        </div>
      </div>
    </div>
  );
}

export default GSTReport;