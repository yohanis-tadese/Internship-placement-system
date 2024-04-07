// Import from the env
const api_url = "http://localhost:8080";

// A function to send post request to create a new admin
const createAdmin = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/admin`, requestOptions);
  return response;
};

// A function to send get request to get all admins
const getAllAdmins = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${api_url}/api/admin/`, requestOptions);
  return response;
};

// Export all the functions
const adminService = {
  createAdmin,
  getAllAdmins,
};

export default adminService;
