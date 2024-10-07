import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserList from "../components/ManageUsers/UserList";

import api from  "../services/api";

const Container = styled.div`
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin-top:15px;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
`;

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await api.getUsers();
      console.log(data)
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (id, userData) => {
    try {
      await api.updateUser(id, userData);
      fetchUsers();
    } catch (err) {
      setError("Failed to update user. Please try again.");
    }
  };

  const handleApproveCertification = async (id) => {
    try {
      await api.approveCertification(id);
      fetchUsers();
    } catch (err) {
      setError("Failed to approve certification. Please try again.");
    }
  };

  const handleRejectCertification = async (id, reason) => {
    try {
      await api.rejectCertification(id, reason);
      fetchUsers();
    } catch (err) {
      setError("Failed to reject certification. Please try again.");
    }
  };

  if (loading) {
    return (
      <Container>
       <div className="loading">Loading...</div>;
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Title>Error: {error}</Title>
      </Container>
    );
  }

  return (
    <Container>
      {/* <h2>Users Management</h2> */}
      <UserList
        users={users}
        onUpdateUser={handleUpdateUser}
        onApproveCertification={handleApproveCertification}
        onRejectCertification={handleRejectCertification}
      />
    </Container>
  );
};

export default UsersManagement;