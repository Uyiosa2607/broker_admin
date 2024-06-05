export const dynamic = "force-dynamic";

import { prisma } from "@/auth";

export async function GET(request: any) {
  try {
    const users = await prisma.users.findMany({
      select: {
        name: true,
        id: true,
        email: true,
        profile_image: true,
        admin: true
      },
    });

    if (users) return Response.json(users);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong!", status: 500});
  }
}
