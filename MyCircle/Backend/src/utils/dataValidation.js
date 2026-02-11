const validate = require("validator");

const validateSignUp = (data) => {
  const { firstName, lastName, emailID, password } = data;

  if (!firstName) throw new Error("First name is required");
  if (!validate.isEmail(emailID)) throw new Error("Invalid email id");
  if (!validate.isStrongPassword(password))
    throw new Error("Enter strong password");

  if (password.length > 20) throw new Error("Password is to large");
};

const validateEditRequestData = (data) => {
  const allowEditFields = [
    "firstName",
    "lastName",
    "gender",
    "about",
    "skills",
    "age",
    "profilePhotoUrl",
  ];

  //Only above fields are allowed to edit
  const isEditAllowed = Object.keys(data).every((key) =>
    allowEditFields.includes(key),
  );
  return isEditAllowed;
};

module.exports = {
  validateSignUp,
  validateEditRequestData,
};
