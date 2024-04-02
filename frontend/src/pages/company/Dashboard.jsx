// import Heading from "../ui/Heading";
// import Row from "../ui/Row";

// function Dashboard() {
//   return (
//     <Row type="horizontal">
//       <Heading as="h1">Dashboard</Heading>
//       <p>Test the working of the dashbords</p>
//     </Row>
//   );
// }

// export default Dashboard;

import React, { useState } from "react";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Button, Form, FormGroup, Label, Input } from "reactstrap"; // Import Bootstrap components

// Custom internal CSS
const customStyles = {
  marginTop: "20px",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

function Dashboard() {
  return <Heading as="h1">Dashboards</Heading>;
}

export default Dashboard;
