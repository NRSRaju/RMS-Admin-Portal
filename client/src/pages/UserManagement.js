import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserList from "../components/Manage Users/UserList";
import {
  getUsers,
  updateUser,
  approveCertification,
  rejectCertification,
} from "../services/userService";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Inter", sans-serif;
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
      const data = await getUsers();
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
      await updateUser(id, userData);
      fetchUsers();
    } catch (err) {
      setError("Failed to update user. Please try again.");
    }
  };

  const handleApproveCertification = async (id) => {
    try {
      await approveCertification(id);
      fetchUsers();
    } catch (err) {
      setError("Failed to approve certification. Please try again.");
    }
  };

  const handleRejectCertification = async (id, reason) => {
    try {
      await rejectCertification(id, reason);
      fetchUsers();
    } catch (err) {
      setError("Failed to reject certification. Please try again.");
    }
  };

  if (loading) {
    return (
      <Container>
        <Title>Loading...</Title>
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
      <Title>Users Management</Title>
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