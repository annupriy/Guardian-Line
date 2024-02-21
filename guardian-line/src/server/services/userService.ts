export const userService = {
  authenticate,
};

function authenticate(username: string, password: string) {
  if (username !== "admin" || password !== "admin") {
    return null; //(2)
  }

  const user = {
    id: "9001",
    name: "Web Admin",
    email: "admin@example.com",
  };

  return user; //(4)
}
