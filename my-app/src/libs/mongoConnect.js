import { MongoClient } from "mongodb";
console.log(process.env.NEXT_PUBLIC_MONGO_URL);
if (!process.env.NEXT_PUBLIC_MONGO_URL) {
  throw new Error(
    'Invalid/Missing environment variable: "NEXT_PUBLIC_MONGO_URL"'
  );
}

const uri = process.env.NEXT_PUBLIC_MONGO_URL;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
