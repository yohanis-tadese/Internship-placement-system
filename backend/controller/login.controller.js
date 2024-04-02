const loginservice = require("../service/login.service");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

async function logIn(req, res, next) {
  try {
    const { username, password } = req.body;

    let user;
    let role;

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

    const payload = {
      user_id: user.id,
      user_role: role,
      username: username,
    };
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: "24h",
    });

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: { user_token: token },
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  logIn,
};
