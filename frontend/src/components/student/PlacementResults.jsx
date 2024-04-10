import React, { useState, useEffect } from "react";
import styled from "styled-components";
import placementService from "../../services/placement.service";
import { useAuth } from "../../context/AuthContext";
import Header from "./Header";

// Styled components
const Container = styled.div`
  margin: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const PlacementList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PlacementItem = styled.li`
  margin-bottom: 10px;
`;

const CompanyDetails = styled.div`
  margin-top: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const NoResultsMessage = styled.p`
  font-size: 18px;
  color: #888;
`;

// Placement Results Component
const PlacementResults = () => {
  const [placementResults, setPlacementResults] = useState([]);
  const { userId, secondName } = useAuth();

  useEffect(() => {
    // Fetch placement results when component mounts
    fetchPlacementResults();
  }, [userId]);

  const fetchPlacementResults = async () => {
    try {
      // Assuming studentId is available from props or context
      const results = await placementService.getPlacementResult(userId);
      setPlacementResults(results);
    } catch (error) {
      console.error("Error fetching placement results:", error);
    }
  };

  return (
    <>
      <Header />
      <br /> <br /> <br /> <br />
      <Container>
        <Title>Placement Results</Title>
        {placementResults.length === 0 ? (
          <NoResultsMessage>No placement results found.</NoResultsMessage>
        ) : (
          <PlacementList>
            {placementResults.map((result) => (
              <PlacementItem key={result.placement_id}>
                Student ID: {result.student_id}, Company ID: {result.company_id}
                <CompanyDetails>
                  Company Name: {result.company_details.company_name}
                  <br />
                  Location: {result.company_details.location}
                  <br />
                  Industry Sector: {result.company_details.industry_sector}
                  <br />
                  Accepted Student Limit:{" "}
                  {result.company_details.accepted_student_limit}
                  <br />
                  Website: {result.company_details.website}
                  <br />
                  Contact Email: {result.company_details.contact_email}
                  <br />
                  Phone Number: {result.company_details.phone_number}
                </CompanyDetails>
              </PlacementItem>
            ))}
          </PlacementList>
        )}
      </Container>
    </>
  );
};

export default PlacementResults;
