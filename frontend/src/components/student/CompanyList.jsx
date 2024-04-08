import React, { useState, useEffect } from "react";
import "./CSS/CompanyList.css";
import jobLogo from "./img/company-logo@2x.png";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import Header from "./Header";
import Button from "../../ui/Button";
import companyService from "../../services/company.service";

function FeaturedJobs() {
  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when component mounts
    const fetchData = async () => {
      try {
        const response = await companyService.getAllCompanies();

        if (response.ok) {
          const data = await response.json();

          setCompanyData(data.companies);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Clean up function
    return () => {
      // Cleanup if necessary
    };
  }, []);

  return (
    <div className="featured-jobs">
      <div className="featured-jobs-nav">
        <div className="nav-bar">
          <div className="ex-title">
            <h1 className="features-title">
              <span className="black-text">
                Explore and select from our list of available companies
              </span>
            </h1>
          </div>
        </div>
      </div>
      <div className="companies-shown">
        {companyData.map((company) => (
          <div className="company-list" key={company.id}>
            <Company
              companyName={company.company_name}
              industrySector={company.industry_sector}
              location={company.location}
              email={company.contact_email}
              studentLimit={company.accepted_student_limit}
              website={company.website}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Company({
  companyName,
  industrySector,
  location,
  email,
  website,
  studentLimit,
}) {
  const redirectToWebsite = () => {
    const domain = website.replace(/^https?:\/\//i, "");
    window.open(`//${domain}`, "_blank");
  };
  return (
    <>
      <Header />
      <div className="the-company">
        <div className="company-details">
          <div className="company-logo">
            <img src={jobLogo} alt="Company Logo" />
          </div>
          <div className="company-info">
            <p className="company-name">
              Company Name: <name> {companyName}</name>
            </p>
            <h3 className="company-title">Sector: {industrySector}</h3>
            <div className="company-details">
              <span className="location">
                <i className="icons">
                  <FaLocationDot />
                </i>
                {location}
              </span>
              <span className="email">
                <i className="icons">
                  <MdOutlineEmail />
                </i>
                {email}
              </span>
              <span className="accept-student">
                <i className="icons">
                  <PiStudentFill />
                </i>
                Accepte <span>{studentLimit}</span> students
              </span>
            </div>
          </div>
        </div>
        <div className="company-detail-button">
          <Button onClick={redirectToWebsite} size="large">
            Website
          </Button>
        </div>
      </div>
    </>
  );
}

export default FeaturedJobs;
