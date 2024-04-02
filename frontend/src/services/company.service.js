// Import from the env
const api_url = "http://localhost:8080";

// A function to send post request to create a new department
const createCompany = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/company`, requestOptions);
  return response;
};

// Export all the functions
const companyService = {
  createCompany,
};

export default companyService;
