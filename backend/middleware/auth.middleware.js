// const jwt = require("jsonwebtoken");
// const jwtSecret = process.env.JWT_SECRET;

// function verifyToken(req, res, next) {
//   // Get the access token from the request headers
//   const token = req.headers["x-access-token"];

//   if (!token) {
//     return res.status(401).json({ message: "Access token is required" });
//   }

//   try {
//     // Verify the access token
//     const decoded = jwt.verify(token, jwtSecret);

//     // Extract user role from the decoded token
//     const userRole = decoded.user_role;

//     // Check if the user role is Admin
//     if (userRole !== "Admin") {
//       return res.status(403).json({ message: "Unauthorized access" });
//     }

//     // If the user role is Admin, proceed to the next middleware or route handler
//     next();
//   } catch (error) {
//     // If the token is invalid or expired, return an error
//     return res.status(401).json({ message: "Invalid or expired access token" });
//   }
// }

// module.exports = verifyToken;
