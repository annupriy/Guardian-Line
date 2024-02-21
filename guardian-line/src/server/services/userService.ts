export const userService = {
  authenticate,
};

function authenticate(username: string, password: string) {
  if (!username || !password) {
    throw new Error("invalid-credentials");
  }
  if (username === "admin" && password !== "admin") {
    throw new Error("invalid-password");
  }
  if (username !== "admin") {
    throw new Error("invalid-username");
  }
  if (username !== "admin" || password !== "admin") {
    return null;
  }
  const user = {
    username: username,
  };

  return user; //(4)
}
