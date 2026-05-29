const { User, Organization } = require("../models");

const { hashPassword, comparePassword } = require("../utils/bcrypt");

const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

const registerUser = async (data) => {
  const { name, email, password, organizationName, role } = data;

  if (!name || !email || !password || !organizationName) {
    throw new Error("name, email, password and organizationName are required");
  }

  const allowedRoles = ["ADMIN", "MANAGER", "MEMBER"];

  if (role && !allowedRoles.includes(role)) {
    throw new Error(
      `Invalid role. Allowed roles are: ${allowedRoles.join(", ")}`,
    );
  }

  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const organization = await Organization.create({
    name: organizationName,
  });

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "MEMBER",
    organization_id: organization.id,
  });

  const userResponse = user.toJSON();

  delete userResponse.password;
  delete userResponse.refresh_token;

  return userResponse;
};


const loginUser = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const payload = {
    id: user.id,
    role: user.role,
    organization_id: user.organization_id,
  };

  const accessToken = generateAccessToken(payload);

  const refreshToken = generateRefreshToken(payload);

  user.refresh_token = refreshToken;

  await user.save();

  const userResponse = user.toJSON();

  delete userResponse.password;
  delete userResponse.refresh_token;

  return {
    accessToken,
    refreshToken,
    user: userResponse,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
