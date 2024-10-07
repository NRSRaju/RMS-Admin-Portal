import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RecruiterList from "../components/ManageRecruiters/RecruiterList";
// import {
//   getRecruiters,
//   approveRecruiter,
//   rejectRecruiter,
//   verifyRecruiter,
// } from "../services/recruiterService.js";
import api from '../services/api.js'

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

const RecruitersManagement = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    try {
      setLoading(true);
      const data = await api.getRecruiters();
      setRecruiters(data);
    } catch (err) {
      setError("Failed to fetch recruiters. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.approveRecruiter(id);
      fetchRecruiters();
    } catch (err) {
      setError("Failed to approve recruiter. Please try again.");
    }
  };

  const handleReject = async (id) => {
    try {
      await api.rejectRecruiter(id);
      fetchRecruiters();
    } catch (err) {
      setError("Failed to reject recruiter. Please try again.");
    }
  };

  const handleVerify = async (id) => {
    try {
      await api.verifyRecruiter(id);
      fetchRecruiters();
    } catch (err) {
      setError("Failed to verify recruiter. Please try again.");
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
      {/* <h2>Recruiters Management</h2> */}
      <RecruiterList
        recruiters={recruiters}
        onApprove={handleApprove}
        onReject={handleReject}
        onVerify={handleVerify}
      />
    </Container>
  );
};

export default RecruitersManagement;
