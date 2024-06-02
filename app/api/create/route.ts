import { prisma } from "@/auth";
import bcrypt from "bcryptjs";

export async function POST(request: any) {

  const req = await request.json();

  const hashedPassword = bcrypt.hashSync(req.password, 10);

  const userData = {
    email: req.email,
    password: hashedPassword,
  };

  try {
    const newUser = await prisma.users.create({
      data: userData,
      select: {
        email: true,
        id: true,
        name: true,
        admin: true,
        profile_image: true,
      },
    });

    if (newUser) return Response.json(newUser);

    return new Response("Something went wrong");
  } catch (error: any) {
    if (error.code === "P2002") {
      return new Response("Email already exist");
    }
  }
}
