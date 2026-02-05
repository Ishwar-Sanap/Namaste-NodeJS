const validate = require("validator");

const validateSignUp = (data) => {
  const { firstName, lastName, emailID, password } = data;

  if (!firstName) throw new Error("First name is required");
  if (!validate.isEmail(emailID)) throw new Error("Invalid email id");
  if (!validate.isStrongPassword(password))
    throw new Error("Enter strong password");
};

module.exports = {
  validateSignUp,
};
