export const dynamic = "force-dynamic";
import { prisma } from "@/auth";

export async function GET(request: any, { params }: any) {
  const id: any = params.id;

  try {
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
        profile_image: true,
        admin: true,
        id: true
      },
    });

    if (user) {
      return Response.json(user);
    } else {
      return Response.json({ message: "User not found!" });
    }
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong");
  }
}
