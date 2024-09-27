const express = require('express');
const Payment = require('../models/Payment');
const Invoice = require('../models/Invoice');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/payments', async (req, res) => {
  try {
    const { invoiceID, amount, status } = req.body;
    const invoice = await Invoice.findById(invoiceID);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    const payment = new Payment({ invoiceID, amount, status });
    await payment.save();

    if (status === 'success') {
      invoice.status = 'paid';
      await invoice.save();
    }

    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/payments', async (req, res) => {
  try {
    const filter = req.query.filter;
    const query = filter !== 'all' ? { status: filter } : {};
    const payments = await Payment.find(query)
      .populate({
        path: 'invoiceID',
        populate: {
          path: 'recruiter',
          select: 'name'
        }
      });
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;