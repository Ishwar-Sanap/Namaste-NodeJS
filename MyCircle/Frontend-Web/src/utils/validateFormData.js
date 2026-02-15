const validateFormData = (firstName, email, password, confirmPassword) => {

  if (firstName !== null && firstName.length === 0) {
    return { result: false, error: "First name is required" };
  }
  if (email.length === 0) {
    return { result: false, error: "Email is required" };
  }
  if (email.length > 0) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email))
      return { result: false, error: "Invalid Email address" };
  }
  if (password.length === 0) {
    return { result: false, error: "Password is required" };
  }
  if (confirmPassword !== null && confirmPassword.length === 0) {
    return { result: false, error: "Confirm password is required" };
  }

  if (confirmPassword !== null && password !== confirmPassword) {
    return { result: false, error: "Password doesn't match" };
  }
  return { result: true };
};

export default validateFormData;
