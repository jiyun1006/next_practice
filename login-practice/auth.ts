import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import loginSchema from "@/schema/loginSchema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: { userId: {}, password: {} },
      authorize: async (credentials) => {
        // 1) 서버에서 다시 검증
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { userId, password } = parsed.data;

        // 2) DB에서 사용자 찾기
        await connectDB();
        const user = await User.findOne({ userId });
        if (!user) return null;

        // 3) 비밀번호비교
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return null;

        // 4) 세션에 담을 정보만 반환
        return { id: user._id.toString(), name: user.userId };
      },
    }),
  ],
  pages: { signIn: "/login" },
});
