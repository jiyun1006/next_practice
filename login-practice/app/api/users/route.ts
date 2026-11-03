import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import loginSchema from "@/schema/loginSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    const body = await request.json();


    const parsed = loginSchema.safeParse(body);
    if(!parsed.success){
        return NextResponse.json({message: parsed.error.issues[0].message}, { status : 400});
    }

    const {userId, password} = parsed.data;

    await connectDB();
    
    if (await User.findOne({userId})){
        return NextResponse.json({message: "이미 사용 중인 아이디입니다."}, {status :409});
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({userId, password: hashed});


    return NextResponse.json({id: user._id, userId: user.userId}, {status:201});
    
}

export async function GET() {
    await connectDB();
    const users = await User.find({}, { password: 0 });
    return NextResponse.json(users);
  }