const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isValidPhone = (phone) => {
  const regex = /^(\+?234|0)?[789]\d{9}$/;
  return regex.test(phone.replace(/\s+/g, ""));
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export { isValidEmail, isValidPhone, isValidUrl };
