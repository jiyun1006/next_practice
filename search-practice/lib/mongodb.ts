import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if(!MONGODB_URI) throw new Error("MONGODB_URI가 .env.local에 없습니다.");

type Cache = {conn : typeof mongoose | null; promise: Promise<typeof mongoose> | null};
const g = globalThis as unknown as { mongoose? : Cache};
const cached = g.mongoose ?? (g.mongoose = {conn : null, promise:null});

export async function connectDB(){
    if(cached.conn) return cached.conn;
    if(!cached.promise) cached.promise = mongoose.connect(MONGODB_URI!);
    cached.conn = await cached.promise;
    return cached.conn;
}