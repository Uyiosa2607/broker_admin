export const dynamic = "force-dynamic";
import { prisma } from "@/auth";

export async function GET(request: any, { params }: any) {
  const id: any = params.id;

  try {
    //Find the requested user profile with the id
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
        profile_image: true,
        admin: true,
        id: true,
      },
    });
    if (user) {
      //Sends the user data to the frontend
      return Response.json(user);
    } else {
      //returns error if user is not found
      return Response.json({ message: "User not found!" });
    }
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong");
  }
}
