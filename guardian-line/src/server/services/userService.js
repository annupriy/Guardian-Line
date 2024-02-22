import clientPromise from "@/app/lib/mongodb";

export const userService = {
  authenticate,
};

async function authenticate(userName, password) {
  console.log("username", userName);
  console.log("password", password);
  const client = await clientPromise;
  const db = client.db("GuardianLine");
  const collection = db.collection("Users");
  if (!userName || !password) {
    throw new Error("invalid-credentials");
  }
  const user = await collection.findOne({ userName: userName });
  if (!user) {
    throw new Error("invalid-username");
  }
  // Compare the hashed password with the provided password
  const passwordMatch = password === user.password;
  if (!passwordMatch) {
    throw new Error("invalid-password");
  }
  console.log("user", user);
  const user2 = {
    id: user._id,
    name: user.userName,
  }; //(3)

  return user2; //(4)
}
