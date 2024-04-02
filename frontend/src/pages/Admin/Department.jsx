import CreateDepartment from "../../components/Admin/Department/CreateDepartment";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

function Department() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">All Department</Heading>
        <CreateDepartment />
      </Row>
      <row></row>
    </>
  );
}

export default Department;
