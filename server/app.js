
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const nodemailer = require('nodemailer');
// const cron = require('node-cron');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Successfully connected to MongoDB'))
// .catch((error) => console.error('Error connecting to MongoDB:', error));

// // Models
// const InvoiceSchema = new mongoose.Schema({
//   recruiter: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   gstAmount: {
//     type: Number,
//     required: true,
//   },
//   dueDate: {
//     type: Date,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'paid'],
//     default: 'pending',
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Invoice = mongoose.model('Invoice', InvoiceSchema);

// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: ['recruiter', 'admin'],
//     default: 'recruiter',
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const User = mongoose.model('User', UserSchema);

// const PaymentSchema = new mongoose.Schema({
//   invoiceID: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Invoice',
//     required: true,
//   },
//   amount: { type: Number, required: true },
//   status: { type: String, enum: ['pending','success', 'failed'], required: true },
//   transactionDate: { type: Date, default: Date.now },
// });

// const Payment = mongoose.model('Payment', PaymentSchema);

// const SettingsSchema = new mongoose.Schema({
//   reminderDays: {
//     type: Number,
//     default: 7,
//   },
// });

// const Settings = mongoose.model('Settings', SettingsSchema);

// // Services
// const GST_RATE = 0.18; // 18% GST
// const gstCalculator = {
//   calculateGST: (amount) => amount * GST_RATE,
// };

// const reportGenerator = {
//   generateReport: (invoices) => {
//     const totalGSTCollected = invoices.reduce((sum, invoice) => sum + invoice.gstAmount, 0);
//     const pendingInvoices = invoices.filter(invoice => invoice.status === 'pending').length;
//     const paidInvoices = invoices.filter(invoice => invoice.status === 'paid').length;

//     return {
//       totalGSTCollected,
//       totalInvoices: invoices.length,
//       pendingInvoices,
//       paidInvoices,
//     };
//   },
// };

// // Email Service
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendReminderEmail = async (to, invoice) => {
//   await transporter.sendMail({
//     from: process.env.EMAIL_FROM,
//     to,
//     subject: 'GST Payment Reminder',
//     html: `
//       <h1>GST Payment Reminder</h1>
//       <p>Your GST payment of ${invoice.gstAmount} is due on ${invoice.dueDate.toDateString()}.</p>
//       <p>Please ensure timely payment to avoid any penalties.</p>
//     `,
//   });
// };

// const sendAdminAlertEmail = async (to, totalGSTDue) => {
//   await transporter.sendMail({
//     from: process.env.EMAIL_FROM,
//     to,
//     subject: 'GST Payment Alert',
//     html: `
//       <h1>GST Payment Alert</h1>
//       <p>The total GST amount due for payment is ${totalGSTDue}.</p>
//       <p>Please ensure this amount is paid to the government before the deadline.</p>
//     `,
//   });
// };

// // Utility functions
// const addDays = (date, days) => {
//   const result = new Date(date);
//   result.setDate(result.getDate() + days);
//   return result;
// };

// const formatDate = (date) => {
//   return date.toISOString().split('T')[0];
// };

// const isWithinDays = (date, days) => {
//   const now = new Date();
//   const difference = date.getTime() - now.getTime();
//   const daysDifference = difference / (1000 * 3600 * 24);
//   return daysDifference <= days && daysDifference >= 0;
// };

// // Reminder Service

// const sendReminders = async () => {
//   try {
//     const settings = await Settings.findOne();
//     const reminderDays = settings ? settings.reminderDays : 7;

//     const pendingInvoices = await Invoice.find({ status: 'pending' }).populate('recruiter');

//     for (const invoice of pendingInvoices) {
//       if (isWithinDays(invoice.dueDate, reminderDays)) {
//         await sendReminderEmail(invoice.recruiter.email, invoice);
//       }
//     }
//   } catch (error) {
//     console.error('Error sending reminders:', error);
//   }
// };

// const sendAdminAlerts = async () => {
//   const totalGSTDue = await Invoice.aggregate([
//     { $match: { status: 'pending' } },
//     { $group: { _id: null, total: { $sum: '$gstAmount' } } }
//   ]);

//   const admins = await User.find({ role: 'admin' });

//   for (const admin of admins) {
//     await sendAdminAlertEmail(admin.email, totalGSTDue[0].total);
//   }
// };

// // Start reminder cron jobs
// cron.schedule('0 0 * * *', sendReminders);
// cron.schedule('0 0 1 * *', sendAdminAlerts);

// // User routes
// app.get('/api/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post('/api/users', async (req, res) => {
//   const user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     role: req.body.role,
//   });

//   try {
//     const newUser = await user.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


// // Register route
// app.post('/api/register', async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Check if user already exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new user
//     user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     await user.save();

//     // Create and return JWT
//     const payload = {
//       user: {
//         id: user.id,
//         role: user.role,
//       },
//     };

//     jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//       if (err) throw err;
//       res.json({ token });
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server error');
//   }
// });

// // Login route
// app.post('/api/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Create and return JWT
//     const payload = {
//       user: {
//         id: user.id,
//         role: user.role,
//       },
//     };

//     jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//       if (err) throw err;
//       res.json({ token });
//     });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server error');
//   }
// });


// // Authentication middleware to protect routes
// const auth = (req, res, next) => {
//   const token = req.header('x-auth-token');
//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };



// app.post('/api/invoices', async (req, res) => {
//   try {
//     const { recruiterName, amount, dueDate } = req.body;

//     // Validate required fields
//     if (!recruiterName || !amount || !dueDate) {
//       return res.status(400).json({ message: 'Recruiter name, amount, and due date are required' });
//     }

//     // Find the recruiter by name
//     const recruiter = await User.findOne({ name: recruiterName });
//     if (!recruiter) {
//       return res.status(400).json({ message: 'Recruiter not found' });
//     }

//     // Validate amount
//     if (isNaN(amount) || amount <= 0) {
//       return res.status(400).json({ message: 'Invalid amount' });
//     }

//     // Validate dueDate
//     const dueDateObj = new Date(dueDate);
//     if (isNaN(dueDateObj.getTime())) {
//       return res.status(400).json({ message: 'Invalid due date' });
//     }

//     const gstAmount = gstCalculator.calculateGST(amount);

//     // Create new invoice with recruiter object ID
//     const newInvoice = new Invoice({
//       recruiter: recruiter._id,
//       amount,
//       gstAmount,
//       dueDate: dueDateObj,
//     });

//     await newInvoice.save();
//     res.status(201).json(newInvoice);
//   } catch (error) {
//     console.error('Error creating invoice:', error.message);
//     res.status(400).json({ message: 'Error creating invoice: ' + error.message });
//   }
// });

// //Update Invoice status
// app.put('/api/invoices/:id', async (req, res) => {
//   console.log('Received PUT request for invoice:', req.params.id);
//   console.log('New status:', req.body.status);
//   try {
//     const { id } = req.params;
//     const { status } = req.body;
//     const updatedInvoice = await Invoice.findByIdAndUpdate(id, { status }, { new: true });
//     if (!updatedInvoice) {
//       return res.status(404).json({ message: 'Invoice not found' });
//     }
//     res.json(updatedInvoice);
//   } catch (error) {
//     console.error('Error updating invoice:', error);
//     res.status(500).json({ message: 'Error updating invoice status', error: error.message });
//   }
// });

// // Get all invoices
// app.get('/api/invoices', async (req, res) => {
//   try {
//     const { status, recruiterId } = req.query;
//     let query = {};

//     if (status) query.status = status;
//     if (recruiterId) query.recruiter = recruiterId;

//     const invoices = await Invoice.find(query).populate('recruiter');
//     res.json(invoices);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post('/api/payments', async (req, res) => {
//   try {
//     const { invoiceID, amount, status } = req.body;
//     const invoice = await Invoice.findById(invoiceID);
//     if (!invoice) {
//       return res.status(404).json({ message: 'Invoice not found' });
//     }

//     const payment = new Payment({ invoiceID, amount, status });
//     await payment.save();

//     if (status === 'success') {
//       invoice.status = 'paid';
//       await invoice.save();
//     }

//     res.status(201).json(payment);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.get('/api/reports', async (req, res) => {
//   try {
//     const { start, end } = req.query;
//     const query = {};
//     if (start && end) {
//       query.createdAt = { $gte: new Date(start), $lte: new Date(end) };
//     }
//     const invoices = await Invoice.find(query);
//     const report = reportGenerator.generateReport(invoices);
//     res.json(report);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.get('/api/dashboard', async (req, res) => {
//   try {
//     const totalGSTCollected = await Invoice.aggregate([
//       { $group: { _id: null, total: { $sum: "$gstAmount" } } }
//     ]);
//     const pendingPayments = await Invoice.countDocuments({ status: 'pending' });
//     const totalInvoices = await Invoice.countDocuments();
//     const monthlyGSTAverage = await Invoice.aggregate([
//       {
//         $group: {
//           _id: { $month: "$createdAt" },
//           average: { $avg: "$gstAmount" }
//         }
//       },
//       { $group: { _id: null, average: { $avg: "$average" } } }
//     ]);

//     res.status(200).json({
//       totalGSTCollected: totalGSTCollected[0]?.total || 0,
//       pendingPayments,
//       totalInvoices,
//       monthlyGSTAverage: monthlyGSTAverage[0]?.average || 0
//     });
//   } catch (error) {
//     console.error('Error fetching dashboard data:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// app.get('/api/payments', async (req, res) => {
//   try {
//     const filter = req.query.filter;
//     const query = filter !== 'all' ? { status: filter } : {};
//     const payments = await Payment.find(query)
//       .populate({
//         path: 'invoiceID',
//         populate: {
//           path: 'recruiter',
//           select: 'name'
//         }
//       });
//     res.status(200).json(payments);
//   } catch (error) {
//     console.error('Error fetching payments:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Get settings
// app.get('/api/settings', async (req, res) => {
//   try {
//     let settings = await Settings.findOne();
//     if (!settings) {
//       settings = new Settings(); // This will use the default value of 7
//       await settings.save();
//     }
//     res.json(settings);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Update settings
// app.post('/api/settings', async (req, res) => {
//   try {
//     const { reminderDays } = req.body;
//     if (typeof reminderDays !== 'number' || reminderDays < 1) {
//       return res.status(400).json({ message: 'Invalid reminderDays value' });
//     }
//     const settings = await Settings.findOneAndUpdate(
//       {}, 
//       { reminderDays },
//       { upsert: true, new: true }
//     );
//     res.json(settings);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// // System settings 

// // let settings = {
// //   notificationTemplates: {
// //     welcome: "Welcome to our platform!",
// //     passwordReset: "Your password has been reset successfully.",
// //   },
// //   integrationKeys: {
// //     apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
// //     secretKey: "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
// //   },
// // };

// // app.get('/api/system-settings', (req, res) => {
// //   res.json(settings);
// // });

// // app.post('/api/system-settings', (req, res) => {
// //   settings = {
// //     ...settings,
// //     ...req.body,
// //   };
// //   res.status(200).send("Settings updated successfully!");
// // });

// // Setting Model
// const SettingSchema = new mongoose.Schema({
//   notificationTemplates: {
//     welcome: String,
//     passwordReset: String,
//   },
//   integrationKeys: {
//     apiKey: String,
//     secretKey: String,
//   },
// });

// const SystemSetting = mongoose.model('SystemSetting', SettingSchema);

// // Routes
// app.get('/api/system-settings', async (req, res) => {
//   try {
//     let settings = await SystemSetting.findOne();
//     if (!settings) {
//       settings = await SystemSetting.create({
//         notificationTemplates: {
//           welcome: 'Welcome to our platform!',
//           passwordReset: 'Click here to reset your password.',
//         },
//         integrationKeys: {
//           apiKey: '',
//           secretKey: '',
//         },
//       });
//     }
//     res.json(settings);
//   } catch (error) {
//     console.error('Error fetching settings:', error);
//     res.status(500).json({ message: 'Error fetching settings' });
//   }
// });

// app.put('/api/system-settings', async (req, res) => {
//   try {
//     const { notificationTemplates, integrationKeys } = req.body;
//     const settings = await SystemSetting.findOneAndUpdate(
//       {},
//       { notificationTemplates, integrationKeys },
//       { new: true, upsert: true }
//     );
//     res.json(settings);
//   } catch (error) {
//     console.error('Error updating settings:', error);
//     res.status(500).json({ message: 'Error updating settings' });
//   }
// });


// // Data seeding function
// const seedData = async () => {
//   try {
//     // Clear existing data
//     await Invoice.deleteMany();
//     await Payment.deleteMany();
//     await User.deleteMany();
  
//     const recruiters = await User.insertMany([
//       { name: 'John Doe', password: await bcrypt.hash('john123', 10), email: 'john@example.com', role: 'recruiter' },
//       { name: 'Jane Smith', password: await bcrypt.hash('jane123', 10), email: 'jane@example.com', role: 'recruiter' },
//       { name: 'Bob Johnson', password: await bcrypt.hash('bob123', 10), email: 'bob@example.com', role: 'recruiter' },
//     ]);

    

//     // Create invoices
//     const today = new Date();
//     const invoices = await Invoice.insertMany([
//       {
//         recruiter: recruiters[0]._id,
//         amount: 1000,
//         gstAmount: 100,
//         dueDate: addDays(today, 14),
//         status: 'pending',
//       },
//       {
//         recruiter: recruiters[1]._id,
//         amount: 1500,
//         gstAmount: 150,
//         dueDate: addDays(today, 30),
//         status: 'pending',
//       },
//       {
//         recruiter: recruiters[2]._id,
//         amount: 2000,
//         gstAmount: 200,
//         dueDate: addDays(today, 7),
//         status: 'paid',
//       },
//       {
//         recruiter: recruiters[0]._id,
//         amount: 1200,
//         gstAmount: 120,
//         dueDate: addDays(today, 45),
//         status: 'pending',
//       },
//       {
//         recruiter: recruiters[1]._id,
//         amount: 1800,
//         gstAmount: 180,
//         dueDate: addDays(today, 21),
//         status: 'pending',
//       },
//       {
//         recruiter: recruiters[2]._id,
//         amount: 2200,
//         gstAmount: 220,
//         dueDate: addDays(today, 60),
//         status: 'pending',
//       },
//     ]);


//      // Check if there are invoices to link payments to
//      if (invoices.length === 0) {
//       console.log('No invoices found, please seed invoice data first.');
//       return;
//     }

//     // Create payment data
//     const payments = [
//       {
//         invoiceID: invoices[0]._id,
//         amount: invoices[0].amount,
//         status: 'success',
//       },
//       {
//         invoiceID: invoices[1]._id,
//         amount: invoices[1].amount,
//         status: 'success',
//       },
//       {
//         invoiceID: invoices[2]._id,
//         amount: invoices[2].amount,
//         status: 'failed',
//       },
//     ];

//     // Insert payments into the Payment collection
//     await Payment.insertMany(payments);

//     console.log('Dummy data inserted successfully');
//   } catch (error) {
//     console.error('Error seeding data:', error);
//   }
// };

// // Seed data on application start
// seedData().then(() => {
//   console.log('Data seeding completed');
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// module.exports = app;


