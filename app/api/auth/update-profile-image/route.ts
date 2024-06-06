import { prisma } from "@/auth";

export async function POST(request: any) {
  const { userId, image } = await request.json();

  try {
    const profileImage = await prisma.users.update({
      where: { id: userId },
      data: {
        profile_image: image,
      },
    });

    if (profileImage)
      return Response.json({ status: 200, success: "Profile picture updated" });

    return Response.json({
      status: 500,
      error: "could not update profile please try again later",
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "something went wrong" });
  }
}
