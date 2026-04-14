function validateRegistration({ email, password }) {
  if (typeof email !== "string" || typeof password !== "string") {
    return false;
  }
  if (!email.includes("@")) {
    return false;
  }
  if (password.length <= 6) {
    return false;
  }
  return true;
}

module.exports = validateRegistration;