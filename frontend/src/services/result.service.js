// Import from the env
const api_url = "http://localhost:8080";

async function saveResults(formData) {
  try {
    const response = await fetch(`${api_url}/api/send-results`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Check if the response is successful (status code 200-299)
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // Handle errors if the response is not successful
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to save results");
    }
  } catch (error) {
    // Handle errors if the request fails
    console.error("Error saving results:", error);
    throw error;
  }
}

const resultService = {
  saveResults,
};

export default resultService;
