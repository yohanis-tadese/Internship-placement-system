import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: var(--color-grey-100);
  padding: 5px;
  font-weight: 500;
  text-align: center; /* Text alignment center */
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p
        style={{
          textAlign: "center",
          margin: "10px 0 0",
          fontSize: "14px",
        }}
      >
        &copy; {new Date().getFullYear()} Haramaya University. Developed by our
        group members. All rights reserved.
      </p>
    </FooterContainer>
  );
};

export default Footer;
