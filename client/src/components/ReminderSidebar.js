// // import React, { useState ,useEffect} from 'react';
// // import axios from 'axios';
// // import { toast } from 'react-toastify';

// // function ReminderSidebar() {
// //   const [reminderDays, setReminderDays] = useState(7);
// //   const [examNotification, setExamNotification] = useState({
// //     title: '',
// //     date: '',
// //     time: '',
// //     venue: '',
// //   });
// //   const [examResults, setExamResults] = useState({
// //     title: '',
// //     file: null,
// //   });
// //   const [notifications, setNotifications] = useState([]);
// //   const [results, setResults] = useState([]);

// //   useEffect(() => {
// //     fetchDummyData();
// //   }, []);

// //   const fetchDummyData = () => {
// //     setNotifications([
// //       { id: 1, title: 'Math Exam', date: '2024-10-15', time: '09:00', venue: 'Hall A' },
// //       { id: 2, title: 'Science Quiz', date: '2024-10-20', time: '14:00', venue: 'Lab 101' },
// //     ]);
// //     setResults([
// //       { id: 1, title: 'English Test', score: 85, grade: 'A' },
// //       { id: 2, title: 'History Exam', score: 78, grade: 'B' },
// //     ]);
// //   };


// //   const handleReminderSettingsSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post('http://localhost:5000/api/settings', { reminderDays });
// //       toast.success('Reminder settings updated successfully');
// //     } catch (error) {
// //       console.error('Error updating reminder settings:', error);
// //       toast.error('Failed to update reminder settings. Please try again.');
// //     }
// //   };


// //   const handleExamNotificationSubmit = (e) => {
// //     e.preventDefault();
// //     setNotifications([...notifications, { ...examNotification, id: Date.now() }]);
// //     setExamNotification({ title: '', date: '', time: '', venue: '' });
// //     toast.success('Exam notification sent successfully');
// //   };

// //   const handleExamResultsSubmit = (e) => {
// //     e.preventDefault();
// //     setResults([...results, { id: Date.now(), title: examResults.title, score: 90, grade: 'A' }]);
// //     setExamResults({ title: '', file: null });
// //     toast.success('Exam results uploaded and sent successfully');
// //   };

// //   return (
// //     <div className="reminder-sidebar">
// //       <h2>Reminder Settings</h2>
// //       <form onSubmit={handleReminderSettingsSubmit}>
// //         <label>
// //           Send reminders
// //           <input
// //             type="number"
// //             value={reminderDays}
// //             onChange={(e) => setReminderDays(e.target.value)}
// //             min="1"
// //             max="30"
// //           />
// //           days before due date
// //         </label>
// //         <button type="submit">Save Settings</button>
// //       </form>

// //       <div className="exam-notifications">
// //         <h3>Exam Notifications</h3>
// //         <form onSubmit={handleExamNotificationSubmit}>
// //           <input
// //             type="text"
// //             placeholder="Exam Title"
// //             value={examNotification.title}
// //             onChange={(e) => setExamNotification({ ...examNotification, title: e.target.value })}
// //             required
// //           />
// //           <input
// //             type="date"
// //             value={examNotification.date}
// //             onChange={(e) => setExamNotification({ ...examNotification, date: e.target.value })}
// //             required
// //           />
// //           <input
// //             type="time"
// //             value={examNotification.time}
// //             onChange={(e) => setExamNotification({ ...examNotification, time: e.target.value })}
// //             required
// //           />
// //           <input
// //             type="text"
// //             placeholder="Venue"
// //             value={examNotification.venue}
// //             onChange={(e) => setExamNotification({ ...examNotification, venue: e.target.value })}
// //             required
// //           />
// //           <button type="submit">Send Exam Notification</button>
// //         </form>

// //         <h4>Scheduled Notifications</h4>
// //         <ul>
// //           {notifications.map((notification) => (
// //             <li key={notification.id}>
// //               {notification.title} - {notification.date} at {notification.time}, {notification.venue}
// //             </li>
// //           ))}
// //         </ul>
// //       </div>

// //       <div className="exam-results">
// //         <h3>Exam Results</h3>
// //         <form onSubmit={handleExamResultsSubmit}>
// //           <input
// //             type="text"
// //             placeholder="Exam Title"
// //             value={examResults.title}
// //             onChange={(e) => setExamResults({ ...examResults, title: e.target.value })}
// //             required
// //           />
// //           <input
// //             type="file"
// //             onChange={(e) => setExamResults({ ...examResults, file: e.target.files[0] })}
// //             required
// //           />
// //           <button type="submit">Upload and Send Results</button>
// //         </form>

// //         <h4>Recent Results</h4>
// //         <ul>
// //           {results.map((result) => (
// //             <li key={result.id}>
// //               {result.title} - Score: {result.score}, Grade: {result.grade}
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ReminderSidebar;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { FaBell, FaGraduationCap, FaCog } from 'react-icons/fa';

// function ReminderSidebar() {
//   const [activeTab, setActiveTab] = useState('reminderSettings');
//   const [reminderDays, setReminderDays] = useState(7);
//   const [examNotification, setExamNotification] = useState({
//     title: '',
//     date: '',
//     time: '',
//     venue: '',
//   });
//   const [examResults, setExamResults] = useState({
//     title: '',
//     file: null,
//   });
//   const [notifications, setNotifications] = useState([]);
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     fetchDummyData();
//   }, []);

//   const fetchDummyData = () => {
//     setNotifications([
//       { id: 1, title: 'Math Exam', date: '2024-10-15', time: '09:00', venue: 'Hall A' },
//       { id: 2, title: 'Science Quiz', date: '2024-10-20', time: '14:00', venue: 'Lab 101' },
//     ]);
//     setResults([
//       { id: 1, title: 'English Test', score: 85, grade: 'A' },
//       { id: 2, title: 'History Exam', score: 78, grade: 'B' },
//     ]);
//   };

//   const handleReminderSettingsSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/settings', { reminderDays });
//       toast.success('Reminder settings updated successfully');
//     } catch (error) {
//       console.error('Error updating reminder settings:', error);
//       toast.error('Failed to update reminder settings. Please try again.');
//     }
//   };

//   const handleExamNotificationSubmit = (e) => {
//     e.preventDefault();
//     const newNotification = { ...examNotification, id: Date.now() };
//     setNotifications([...notifications, newNotification]);
//     setExamNotification({ title: '', date: '', time: '', venue: '' });
//     toast.success('Exam notification sent successfully');
//   };

//   const handleExamResultsSubmit = (e) => {
//     e.preventDefault();
//     setResults([...results, { id: Date.now(), title: examResults.title, score: 90, grade: 'A' }]);
//     setExamResults({ title: '', file: null });
//     toast.success('Exam results uploaded and sent successfully');
//   };

//   return (
//     <div className="reminder-sidebar">
//       <nav className="reminder-sidebar__navigation">
//         <button
//           className={`reminder-sidebar__nav-button ${activeTab === 'reminderSettings' ? 'reminder-sidebar__nav-button--active' : ''}`}
//           onClick={() => setActiveTab('reminderSettings')}
//         >
//           <FaCog /> Reminder Settings
//         </button>
//         <button
//           className={`reminder-sidebar__nav-button ${activeTab === 'examAlertNotification' ? 'reminder-sidebar__nav-button--active' : ''}`}
//           onClick={() => setActiveTab('examAlertNotification')}
//         >
//           <FaBell /> Exam Alert
//         </button>
//         <button
//           className={`reminder-sidebar__nav-button ${activeTab === 'examResultNotification' ? 'reminder-sidebar__nav-button--active' : ''}`}
//           onClick={() => setActiveTab('examResultNotification')}
//         >
//           <FaGraduationCap /> Exam Results
//         </button>
//       </nav>

//       {activeTab === 'reminderSettings' && (
//         <div className="reminder-sidebar__settings-section">
//           <h2 className="reminder-sidebar__section-title">Reminder Settings</h2>
//           <form onSubmit={handleReminderSettingsSubmit} className="reminder-sidebar__form">
//             <label className="reminder-sidebar__form-label">
//               Send reminders
//               <input
//                 type="number"
//                 value={reminderDays}
//                 onChange={(e) => setReminderDays(e.target.value)}
//                 min="1"
//                 max="30"
//                 className="reminder-sidebar__form-input"
//               />
//               days before due date
//             </label>
//             <button type="submit" className="reminder-sidebar__submit-button">Save Settings</button>
//           </form>
//         </div>
//       )}

//       {activeTab === 'examAlertNotification' && (
//         <div className="reminder-sidebar__exam-notifications">
//           <h3 className="reminder-sidebar__section-title">Exam Notifications</h3>
//           <form onSubmit={handleExamNotificationSubmit} className="reminder-sidebar__form">
//             <input
//               type="text"
//               placeholder="Exam Title"
//               value={examNotification.title}
//               onChange={(e) => setExamNotification({ ...examNotification, title: e.target.value })}
//               required
//               className="reminder-sidebar__form-input"
//             />
//             <input
//               type="date"
//               value={examNotification.date}
//               onChange={(e) => setExamNotification({ ...examNotification, date: e.target.value })}
//               required
//               className="reminder-sidebar__form-input"
//             />
//             <input
//               type="time"
//               value={examNotification.time}
//               onChange={(e) => setExamNotification({ ...examNotification, time: e.target.value })}
//               required
//               className="reminder-sidebar__form-input"
//             />
//             <input
//               type="text"
//               placeholder="Venue"
//               value={examNotification.venue}
//               onChange={(e) => setExamNotification({ ...examNotification, venue: e.target.value })}
//               required
//               className="reminder-sidebar__form-input"
//             />
//             <button type="submit" className="reminder-sidebar__submit-button">Send Exam Notification</button>
//           </form>

//           <h4 className="reminder-sidebar__subsection-title">Scheduled Notifications</h4>
//           <ul className="reminder-sidebar__list">
//             {notifications.map((notification) => (
//               <li key={notification.id} className="reminder-sidebar__list-item">
//                 <FaBell className="reminder-sidebar__list-icon" />
//                 {notification.title} - {notification.date} at {notification.time}, {notification.venue}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {activeTab === 'examResultNotification' && (
//         <div className="reminder-sidebar__exam-results">
//           <h3 className="reminder-sidebar__section-title">Exam Results</h3>
//           <form onSubmit={handleExamResultsSubmit} className="reminder-sidebar__form">
//             <input
//               type="text"
//               placeholder="Exam Title"
//               value={examResults.title}
//               onChange={(e) => setExamResults({ ...examResults, title: e.target.value })}
//               required
//               className="reminder-sidebar__form-input"
//             />
//             <input
//               type="file"
//               onChange={(e) => setExamResults({ ...examResults, file: e.target.files[0] })}
//               required
//               className="reminder-sidebar__form-input"
//             />
//             <button type="submit" className="reminder-sidebar__submit-button">Upload and Send Results</button>
//           </form>

//           <h4 className="reminder-sidebar__subsection-title">Recent Results</h4>
//           <ul className="reminder-sidebar__list">
//             {results.map((result) => (
//               <li key={result.id} className="reminder-sidebar__list-item">
//                 <FaGraduationCap className="reminder-sidebar__list-icon" />
//                 {result.title} - Score: {result.score}, Grade: {result.grade}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ReminderSidebar;

// second correct code the above commented code dont have job alert feature 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaBell, FaGraduationCap, FaCog, FaBriefcase } from 'react-icons/fa';


function ReminderSidebar() {
  const [activeTab, setActiveTab] = useState('reminderSettings');
  const [reminderDays, setReminderDays] = useState(7);
  const [examNotification, setExamNotification] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
  });
  const [examResults, setExamResults] = useState({
    title: '',
    file: null,
  });
  const [jobAlert, setJobAlert] = useState({
    title: '',
    company: '',
    deadline: '',
    description: '',
  });
  const [notifications, setNotifications] = useState([]);
  const [results, setResults] = useState([]);
  const [jobAlerts, setJobAlerts] = useState([]);

  useEffect(() => {
    fetchDummyData();
  }, []);

  const fetchDummyData = () => {
    setNotifications([
      { id: 1, title: 'Math Exam', date: '2024-10-15', time: '09:00', venue: 'Hall A' },
      { id: 2, title: 'Science Quiz', date: '2024-10-20', time: '14:00', venue: 'Lab 101' },
    ]);
    setResults([
      { id: 1, title: 'English Test', score: 85, grade: 'A' },
      { id: 2, title: 'History Exam', score: 78, grade: 'B' },
    ]);
    setJobAlerts([
      { id: 1, title: 'Software Developer', company: 'Tech Corp', deadline: '2024-11-01', description: 'Exciting opportunity for a skilled developer' },
      { id: 2, title: 'Data Analyst', company: 'Data Insights Inc.', deadline: '2024-11-15', description: 'Join our data team and make an impact' },
    ]);
  };

  const handleReminderSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/settings', { reminderDays });
      toast.success('Reminder settings updated successfully');
    } catch (error) {
      console.error('Error updating reminder settings:', error);
      toast.error('Failed to update reminder settings. Please try again.');
    }
  };

  const handleExamNotificationSubmit = (e) => {
    e.preventDefault();
    const newNotification = { ...examNotification, id: Date.now() };
    setNotifications([...notifications, newNotification]);
    setExamNotification({ title: '', date: '', time: '', venue: '' });
    toast.success('Exam notification sent successfully');
  };

  const handleExamResultsSubmit = (e) => {
    e.preventDefault();
    setResults([...results, { id: Date.now(), title: examResults.title, score: 90, grade: 'A' }]);
    setExamResults({ title: '', file: null });
    toast.success('Exam results uploaded and sent successfully');
  };

  const handleJobAlertSubmit = async (e) => {
    e.preventDefault();
    const newJobAlert = { ...jobAlert, id: Date.now() };
    setJobAlerts([...jobAlerts, newJobAlert]);
    setJobAlert({ title: '', company: '', deadline: '', description: '' });
    
    try {
      // Simulating API call to send notifications
      await axios.post('http://localhost:5000/api/job-alerts', newJobAlert);
      toast.success('Job alert sent successfully via email and SMS');
    } catch (error) {
      console.error('Error sending job alert:', error);
      toast.error('Failed to send job alert. Please try again.');
    }
  };

  return (
    <div className="reminder-sidebar" style={{height:"50%",borderRadius:"2rem"}}>
      <nav className="reminder-sidebar__navigation">
        <button
          className={`reminder-sidebar__nav-button ${activeTab === 'reminderSettings' ? 'reminder-sidebar__nav-button--active' : ''}`}
          onClick={() => setActiveTab('reminderSettings')}
        >
          <FaCog /> Settings
        </button>
        <button
          className={`reminder-sidebar__nav-button ${activeTab === 'examAlertNotification' ? 'reminder-sidebar__nav-button--active' : ''}`}
          onClick={() => setActiveTab('examAlertNotification')}
        >
          <FaBell /> Exam Alert
        </button>
        <button
          className={`reminder-sidebar__nav-button ${activeTab === 'examResultNotification' ? 'reminder-sidebar__nav-button--active' : ''}`}
          onClick={() => setActiveTab('examResultNotification')}
        >
          <FaGraduationCap /> Results
        </button>
        <button
          className={`reminder-sidebar__nav-button ${activeTab === 'jobAlertNotification' ? 'reminder-sidebar__nav-button--active' : ''}`}
          onClick={() => setActiveTab('jobAlertNotification')}
        >
          <FaBriefcase /> Job Alerts
        </button>
      </nav>

      {activeTab === 'reminderSettings' && (
        <div className="reminder-sidebar__settings-section">
          <h2 className="reminder-sidebar__section-title">Reminder Settings</h2>
          <form onSubmit={handleReminderSettingsSubmit} className="reminder-sidebar__form">
            <label className="reminder-sidebar__form-label">
              Send reminders
              <input
                type="number"
                value={reminderDays}
                onChange={(e) => setReminderDays(e.target.value)}
                min="1"
                max="30"
                className="reminder-sidebar__form-input"
              />
              days before due date
            </label>
            <button type="submit" className="reminder-sidebar__submit-button">Save Settings</button>
          </form>
        </div>
      )}

      {activeTab === 'examAlertNotification' && (
        <div className="reminder-sidebar__exam-notifications">
          <h3 className="reminder-sidebar__section-title">Exam Notifications</h3>
          <form onSubmit={handleExamNotificationSubmit} className="reminder-sidebar__form">
            <input
              type="text"
              placeholder="Exam Title"
              value={examNotification.title}
              onChange={(e) => setExamNotification({ ...examNotification, title: e.target.value })}
              required
              className="reminder-sidebar__form-input"
            />
            <input
              type="date"
              value={examNotification.date}
              onChange={(e) => setExamNotification({ ...examNotification, date: e.target.value })}
              required
              className="reminder-sidebar__form-input"
            />
            <input
              type="time"
              value={examNotification.time}
              onChange={(e) => setExamNotification({ ...examNotification, time: e.target.value })}
              required
              className="reminder-sidebar__form-input"
            />
            <input
              type="text"
              placeholder="Venue"
              value={examNotification.venue}
              onChange={(e) => setExamNotification({ ...examNotification, venue: e.target.value })}
              required
              className="reminder-sidebar__form-input"
            />
            <button type="submit" className="reminder-sidebar__submit-button">Send Exam Notification</button>
          </form>

          <h4 className="reminder-sidebar__subsection-title">Scheduled Notifications</h4>
          <ul className="reminder-sidebar__list">
            {notifications.map((notification) => (
              <li key={notification.id} className="reminder-sidebar__list-item">
                <FaBell className="reminder-sidebar__list-icon" />
                {notification.title} - {notification.date} at {notification.time}, {notification.venue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'examResultNotification' && (
        <div className="reminder-sidebar__exam-results">
          <h3 className="reminder-sidebar__section-title">Exam Results</h3>
          <form onSubmit={handleExamResultsSubmit} className="reminder-sidebar__form">
            <input
              type="text"
              placeholder="Exam Title"
              value={examResults.title}
              onChange={(e) => setExamResults({ ...examResults, title: e.target.value })}
              required
              className="reminder-sidebar__form-input"
            />
            <input
              type="file"
              onChange={(e) => setExamResults({ ...examResults, file: e.target.files[0] })}
              required
              className="reminder-sidebar__form-input"
            />
            <button type="submit" className="reminder-sidebar__submit-button">Upload and Send Results</button>
          </form>

          <h4 className="reminder-sidebar__subsection-title">Recent Results</h4>
          <ul className="reminder-sidebar__list">
            {results.map((result) => (
              <li key={result.id} className="reminder-sidebar__list-item">
                <FaGraduationCap className="reminder-sidebar__list-icon" />
                {result.title} - Score: {result.score}, Grade: {result.grade}
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'jobAlertNotification' && (
        <div className="reminder-sidebar__job-alerts">
          <h3 className="reminder-sidebar__section-title">Job Alert Notifications</h3>
          <form onSubmit={handleJobAlertSubmit} className="reminder-sidebar__form">
            <input
              type="text"
              placeholder="Job Title"
              value={jobAlert.title}
              onChange={(e) => setJobAlert({ ...jobAlert, title: e.target.value })}
              required
              className="reminder-sidebar__form-input"
            />
            <input
              type="text"
              placeholder="Company"
              value={jobAlert.company}
              onChange={(e) => setJobAlert({ ...jobAlert, company: e.target.value })}
              required
              className="reminder-sidebar__form-input"
            />
            <input
              type="date"
              placeholder="Application Deadline"
              value={jobAlert.deadline}
              onChange={(e) => setJobAlert({ ...jobAlert, deadline: e.target.value })}
              required
              className="reminder-sidebar__form-input"
            />
            <textarea
              placeholder="Job Description"
              value={jobAlert.description}
              onChange={(e) => setJobAlert({ ...jobAlert, description: e.target.value })}
              required
              className="reminder-sidebar__form-input"
            />
            <button type="submit" className="reminder-sidebar__submit-button">Send Job Alert</button>
          </form>

          <h4 className="reminder-sidebar__subsection-title">Scheduled Job Alerts</h4>
          <ul className="reminder-sidebar__list">
            {jobAlerts.map((alert) => (
              <li key={alert.id} className="reminder-sidebar__list-item">
                <FaBriefcase className="reminder-sidebar__list-icon" />
                {alert.title} at {alert.company} - Deadline: {alert.deadline}
                <button className="reminder-sidebar__apply-button">Apply Now</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ReminderSidebar;
