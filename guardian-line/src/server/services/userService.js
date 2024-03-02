import clientPromise from "@/app/lib/mongodb";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export const userService = {
  authenticate,
};

async function authenticate(userName, password) {
  console.log("username", userName);
  console.log("password", password);
  const client = await clientPromise;
  const db = await client.db("GuardianLine");
  const collection = db.collection("Users");
  if (!userName || !password) {
    throw new Error("invalid-credentials");
  }
  const user = await collection.findOne({ userName: userName });
  if (!user) {
    throw new Error("invalid-username");
  }
  // Check if user is present in banned users list
  const bannedCollection = db.collection("BannedUsers");
  const bannedUser = await bannedCollection.findOne({ userName: userName });
  if (bannedUser) {
    console.log("User is banned");
    throw new Error("user-banned");
  }
  // Compare the hashed password with the provided password
  console.log("user.password:", user.password);
  console.log("System password:", password);
  const passwordMatch = bcrypt.compare(password, user.password);
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
