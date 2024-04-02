import styled from "styled-components";
import Header from "./Header";
// import Footer from "./Footer";
import Rule from "./Rule";

const StyledAppLayout = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto; /* Header, Main, Footer */
  background-color: var(--color-grey-50);
`;

// Styled components for the Rule component
const RuleContainer = styled.div`
  padding-bottom: 40px;
`;

function FAQ() {
  return (
    <StyledAppLayout>
      <Header />
      <RuleContainer>
        <Rule />
      </RuleContainer>
      {/* <Footer /> */}
    </StyledAppLayout>
  );
}

export default FAQ;
