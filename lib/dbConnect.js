import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_CONNECTION_STRING;
if (!MONGODB_URI) throw new Error("MONGODB_URI not found in .env");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'packpal01',
      bufferCommands: false,
    }).then((mongoose) => {
      console.log("CONNECTED TO MONGODB");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("CONNECTED NOTTO MONGODB");

    return cached.conn;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
