import { prisma } from "@/auth";
import bcrypt from "bcryptjs";

export async function POST(request: any) {
  //gets email, password and name submited from the frontend
  const { email, password, name } = (await request.json()) as any;

  //hash the plain password submited
  const hashedPassword = await bcrypt.hash(password, 10);

  //creates and userdata object with the submited data
  const userData = {
    email,
    password: hashedPassword,
    name,
  };

  try {
    //Attempt to create a new user in the database with the created user object
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

    //If the create operation was successfull a success message is sent back to the frontend
    if (newUser)
      return Response.json({
        status: 201,
        success: "Account created successfully",
      });

    //sends back an error message if the create user operation wasn't successfull
    return Response.json({
      status: 500,
      error: "unable to create new Account",
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return Response.json({ status: 501, error: "Email already exist" });
    }
  }
  return Response.json({ Error });
}
