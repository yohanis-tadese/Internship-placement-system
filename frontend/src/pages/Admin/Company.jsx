import CreateCompany from "../../components/Admin/Company/CreateCompany";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

function Company() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">All Company</Heading>
        <CreateCompany />
      </Row>
      <Row></Row>
    </>
  );
}

export default Company;
