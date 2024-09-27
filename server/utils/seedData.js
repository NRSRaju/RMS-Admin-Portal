const bcrypt = require('bcryptjs');
const Invoice = require('../models/Invoice');
const Payment = require('../models/Payment');
const User = require('../models/User');
const { addDays } = require('./dateUtils');

exports.seedData = async () => {
  try {
    // Clear existing data
    await Invoice.deleteMany();
    await Payment.deleteMany();
    await User.deleteMany();
  
    const recruiters = await User.insertMany([
      { name: 'John Doe', password: await bcrypt.hash('john123', 10), email: 'john@example.com', role: 'recruiter' },
      { name: 'Jane Smith', password: await bcrypt.hash('jane123', 10), email: 'jane@example.com', role: 'recruiter' },
      { name: 'Bob Johnson', password: await bcrypt.hash('bob123', 10), email: 'bob@example.com', role: 'recruiter' },
    ]);

    const today = new Date();
    const invoices = await Invoice.insertMany([
      {
        recruiter: recruiters[0]._id,
        amount: 1000,
        gstAmount: 100,
        dueDate: addDays(today, 14),
        status: 'pending',
      },
      {
        recruiter: recruiters[1]._id,
        amount: 1500,
        gstAmount: 150,
        dueDate: addDays(today, 30),
        status: 'pending',
      },
      {
        recruiter: recruiters[2]._id,
        amount: 2000,
        gstAmount: 200,
        dueDate: addDays(today, 7),
        status: 'paid',
      },
      {
        recruiter: recruiters[0]._id,
        amount: 1200,
        gstAmount: 120,
        dueDate: addDays(today, 45),
        status: 'pending',
      },
      {
        recruiter: recruiters[1]._id,
        amount: 1800,
        gstAmount: 180,
        dueDate: addDays(today, 21),
        status: 'pending',
      },
      {
        recruiter: recruiters[2]._id,
        amount: 2200,
        gstAmount: 220,
        dueDate: addDays(today, 60),
        status: 'pending',
      },
    ]);

    if (invoices.length === 0) {
      console.log('No invoices found, please seed invoice data first.');
      return;
    }

    const payments = [
      {
        invoiceID: invoices[0]._id,
        amount: invoices[0].amount,
        status: 'success',
      },
      {
        invoiceID: invoices[1]._id,
        amount: invoices[1].amount,
        status: 'success',
      },
      {
        invoiceID: invoices[2]._id,
        amount: invoices[2].amount,
        status: 'failed',
      },
    ];

    await Payment.insertMany(payments);

    console.log('Dummy data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};