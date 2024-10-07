
// services/api.js

import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const API_BASE_URL = 'http://localhost:5000/api';

const api = {
  // Dashboard methods
  getDashboardData: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  },

  getInvoices: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/invoices`);
      return response.data;
    } catch (error) {
      console.error('Error fetching invoices:', error);
      throw error;
    }
  },

  updateInvoiceStatus: async (invoiceId, newStatus) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/invoices/${invoiceId}`, { status: newStatus });
      return response.data;
    } catch (error) {
      console.error('Error updating invoice status:', error);
      throw error;
    }
  },

  // GSTReport methods
  getReportData: async (dateRange) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports`, { params: dateRange });
      return response.data;
    } catch (error) {
      console.error('Error fetching report data:', error);
      throw error;
    }
  },

  exportToPDF: (reportData) => {
    const doc = new jsPDF();
    doc.text('GST Report', 20, 10);

    const tableColumn = ['Metric', 'Value'];
    const tableRows = [
      ['Total GST Collected', `₹${reportData.totalGSTCollected.toFixed(2)}`],
      ['Number of Invoices', reportData.totalInvoices],
      ['Paid Invoices', reportData.paidInvoices],
      ['Pending Invoices', reportData.pendingInvoices],
    ];

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save('gst_report.pdf');
  },

  exportToCSV: (reportData) => {
    const csvData = [
      ['Metric', 'Value'],
      ['Total GST Collected', reportData.totalGSTCollected.toFixed(2)],
      ['Number of Invoices', reportData.totalInvoices],
      ['Paid Invoices', reportData.paidInvoices],
      ['Pending Invoices', reportData.pendingInvoices],
    ];

    const csvString = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'gst_report.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  },

  exportToExcel: (reportData) => {
    const wsData = [
      ['Metric', 'Value'],
      ['Total GST Collected', reportData.totalGSTCollected],
      ['Number of Invoices', reportData.totalInvoices],
      ['Paid Invoices', reportData.paidInvoices],
      ['Pending Invoices', reportData.pendingInvoices],
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'GST Report');
    XLSX.writeFile(wb, 'gst_report.xlsx');
  },

  // PaymentTracker methods
  getPayments: async (filter) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/payments`, { params: { filter } });
      return response.data;
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  },

  // ReminderSidebar methods
  updateReminderSettings: async (reminderDays) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/settings`, { reminderDays });
      return response.data;
    } catch (error) {
      console.error('Error updating reminder settings:', error);
      throw error;
    }
  },

  sendJobAlert: async (jobAlert) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/job-alerts`, jobAlert);
      return response.data;
    } catch (error) {
      console.error('Error sending job alert:', error);
      throw error;
    }
  },

  // InvoiceForm methods
  createInvoice: async (invoiceData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/invoices`, invoiceData);
      return response.data;
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  },


  // User methods
  getUsers: async ({ page = 1, search = "" } = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/usersSS`, { params: { page, search } });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/usersSS/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  approveCertification: async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/usersSS/${id}/approve-certification`);
      return response.data;
    } catch (error) {
      console.error('Error approving certification:', error);
      throw error;
    }
  },

  rejectCertification: async (id, reason) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/usersSS/${id}/reject-certification`, { reason });
      return response.data;
    } catch (error) {
      console.error('Error rejecting certification:', error);
      throw error;
    }
  },

  verifyUser: async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/usersSS/${id}/verify`);
      return response.data;
    } catch (error) {
      console.error('Error verifying user:', error);
      throw error;
    }
  },

  // Recruiter methods
  getRecruiters: async ({ page = 1, status = "all", search = "" } = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/recruiters`, { params: { page, status, search } });
      return response.data;
    } catch (error) {
      console.error('Error fetching recruiters:', error);
      throw error;
    }
  },

  approveRecruiter: async (id, reason) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/recruiters/approve`, { id, reason });
      return response.data;
    } catch (error) {
      console.error('Error approving recruiter:', error);
      throw error;
    }
  },

  rejectRecruiter: async (id, reason) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/recruiters/reject`, { id, reason });
      return response.data;
    } catch (error) {
      console.error('Error rejecting recruiter:', error);
      throw error;
    }
  },

  verifyRecruiter: async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/recruiters/verify/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error verifying recruiter:', error);
      throw error;
    }
  },

// SystemSettings methods
getSystemSettings: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/system-settings`);
      return response.data;
    } catch (error) {
      console.error('Error fetching system settings:', error);
      throw error;
    }
  },

  updateSystemSettings: async (settings) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/system-settings`, settings);
      return response.data;
    } catch (error) {
      console.error('Error updating system settings:', error);
      throw error;
    }
  },

  // New methods for generating keys (these would typically be done server-side)
  generateNewKey: () => {
    return Math.random().toString(36).substr(2, 24);
  },
};

export default api;