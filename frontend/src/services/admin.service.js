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

async function uploadPhoto(formData) {
  try {
    const response = await fetch(`${api_url}/api/admin/upload`, {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || "Failed to upload photo");
    }

    return responseData;
  } catch (error) {
    console.error("Error uploading photo:", error);
    throw error;
  }
}

// Export all the functions
const adminService = {
  createAdmin,
  getAllAdmins,
  uploadPhoto,
};

export default adminService;
