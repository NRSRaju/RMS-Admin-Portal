const express = require('express');
const Invoice = require('../models/Invoice');
const User = require('../models/User');
const { calculateGST } = require('../services/gstService');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/invoices', async (req, res) => {
  try {
    const { recruiterName, amount, dueDate } = req.body;

    if (!recruiterName || !amount || !dueDate) {
      return res.status(400).json({ message: 'Recruiter name, amount, and due date are required' });
    }

    const recruiter = await User.findOne({ name: recruiterName });
    if (!recruiter) {
      return res.status(400).json({ message: 'Recruiter not found' });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const dueDateObj = new Date(dueDate);
    if (isNaN(dueDateObj.getTime())) {
      return res.status(400).json({ message: 'Invalid due date' });
    }

    const gstAmount = calculateGST(amount);

    const newInvoice = new Invoice({
      recruiter: recruiter._id,
      amount,
      gstAmount,
      dueDate: dueDateObj,
    });

    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (error) {
    console.error('Error creating invoice:', error.message);
    res.status(400).json({ message: 'Error creating invoice: ' + error.message });
  }
});

router.put('/invoices/:id', async (req, res) => {
  console.log('Received PUT request for invoice:', req.params.id);
  console.log('New status:', req.body.status);
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(updatedInvoice);
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ message: 'Error updating invoice status', error: error.message });
  }
});

router.get('/invoices', async (req, res) => {
  try {
    const { status, recruiterId } = req.query;
    let query = {};

    if (status) query.status = status;
    if (recruiterId) query.recruiter = recruiterId;

    const invoices = await Invoice.find(query).populate('recruiter');
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;