

const SUCCESS = true;
const FAILURE = false;

const STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const MESSAGES = {
  USER_REGISTERED: "User registered successfully",
  USER_EXISTS: "User already exists",
  USER_UPDATED: "User updated successfully",
  USER_RETRIEVED: "Users retrieved successfully",
  USER_NOT_FOUND: "User not found",
  CLIENT_ERROR:"Client did'nt exist / profile have'nt created yet",
  CREATED:"Created Successfully",
  NO_DATA: "No user Data provided",
  INVALID_CREDENTIALS: "Invalid credentials",
  INTERNAL_ERROR: "Internal server error",
  RESET_CODE_SENT: "Reset code sent to your email",
  CODE_INVALID_OR_EXPIRED: "Invalid or expired code",
  CODE_VERIFIED: "Code verified successfully",
  

};

module.exports = {
  SUCCESS,
  FAILURE,
  STATUS,
  MESSAGES,
};