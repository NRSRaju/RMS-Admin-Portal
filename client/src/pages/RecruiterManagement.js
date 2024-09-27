import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RecruiterList from "../components/Manage Recruiters/RecruiterList";
import {
  getRecruiters,
  approveRecruiter,
  rejectRecruiter,
  verifyRecruiter,
} from "../services/recruiterService";

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
      const data = await getRecruiters();
      setRecruiters(data);
    } catch (err) {
      setError("Failed to fetch recruiters. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveRecruiter(id);
      fetchRecruiters();
    } catch (err) {
      setError("Failed to approve recruiter. Please try again.");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectRecruiter(id);
      fetchRecruiters();
    } catch (err) {
      setError("Failed to reject recruiter. Please try again.");
    }
  };

  const handleVerify = async (id) => {
    try {
      await verifyRecruiter(id);
      fetchRecruiters();
    } catch (err) {
      setError("Failed to verify recruiter. Please try again.");
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
      <Title>Recruiters Management</Title>
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
