// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { toast } from 'react-toastify';
// // import '../styles/main.css';


// // const dummyData = [
// //   { _id: '1', type: 'notification', name: 'Welcome Email', value: 'Welcome to our platform!' },
// //   { _id: '2', type: 'notification', name: 'Password Reset', value: 'Click here to reset your password.' },
// //   { _id: '3', type: 'integration', name: 'API Key', value: 'dummy-api-key-12345' },
// //   { _id: '4', type: 'integration', name: 'Webhook URL', value: 'https://example.com/webhook' },
// // ];

// // const SystemSettings = () => {
// //   const [settings, setSettings] = useState([]);
// //   const [editingId, setEditingId] = useState(null);
// //   const [editValue, setEditValue] = useState('');
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchSettings();
// //   }, []);

// //   const fetchSettings = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await axios.get('http://localhost:5000/api/settings');
// //     setSettings(Array.isArray(response.data) ? response.data : []);
// //     setSettings(dummyData);
// //     } catch (error) {
// //       console.error('Error fetching settings:', error);
// //       toast.error('Error fetching settings. Displaying dummy data.');
// //       setSettings(dummyData);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleEdit = (id, currentValue) => {
// //     setEditingId(id);
// //     setEditValue(currentValue);
// //   };

// //   const handleSave = async (id) => {
// //     try {
// //       await axios.put(`http://localhost:5000/api/settings/${id}`, { value: editValue });
// //       setEditingId(null);
// //       fetchSettings();
// //       toast.success('Setting updated successfully');
// //     } catch (error) {
// //       toast.error('Error updating setting');
// //     }
// //   };

// //   const renderSettingValue = (setting) => {
// //     if (editingId === setting._id) {
// //       return (
// //         <div>
// //           <input
// //             type="text"
// //             value={editValue}
// //             onChange={(e) => setEditValue(e.target.value)}
// //             className="edit-input"
// //           />
// //           <button onClick={() => handleSave(setting._id)} className="save-btn">Save</button>
// //         </div>
// //       );
// //     }
// //     return (
// //       <div>
// //         {setting.value}
// //         <button onClick={() => handleEdit(setting._id, setting.value)} className="edit-btn">Edit</button>
// //       </div>
// //     );
// //   };

// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

// //   const notificationSettings = settings.filter(s => s.type === 'notification') || [];
// //   const integrationSettings = settings.filter(s => s.type === 'integration') || [];

// //   return (
// //     <div className="system-settings">
// //       <h1>System Settings</h1>
// //       <div className="settings-container">
// //         <h2>Notification Templates</h2>
// //         {notificationSettings.map(setting => (
// //           <div key={setting._id} className="setting-item">
// //             <h3>{setting.name}</h3>
// //             {renderSettingValue(setting)}
// //           </div>
// //         ))}
// //         <h2>Integration Keys</h2>
// //         {integrationSettings.map(setting => (
// //           <div key={setting._id} className="setting-item">
// //             <h3>{setting.name}</h3>
// //             {renderSettingValue(setting)}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default SystemSettings;
// import React, { useState } from "react";
// import { FiSettings, FiBell, FiKey, FiSave, FiEye, FiEyeOff } from "react-icons/fi";
// import { ToastContainer, toast } from "react-toastify";
// import axios from "axios";
// import "react-toastify/dist/ReactToastify.css";
// import '../styles/main.css';

// const SystemSettings = () => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [notificationTemplates, setNotificationTemplates] = useState({
//     welcome: "Welcome to our platform!",
//     passwordReset: "Your password has been reset successfully.",
//   });
//   const [integrationKeys, setIntegrationKeys] = useState({
//     apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
//     secretKey: "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
//   });
//   const [showSecretKey, setShowSecretKey] = useState(false);

//   const handleTemplateChange = (template, value) => {
//     setNotificationTemplates({ ...notificationTemplates, [template]: value });
//   };

//   const handleKeyChange = (key, value) => {
//     setIntegrationKeys({ ...integrationKeys, [key]: value });
//   };

//   const handleSave = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/system-settings", {
//         notificationTemplates,
//         integrationKeys,
//       });
//       toast.success("Settings saved successfully!");
//     } catch (error) {
//       toast.error("Error saving settings!");
//     }
//   };

//   const generateNewKey = (keyType) => {
//     const newKey = Math.random().toString(36).substring(2, 15);
//     setIntegrationKeys({ ...integrationKeys, [keyType]: newKey });
//     toast.info(`New ${keyType} generated!`);
//   };

//   return (
//     <div className="container">
//       <h1 className="title">System Settings</h1>
//       <div className="tab-container">
//         <button onClick={() => setActiveTab("overview")} className={`tab ${activeTab === "overview" ? "active" : ""}`}>
//           <FiSettings className="icon" /> Overview
//         </button>
//         <button onClick={() => setActiveTab("notifications")} className={`tab ${activeTab === "notifications" ? "active" : ""}`}>
//           <FiBell className="icon" /> Notification Templates
//         </button>
//         <button onClick={() => setActiveTab("integrations")} className={`tab ${activeTab === "integrations" ? "active" : ""}`}>
//           <FiKey className="icon" /> Integration Keys
//         </button>
//       </div>

//       {activeTab === "overview" && (
//         <div className="content">
//           <h2>Overview</h2>
//           <p>Welcome to the System Settings section. Here you can manage various aspects of your admin portal.</p>
//         </div>
//       )}
//       {activeTab === "notifications" && (
//         <div className="content">
//           <h2>Notification Templates</h2>
//           <label htmlFor="welcome-template">Welcome Template:</label>
//           <textarea
//             id="welcome-template"
//             value={notificationTemplates.welcome}
//             onChange={(e) => handleTemplateChange("welcome", e.target.value)}
//           />
//           <label htmlFor="password-reset-template">Password Reset Template:</label>
//           <textarea
//             id="password-reset-template"
//             value={notificationTemplates.passwordReset}
//             onChange={(e) => handleTemplateChange("passwordReset", e.target.value)}
//           />
//         </div>
//       )}
//       {activeTab === "integrations" && (
//         <div className="content">
//           <h2>Integration Keys</h2>
//           <label htmlFor="api-key">API Key:</label>
//           <div className="key-container">
//             <input
//               id="api-key"
//               value={integrationKeys.apiKey}
//               onChange={(e) => handleKeyChange("apiKey", e.target.value)}
//             />
//             <button onClick={() => generateNewKey("apiKey")}>Generate New</button>
//           </div>
//           <label htmlFor="secret-key">Secret Key:</label>
//           <div className="key-container">
//             <input
//               type={showSecretKey ? "text" : "password"}
//               id="secret-key"
//               value={integrationKeys.secretKey}
//               onChange={(e) => handleKeyChange("secretKey", e.target.value)}
//             />
//             <button onClick={() => setShowSecretKey(!showSecretKey)}>
//               {showSecretKey ? <FiEyeOff /> : <FiEye />}
//             </button>
//             <button onClick={() => generateNewKey("secretKey")}>Generate New</button>
//           </div>
//         </div>
//       )}

//       <button className="save-button" onClick={handleSave}>
//         <FiSave className="icon" /> Save Changes
//       </button>
//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>
//   );
// };

// export default SystemSettings;
// correct code above 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash, FaCopy, FaCog, FaBell, FaKey } from 'react-icons/fa';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f0f2f5;
    color: #333;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 1rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;


const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e1e4e8;
`;

const Tab = styled.button`
  background-color: transparent;
  color: ${props => props.active ? '#0366d6' : '#586069'};
  border: none;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid ${props => props.active ? '#0366d6' : 'transparent'};
  margin-bottom: -2px;

  &:hover {
    color: #ffffff;
  }
`;

const TabContent = styled.div`
  background-color: #ffffff;
  padding: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #24292e;
  font-weight: 600;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  font-size: 0.9rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.3s ease;
  overflow-y: auto; // Ensures vertical scrolling when needed

  &:focus {
    border-color: #0366d6;
    outline: none;
    box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.3);
  }

  // WebKit scrollbar styles
  &::-webkit-scrollbar {
    width: 10px; // Width of the scrollbar
  }

  &::-webkit-scrollbar-track {
    background: #f0f0f0; // Background of the scrollbar track
    border-radius: 10px; // Rounded corners for track
  }

  &::-webkit-scrollbar-thumb {
    background: #0366d6; // Color of the scrollbar thumb
    border-radius: 10px; // Rounded corners for the scrollbar thumb
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #005bb5; // Darker thumb on hover
  }

  // Firefox scrollbar styles
  scrollbar-width: thin; // Makes the scrollbar thinner
  scrollbar-color: #0366d6 #f0f0f0; // Sets the thumb and track color
`;


const InputGroup = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  overflow: hidden;
  max-width:900px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 0.6rem;
  border: none;
  font-size: 0.9rem;
width:600px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #0366d6;
  color: #ffffff;
  border: none;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  max-width:200px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0256b3;
  }
`;

const IconButton = styled.button`
  background: none;
  cursor: pointer;
  font-size: 1rem;
  width:60px;
  color: #586069;
  padding: 0.4rem;
  transition: color 0.3s ease;
  border:1px solid  #e1e4e8;


  &:hover {
    color: #ffffff;

  }
`;

const SaveButton = styled(Button)`
  display: block;
  margin: 2rem auto 0;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  width:300px;
`;

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [notificationTemplates, setNotificationTemplates] = useState({
    welcome: '',
    passwordReset: '',
  });
  const [integrationKeys, setIntegrationKeys] = useState({
    apiKey: '',
    secretKey: '',
  });
  const [loading, setLoading] = useState(true);
  const [showSecretKey, setShowSecretKey] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/system-settings');
      const { notificationTemplates, integrationKeys } = response.data;
      setNotificationTemplates(notificationTemplates);
      setIntegrationKeys(integrationKeys);
    } catch (error) {
      toast.error('Error fetching settings');
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateChange = (template, value) => {
    setNotificationTemplates({ ...notificationTemplates, [template]: value });
  };

  const handleKeyChange = (key, value) => {
    setIntegrationKeys({ ...integrationKeys, [key]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:5000/api/system-settings', {
        notificationTemplates,
        integrationKeys,
      });
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Error updating settings');
    }
  };

  const generateNewKey = (keyType) => {
    const newKey = Math.random().toString(36).substr(2, 24);
    setIntegrationKeys({ ...integrationKeys, [keyType]: newKey });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard');
    }, () => {
      toast.error('Failed to copy');
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <h2>System Settings</h2>
        <TabContainer>
          <Tab
            active={activeTab === 'notifications'}
            onClick={() => setActiveTab('notifications')}
          >
            <FaBell /> Notifications
          </Tab>
          <Tab
            active={activeTab === 'integrations'}
            onClick={() => setActiveTab('integrations')}
          >
            <FaKey /> Integration Keys
          </Tab>
        </TabContainer>

        <TabContent>
          {activeTab === 'notifications' && (
            <>
              <FormGroup>
                <Label htmlFor="welcome">Welcome Email:</Label>
                <TextArea
                  id="welcome"
                  value={notificationTemplates.welcome}
                  onChange={(e) => handleTemplateChange('welcome', e.target.value)}
                />
                <IconButton onClick={() => copyToClipboard(notificationTemplates.welcome)} title="Copy">
                  <FaCopy />
                </IconButton>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="passwordReset">Password Reset Email:</Label>
                <TextArea
                  id="passwordReset"
                  value={notificationTemplates.passwordReset}
                  onChange={(e) => handleTemplateChange('passwordReset', e.target.value)}
                />
                <IconButton onClick={() => copyToClipboard(notificationTemplates.passwordReset)} title="Copy">
                  <FaCopy />
                </IconButton>
              </FormGroup>
            </>
          )}

          {activeTab === 'integrations' && (
            <>
              <FormGroup>
                <Label htmlFor="apiKey">API Key:</Label>
                <InputGroup>
                  <Input
                    type="text"
                    id="apiKey"
                    value={integrationKeys.apiKey}
                    onChange={(e) => handleKeyChange('apiKey', e.target.value)}
                    readOnly
                  />
                  <IconButton onClick={() => copyToClipboard(integrationKeys.apiKey)} title="Copy">
                    <FaCopy />
                  </IconButton>
                  <Button onClick={() => generateNewKey('apiKey')}>Generate New</Button>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="secretKey">Secret Key:</Label>
                <InputGroup>
                  <Input
                    type={showSecretKey ? 'text' : 'password'}
                    id="secretKey"
                    value={integrationKeys.secretKey}
                    onChange={(e) => handleKeyChange('secretKey', e.target.value)}
                    readOnly
                  />
                  <IconButton onClick={() => setShowSecretKey(!showSecretKey)} title={showSecretKey ? "Hide" : "Show"}>
                    {showSecretKey ? <FaEyeSlash /> : <FaEye />}
                  </IconButton>
                  <IconButton onClick={() => copyToClipboard(integrationKeys.secretKey)} title="Copy">
                    <FaCopy />
                  </IconButton>
                  <Button onClick={() => generateNewKey('secretKey')}>Generate New</Button>
                </InputGroup>
              </FormGroup>
            </>
          )}
        </TabContent>

        <SaveButton onClick={handleSave}>
          Save Changes
        </SaveButton>
      </Container>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};

export default SystemSettings;