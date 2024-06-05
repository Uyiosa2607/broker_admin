import { prisma } from "@/auth";

export async function DELETE(request: any, { params }: any) {
  const { dataId } = await request.json();

  const userId = params.id;

  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  if (user) {
    if (user.id === dataId || user.admin === true) {
      try {
        const removedUser = await prisma.users.delete({
          where: {
            id: dataId,
          },
        });

        if (removedUser)
          return Response.json({ success: "Account deleted!!", status: 200 });
      } catch (error) {
        console.log(error);
      }
    } else {
      return Response.json({
        error: "Only Admins are allowed to delete other users",
        status: 500,
      });
    }
  }

  return Response.json({ error: "something went wrong", status: 500 });
}
