process.env.DEBUG = 'mongodb-memory-server:*';

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;
export async function connect() {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, { dbName: "testingDB" });
  console.log("----->DATABASE TESTING CONNECTED<-----")
}

export async function closeDatabase() {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
} 
