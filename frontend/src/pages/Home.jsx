import React from "react";
import styled from "styled-components";
import Header from "../components/Home/Header";
// import Footer from "../components/Home/Footer";
import Main from "../components/Home/Main";

const StyledAppLayout = styled.div`
  border-bottom: 7px solid #cf711f;
  display: grid;
  grid-template-rows: auto 1fr auto; /* Header, Main, Footer */
  min-height: 100vh;
  background-color: var(--color-grey-50);
`;

const Home = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Main />
      {/* <Footer /> */}
    </StyledAppLayout>
  );
};

export default Home;
