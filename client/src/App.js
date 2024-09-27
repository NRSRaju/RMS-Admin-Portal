

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
// import { FaBell } from "react-icons/fa";
// import Dashboard from './components/Dashboard';
// import InvoiceForm from './components/InvoiceForm';
// import PaymentTracker from './components/PaymentTracker';
// import GSTReport from './components/GSTReport';
// import Login from './components/Login';
// import Register from './components/Register';
// import ReminderSidebar from './components/ReminderSidebar';
// import Footer from './components/Footer';
// import './styles/main.css';

// function Navbar({ toggleSidebar }) {
//   const location = useLocation();
//   const isLoggedIn = localStorage.getItem('token');

//   return (
//     <nav className="navbar">
//       <ul className="navbar-list">
//         {isLoggedIn ? (
//           <>
//             <li className={`navbar-item ${location.pathname === '/' ? 'active' : ''}`}>
//               <Link to="/">Dashboard</Link>
//             </li>
//             <li className={`navbar-item ${location.pathname === '/invoice' ? 'active' : ''}`}>
//               <Link to="/invoice">Create Invoice</Link>
//             </li>
//             <li className={`navbar-item ${location.pathname === '/payments' ? 'active' : ''}`}>
//               <Link to="/payments">Payment Tracker</Link>
//             </li>
//             <li className={`navbar-item ${location.pathname === '/report' ? 'active' : ''}`}>
//               <Link to="/report">GST Report</Link>
//             </li>
//             {/* <li className="navbar-item" onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}>
//               Logout
//             </li> */}
//             <li className="navbar-item" onClick={toggleSidebar}>
//               <div className='bell-icon'>
//                 <FaBell size={28}/> 
//               </div>
//             </li>
//           </>
//         ) : (
//           <>
//             {/* <li className={`navbar-item ${location.pathname === '/login' ? 'active' : ''}`}>
//               <Link to="/login">Login</Link>
//             </li>
//             <li className={`navbar-item ${location.pathname === '/register' ? 'active' : ''}`}>
//               <Link to="/register">Register</Link>
//             </li> */}
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// }

// function PrivateRoute({ children }) {
//   const isLoggedIn = localStorage.getItem('token');
//   return isLoggedIn ? children : <Navigate to="/login" />;
// }

// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const  isLoggedIn = localStorage.getItem('token')

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const closeSidebar = (e) => {
//     if (sidebarOpen && e.target.closest('.reminder-sidebar') === null && e.target.closest('.bell-icon') === null) {
//       setSidebarOpen(false);
//     }
//   };

//   return (
//     <Router>
//       <div className="App" onClick={closeSidebar}>
//         <header>
//           <img src={`/logo1.png`} alt="Company Logo" className="logo" />
//           <h1>Admin Portal </h1>
//           {isLoggedIn ? (
//                 <button className="logout-button" onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}>Logout</button>
//               ):(<button className="logout-button">Login</button>
//           )}
//         </header>
//         <Navbar toggleSidebar={toggleSidebar} />
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//           <Route path="/invoice" element={<PrivateRoute><InvoiceForm /></PrivateRoute>} />
//           <Route path="/payments" element={<PrivateRoute><PaymentTracker /></PrivateRoute>} />
//           <Route path="/report" element={<PrivateRoute><GSTReport /></PrivateRoute>} />
//         </Routes>
//         {sidebarOpen && <ReminderSidebar />}
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;


// above is the second correct code 
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import { FaBell,FaCog } from "react-icons/fa";
import Dashboard from './components/Dashboard';
import InvoiceForm from './components/InvoiceForm';
import PaymentTracker from './components/PaymentTracker';
import GSTReport from './components/GSTReport';
import Login from './components/Login';
import Register from './components/Register';
import ReminderSidebar from './components/ReminderSidebar';
import Footer from './components/Footer';
import SystemSettings from './components/SystemSettings';
import './styles/main.css';

function Navbar({ toggleSidebar }) {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('token');

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {isLoggedIn ? (
          <>
            <li className={`navbar-item ${location.pathname === '/' ? 'active' : ''}`}>
              <Link to="/">Dashboard</Link>
            </li>
            <li className={`navbar-item ${location.pathname === '/invoice' ? 'active' : ''}`}>
              <Link to="/invoice">Create Invoice</Link>
            </li>
            <li className={`navbar-item ${location.pathname === '/payments' ? 'active' : ''}`}>
              <Link to="/payments">Payment Tracker</Link>
            </li>
            <li className={`navbar-item ${location.pathname === '/report' ? 'active' : ''}`}>
              <Link to="/report">GST Report</Link>
            </li>
            <li className={`navbar-item ${location.pathname === '/system-settings' ? 'active' : ''}`}>
              <Link to="/system-settings" className='settings-icon'>
                {/* <FaCog size={20}/>  */}System Settings
              </Link>
            </li>
            <li className="navbar-item" onClick={toggleSidebar}>
              <div className='bell-icon'>
                <FaBell size={28}/> 
              </div>
            </li>
          
          </>
        ) : null}
      </ul>
    </nav>
  );
}

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem('token');
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('token');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = (e) => {
    if (sidebarOpen && e.target.closest('.reminder-sidebar') === null && e.target.closest('.bell-icon') === null) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <Router>
      <div className="App" onClick={closeSidebar}>
        <header>
          <img src={`/logo1.png`} alt="Company Logo" className="logo" />
          <h1>Admin Portal </h1>
          {isLoggedIn ? (
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login">
              <button className="logout-button">Login</button>
            </Link>
          )}
        </header>
        <Navbar toggleSidebar={toggleSidebar} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/invoice" element={<PrivateRoute><InvoiceForm /></PrivateRoute>} />
          <Route path="/payments" element={<PrivateRoute><PaymentTracker /></PrivateRoute>} />
          <Route path="/report" element={<PrivateRoute><GSTReport /></PrivateRoute>} />
          <Route path="/system-settings" element={<PrivateRoute><SystemSettings/></PrivateRoute>} />
        </Routes>
        {sidebarOpen && <ReminderSidebar />}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
