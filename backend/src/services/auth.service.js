const { User, Organization } = require("../models");

const { hashPassword, comparePassword } = require("../utils/bcrypt");

const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

const registerUser = async (data) => {
  const { name, email, password, organizationName } = data;

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
    role: "ADMIN",
    organization_id: organization.id,
  });

  return user;
};

const loginUser = async (data) => {
  const { email, password } = data;

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

  return {
    accessToken,
    refreshToken,
    user,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
