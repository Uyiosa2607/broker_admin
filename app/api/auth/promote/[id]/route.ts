import { prisma } from "@/auth";

export async function PUT(request: any, { params }: any) {
  const { id } = params;

  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });
  if (user) {
    try {
      const promoteAdmin = await prisma.users.update({
        where: {
          id: id,
        },
        data: {
          admin: true,
        },
      });

      if (promoteAdmin) {
        return Response.json({
          success: "user has been promoted to admin",
          status: 200,
        });
      } else {
        return Response.json({ eror: "something went wrong", status: 501 });
      }
    } catch (error: any) {
      console.log(error);
    }
  } else {
    return Response.json({ error: "something went wrong", status: 200 });
  }
}
