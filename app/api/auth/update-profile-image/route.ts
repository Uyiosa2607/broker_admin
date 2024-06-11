import { prisma } from "@/auth";

export async function POST(request: any) {
  //userId and image submited on the frontend
  const { userId, image } = await request.json();

  //finds the user with the userId and attempt to update the "profile_image" property with the image variable
  try {
    const profileImage = await prisma.users.update({
      where: { id: userId },
      data: {
        profile_image: image,
      },
    });

    //Sends back a success message if the update operation was succesfull
    if (profileImage)
      return Response.json({ status: 200, success: "Profile picture updated" });

    //sends and error message if the update operation fails
    return Response.json({
      status: 500,
      error: "could not update profile please try again later",
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "something went wrong" });
  }
}
