import clientPromise from "@/app/lib/mongodb";
import bcrypt from 'bcrypt';

export async function POST(req) {
    const client = await clientPromise;
    try{
        const {userName, password} = await req.json()
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const db = await client.db("GuardianLine");
        const collection = db.collection("Users");  
        console.log("username", userName);
        await collection.insertOne({ userName: userName, password: hashedPassword, reputation: 0});
         
        console.log("User registered successfully");
        return new Response("Registered successfully" ,{ status: 200 }); 
    }catch (error) {
        console.error("Error registering User:", error);
        return new Response("Error registering User", { status: 500 });
      }
}