const resultService = require("../service/result.service");

async function sendResults(req, res) {
  try {
    const formData = req.body;

    await resultService.saveResults(formData);

    return res.status(201).json({
      status: true,
      message: "Results sent successfully",
    });
  } catch (error) {
    console.error("Error sending results:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = {
  sendResults,
};
