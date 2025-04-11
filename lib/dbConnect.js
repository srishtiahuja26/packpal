import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_CONNECTION_STRING;

if (!MONGODB_URI) throw new Error("MONGODB_URI not found in .env");

let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
