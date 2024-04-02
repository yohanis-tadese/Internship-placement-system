// Import from the env
const api_url = "http://localhost:8080";

// A function to send post request to create a new department
const createDepartment = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/department`, requestOptions);
  return response;
};

// Export all the functions
const departmentService = {
  createDepartment,
};

export default departmentService;
