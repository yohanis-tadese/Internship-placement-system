const api_url = "http://localhost:8080";

const logIn = async (formData) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(`${api_url}/api/login`, requestOptions);

    return response;
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
};

// const logOut = () => {
//   localStorage.removeItem("user_token");
// };

const loginService = {
  logIn,
  // logOut,
};

export default loginService;
