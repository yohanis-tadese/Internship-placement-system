const loginservice = require("../service/login.service");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

async function logIn(req, res, next) {
  try {
    const { username, password } = req.body;

    let user;
    let role;
    let userIdKey;

    if (username.startsWith("stud_")) {
      user = await loginservice.loginStudent(username, password);
      role = "Student";
    } else if (username.startsWith("admin_")) {
      user = await loginservice.loginAdmin(username, password);
      role = "Admin";
    } else if (username.startsWith("comp_")) {
      user = await loginservice.loginCompany(username, password);
      role = "Company";
    } else if (username.startsWith("dept_")) {
      user = await loginservice.loginDepartment(username, password);
      role = "Department";
    }

    if (!user) {
      return res.status(403).json({
        status: "fail",
        message: "Invalid username or password",
      });
    }

    // Add additional check for incorrect password
    if (user.invalidPassword) {
      return res.status(403).json({
        status: "fail",
        message: "Invalid username or password",
      });
    }

    userIdKey = user.key; // Get the userIdKey from the user object returned by the login service

    const payload = {
      [userIdKey]: user.id,
      user_role: role,
      username: username,
    };
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: "24h",
    });

    res.status(200).json({
      status: "success",
      data: {
        message: "User logged in successfully",
        user_token: token,
      },
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  logIn,
};
