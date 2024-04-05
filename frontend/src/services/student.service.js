// Import from the env
const api_url = "http://localhost:8080";

// A function to send post request to create a new student
const createStudent = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/student`, requestOptions);
  return response;
};

// A function to send get request to get all students
const getAllStudents = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${api_url}/api/student`, requestOptions);
  return response;
};

// A function to send get request to get a department by ID
const getStudent = async (studentId) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${api_url}/api/student/${studentId}`,
    requestOptions
  );
  return response;
};

// A function to send put request to update a student
const updateStudent = async (studentId, formData) => {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(
    `${api_url}/api/student/${studentId}`,
    requestOptions
  );
  return response;
};

// A function to send delete request to delete a student
const deleteStudent = async (studentId) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(
    `${api_url}/api/student/${studentId}`,
    requestOptions
  );
  return response;
};

// Export all the functions
const studentService = {
  createStudent,
  getStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
};

export default studentService;
