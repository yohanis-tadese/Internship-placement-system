// Import necessary services
const placementService = require("../service/placement.service");

async function addPlacementResult(req, res, next) {
  try {
    const placementData = req.body;

    // Iterate over each placement data and add it individually
    for (const placement of placementData) {
      await placementService.addPlacementResult(placement);
    }

    return res.status(201).json({
      status: true,
      message: "Placement results stored successfully",
    });
  } catch (error) {
    console.error("Error adding placement results:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

// Controller function to fetch placement results for a specific student
async function getPlacementResult(req, res, next) {
  try {
    const studentId = req.params.studentId;

    // Call the service to get placement results for the student
    const placementResults = await placementService.getPlacementResult(
      studentId
    );

    // Check if there are placement results
    if (placementResults.length === 0) {
      return res
        .status(404)
        .json({ message: "No placement results found for the student" });
    }

    // Retrieve details for each company in the placement results
    const detailedPlacementResults = await Promise.all(
      placementResults.map(async (result) => {
        const companyDetails = await placementService.getCompanyDetails(
          result.company_id
        );
        return {
          placement_id: result.placement_id,
          student_id: result.student_id,
          company_id: result.company_id,
          company_details: companyDetails,
        };
      })
    );

    // Return the detailed placement results in the response
    res.status(200).json(detailedPlacementResults);
  } catch (error) {
    console.error("Error fetching placement results:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getPlacementResult,
};

module.exports = {
  addPlacementResult,
  getPlacementResult,
};
