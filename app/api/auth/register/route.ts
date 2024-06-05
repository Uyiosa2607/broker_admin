import { prisma } from "@/auth";

export async function POST(request: any) {

  const {email, password, name} = await request.json() as any


  const bcrypt = require("bcrypt")

  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    email,
    password: hashedPassword,
    name
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

    if (newUser) return Response.json({status: 201,
      success: "Account created successfully"
    });

    return Response.json({status: 500,
      error: "unable to create new Account"
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return Response.json({status: 501, error: "Email already exist"});
    }
  }
  return Response.json({Error})
}
