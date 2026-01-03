export function isLogged() {
  return !!localStorage.getItem("accessToken");
}

export function isInstructor() {
  const userStr = localStorage.getItem("user");
  if (!userStr) return false;
  try {
    const user = JSON.parse(userStr);
    return user.role === "instructor";
  } catch {
    return false;
  }
}
